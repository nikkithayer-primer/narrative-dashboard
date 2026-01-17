/**
 * EventView.js
 * Detail view for an event
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { Timeline } from '../components/Timeline.js';
import { MapView } from '../components/MapView.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { SubNarrativeList } from '../components/SubNarrativeList.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class EventView extends BaseView {
  constructor(container, eventId, options = {}) {
    super(container, options);
    this.eventId = eventId;
  }

  async render() {
    const event = DataService.getEvent(this.eventId);
    if (!event) {
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> Event not found
          </div>
          <h1>Event not found</h1>
        </div>
      `;
      return;
    }

    // Fetch all data upfront to determine which cards to show
    const parentEvent = DataService.getParentEvent(this.eventId);
    const subEvents = DataService.getSubEventsForEvent(this.eventId);
    const location = DataService.getLocationForEvent(this.eventId);
    const persons = DataService.getPersonsForEvent(this.eventId);
    const organizations = DataService.getOrganizationsForEvent(this.eventId);
    const narratives = DataService.getNarrativesForEvent(this.eventId);
    const subNarratives = DataService.getSubNarrativesForEvent(this.eventId);

    const hasNetwork = persons.length > 0 || organizations.length > 0;

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Build cards HTML conditionally
    const cards = [];

    // Timeline always shows (includes main event)
    cards.push(`
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Event Timeline ${subEvents.length > 0 ? `(${subEvents.length} sub-events)` : ''}</h2>
          <div class="card-header-actions"></div>
        </div>
        <div class="card-body" id="event-timeline"></div>
      </div>
    `);

    if (location) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Location</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="event-map"></div>
        </div>
      `);
    }

    if (hasNetwork) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">People & Organizations Involved</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="event-network"></div>
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
          <div class="card-body no-padding" id="event-narratives"></div>
        </div>
      `);
    }

    if (subNarratives.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related Sub-Narratives (${subNarratives.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="event-subnarratives"></div>
        </div>
      `);
    }

    this.container.innerHTML = `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#/dashboard">Dashboard</a>
          <span>/</span>
          <a href="#/events">Events</a>
          <span>/</span>
          ${parentEvent ? `<a href="#/event/${parentEvent.id}">${this.truncateText(parentEvent.text, 30)}</a> <span>/</span>` : ''}
          ${this.truncateText(event.text, 40)}
        </div>
        <h1>${event.text}</h1>
        <p class="subtitle">
          ${formattedDate}
          ${location ? ` • ${location.name}` : ''}
        </p>
      </div>

      <div class="content-area">
        ${parentEvent ? `
          <div class="parent-link" onclick="window.location.hash='#/event/${parentEvent.id}'">
            <span class="parent-link-icon">↑</span>
            <span class="parent-link-text">${parentEvent.text}</span>
          </div>
        ` : ''}

        <div class="content-grid">
          ${cards.join('')}
        </div>
      </div>
    `;

    // Initialize card width toggles
    if (cards.length > 0) {
      const contentGrid = this.container.querySelector('.content-grid');
      initAllCardToggles(contentGrid, `event-${this.eventId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = {
      event, subEvents, location, persons, organizations, narratives, subNarratives
    };

    await this.initializeComponents();
  }

  async initializeComponents() {
    const { event, subEvents, location, persons, organizations, narratives, subNarratives } = this._prefetchedData;

    // Timeline with this event and its sub-events
    const allEvents = [event, ...subEvents];
    
    this.components.timeline = new Timeline('event-timeline', {
      height: 280,
      onEventClick: (e) => {
        if (e.id !== this.eventId) {
          window.location.hash = `#/event/${e.id}`;
        }
      }
    });
    this.components.timeline.update({ events: allEvents });

    // Map
    if (location) {
      this.components.map = new MapView('event-map', {
        height: 350,
        defaultZoom: 12
      });
      this.components.map.update({
        locations: [{ ...location, isEvent: true, eventText: event.text }]
      });
    }

    // Network Graph
    if (persons.length > 0 || organizations.length > 0) {
      const personIds = persons.map(p => p.id);
      const orgIds = organizations.map(o => o.id);
      const networkData = DataService.buildNetworkGraph(personIds, orgIds);

      this.components.network = new NetworkGraph('event-network', {
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

    // Narratives List
    if (narratives.length > 0) {
      this.components.narrativeList = new NarrativeList('event-narratives', {
        maxItems: 8,
        onNarrativeClick: (n) => {
          window.location.hash = `#/narrative/${n.id}`;
        }
      });
      this.components.narrativeList.update({ narratives });
    }

    // Sub-Narratives List
    if (subNarratives.length > 0) {
      this.components.subNarrativeList = new SubNarrativeList('event-subnarratives', {
        maxItems: 8,
        onSubNarrativeClick: (s) => {
          window.location.hash = `#/subnarrative/${s.id}`;
        }
      });
      this.components.subNarrativeList.update({ subNarratives });
    }
  }

}

export default EventView;
