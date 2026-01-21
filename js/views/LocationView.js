/**
 * LocationView.js
 * Detail view for a location
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
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
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> Location not found
          </div>
          <h1>Location not found</h1>
        </div>
      `;
      return;
    }

    // Fetch all data upfront to determine which cards to show
    const narratives = DataService.getNarrativesForLocation(this.locationId);
    const events = DataService.getEventsForLocation(this.locationId);
    const persons = DataService.getPersonsForLocation(this.locationId);
    const organizations = DataService.getOrganizationsForLocation(this.locationId);

    const hasNetwork = persons.length > 0 || organizations.length > 0;

    // Build cards HTML conditionally
    const cards = [];

    // Map always shows (it's the primary view for a location)
    if (location.coordinates) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Location Map</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="location-map"></div>
        </div>
      `);
    }

    if (narratives.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related Narratives (${narratives.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="location-narratives"></div>
        </div>
      `);
    }

    if (events.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Events at this Location (${events.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="location-timeline"></div>
        </div>
      `);
    }

    if (hasNetwork) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Associated People & Organizations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="location-network"></div>
        </div>
      `);
    }

    this.container.innerHTML = `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#/dashboard">Dashboard</a>
          <span>/</span>
          <a href="#/locations">Locations</a>
          <span>/</span>
          ${location.name}
        </div>
        <h1>${location.name}</h1>
        <p class="subtitle">
          ${location.type ? `Type: ${location.type}` : ''}
          ${location.coordinates ? ` • Coordinates: ${location.coordinates.lat.toFixed(4)}, ${location.coordinates.lng.toFixed(4)}` : ''}
        </p>
      </div>

      <div class="content-area">
        <div class="content-grid">
          ${cards.join('')}
        </div>
      </div>
    `;

    // Initialize card width toggles
    if (cards.length > 0) {
      const contentGrid = this.container.querySelector('.content-grid');
      initAllCardToggles(contentGrid, `location-${this.locationId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = {
      location, narratives, events, persons, organizations
    };

    await this.initializeComponents();
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
