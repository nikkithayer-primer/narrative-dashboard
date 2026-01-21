/**
 * LocationView.js
 * Detail view for a location
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CardBuilder } from '../utils/CardBuilder.js';
import { MapView } from '../components/MapView.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { Timeline } from '../components/Timeline.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class LocationView extends BaseView {
  constructor(container, locationId, options = {}) {
    super(container, options);
    this.locationId = locationId;
  }

  async render() {
    const location = DataService.getLocation(this.locationId);
    if (!location) {
      this.renderNotFound('Location');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchLocationData(location);
    
    // Build cards HTML
    const cardsHtml = this.buildCardsHtml(location, data);

    // Build subtitle
    const subtitleParts = [
      location.type ? `Type: ${location.type}` : '',
      location.coordinates ? `Coordinates: ${location.coordinates.lat.toFixed(4)}, ${location.coordinates.lng.toFixed(4)}` : ''
    ].filter(Boolean).join(' • ');

    // Build page header
    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Dashboard', href: '#/dashboard' },
        { label: 'Locations', href: '#/locations' },
        location.name
      ],
      title: location.name,
      subtitle: subtitleParts
    });

    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        <div class="content-grid">
          ${cardsHtml}
        </div>
      </div>
    `;

    // Initialize card width toggles
    if (cardsHtml) {
      const contentGrid = this.container.querySelector('.content-grid');
      initAllCardToggles(contentGrid, `location-${this.locationId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = { location, ...data };

    await this.initializeComponents();
  }

  fetchLocationData(location) {
    const narratives = DataService.getNarrativesForLocation(this.locationId);
    const events = DataService.getEventsForLocation(this.locationId);
    const persons = DataService.getPersonsForLocation(this.locationId);
    const organizations = DataService.getOrganizationsForLocation(this.locationId);
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    return { narratives, events, persons, organizations, hasNetwork };
  }

  buildCardsHtml(location, data) {
    const cards = [];

    // Map always shows (it's the primary view for a location)
    if (location.coordinates) {
      cards.push(CardBuilder.create('Location Map', 'location-map', { noPadding: true }));
    }

    if (data.narratives.length > 0) {
      cards.push(CardBuilder.create('Related Narratives', 'location-narratives', {
        count: data.narratives.length,
        noPadding: true
      }));
    }

    if (data.events.length > 0) {
      cards.push(CardBuilder.create('Events at this Location', 'location-timeline', {
        count: data.events.length
      }));
    }

    if (data.hasNetwork) {
      cards.push(CardBuilder.create('Associated People & Organizations', 'location-network'));
    }

    return cards.join('');
  }

  async initializeComponents() {
    const { location, narratives, events, persons, organizations } = this._prefetchedData;

    // Map centered on this location
    if (location.coordinates) {
      this.components.map = new MapView('location-map', {
        height: 400,
        defaultZoom: 12
      });
      this.components.map.update({
        locations: [location]
      });
      
      // Center on this specific location
      setTimeout(() => {
        this.components.map.centerOn(location.coordinates.lat, location.coordinates.lng, 12);
      }, 200);
    }

    // Narratives List
    if (narratives.length > 0) {
      this.components.narrativeList = new NarrativeList('location-narratives', {
        maxItems: 8,
        onNarrativeClick: (n) => {
          window.location.hash = `#/narrative/${n.id}`;
        }
      });
      this.components.narrativeList.update({ narratives });
    }

    // Events Timeline
    if (events.length > 0) {
      // Include sub-events
      const allEvents = events.flatMap(e => [
        e,
        ...DataService.getSubEventsForEvent(e.id)
      ]);

      this.components.timeline = new Timeline('location-timeline', {
        height: 280,
        onEventClick: (e) => {
          window.location.hash = `#/event/${e.id}`;
        }
      });
      this.components.timeline.update({ events: allEvents });
    }

    // Network Graph
    if (persons.length > 0 || organizations.length > 0) {
      const personIds = persons.map(p => p.id);
      const orgIds = organizations.map(o => o.id);
      const networkData = DataService.buildNetworkGraph(personIds, orgIds);

      this.components.network = new NetworkGraph('location-network', {
        height: 350,
        onNodeClick: (node) => {
          const route = node.type === 'person' ? 'person' : 'organization';
          window.location.hash = `#/${route}/${node.id}`;
        },
        onLinkClick: (link) => {
          this.showConnectingNarrativesModal(link);
        }
      });
      this.components.network.update(networkData);
    }
  }
}

export default LocationView;
