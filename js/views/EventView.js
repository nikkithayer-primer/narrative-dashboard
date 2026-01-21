/**
 * EventView.js
 * Detail view for an event
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CardBuilder } from '../utils/CardBuilder.js';
import { Timeline } from '../components/Timeline.js';
import { MapView } from '../components/MapView.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { DocumentList } from '../components/DocumentList.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class EventView extends BaseView {
  constructor(container, eventId, options = {}) {
    super(container, options);
    this.eventId = eventId;
  }

  async render() {
    const event = DataService.getEvent(this.eventId);
    if (!event) {
      this.renderNotFound('Event');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchEventData(event);
    
    // Build cards HTML
    const cardsHtml = this.buildCardsHtml(event, data);

    // Format date for subtitle
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const subtitleParts = [
      formattedDate,
      data.location ? data.location.name : ''
    ].filter(Boolean).join(' • ');

    // Build breadcrumbs with optional parent event
    const breadcrumbs = [
      { label: 'Dashboard', href: '#/dashboard' },
      { label: 'Events', href: '#/events' }
    ];
    if (data.parentEvent) {
      breadcrumbs.push({ label: this.truncateText(data.parentEvent.text, 30), href: `#/event/${data.parentEvent.id}` });
    }
    breadcrumbs.push(this.truncateText(event.text, 40));

    // Build page header
    const headerHtml = PageHeader.render({
      breadcrumbs: breadcrumbs,
      title: event.text,
      subtitle: subtitleParts
    });

    // Build parent link HTML if applicable
    const parentLinkHtml = data.parentEvent ? `
      <div class="parent-link" onclick="window.location.hash='#/event/${data.parentEvent.id}'">
        <span class="parent-link-icon">↑</span>
        <span class="parent-link-text">${data.parentEvent.text}</span>
      </div>
    ` : '';

    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        ${parentLinkHtml}
        <div class="content-grid">
          ${cardsHtml}
        </div>
      </div>
    `;

    // Initialize card width toggles
    // Map (index 1) and People & Orgs (index 2) default to half-width
    if (cardsHtml) {
      const contentGrid = this.container.querySelector('.content-grid');
      initAllCardToggles(contentGrid, `event-${this.eventId}`, { 1: 'half', 2: 'half' });
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = { event, ...data };

    await this.initializeComponents();
  }

  fetchEventData(event) {
    const parentEvent = DataService.getParentEvent(this.eventId);
    const subEvents = DataService.getSubEventsForEvent(this.eventId);
    const location = DataService.getLocationForEvent(this.eventId);
    const persons = DataService.getPersonsForEvent(this.eventId);
    const organizations = DataService.getOrganizationsForEvent(this.eventId);
    const narratives = DataService.getNarrativesForEvent(this.eventId);
    const documents = DataService.getDocumentsForEvent(this.eventId);
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    return { parentEvent, subEvents, location, persons, organizations, narratives, documents, hasNetwork };
  }

  buildCardsHtml(event, data) {
    const cards = [];

    // Timeline always shows (includes main event)
    const timelineTitle = data.subEvents.length > 0 
      ? `Event Timeline (${data.subEvents.length} sub-events)` 
      : 'Event Timeline';
    cards.push(CardBuilder.create(timelineTitle, 'event-timeline'));

    if (data.location) {
      cards.push(CardBuilder.create('Location', 'event-map', { halfWidth: true, noPadding: true }));
    }

    if (data.hasNetwork) {
      cards.push(CardBuilder.create('People & Organizations Involved', 'event-network', { halfWidth: true }));
    }

    if (data.narratives.length > 0) {
      cards.push(CardBuilder.create('Related Narratives', 'event-narratives', {
        count: data.narratives.length,
        noPadding: true
      }));
    }

    if (data.documents.length > 0) {
      cards.push(CardBuilder.create('Source Documents', 'event-documents', {
        count: data.documents.length,
        noPadding: true
      }));
    }

    return cards.join('');
  }

  async initializeComponents() {
    const { event, subEvents, location, persons, organizations, narratives, documents } = this._prefetchedData;

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

    // Document List
    if (documents.length > 0) {
      this.components.documentList = new DocumentList('event-documents', {
        maxItems: 10,
        onDocumentClick: (doc) => {
          window.location.hash = `#/document/${doc.id}`;
        }
      });
      this.components.documentList.update({ documents });
    }
  }
}

export default EventView;
