/**
 * PersonView.js
 * Detail view for a person
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { FactionCards } from '../components/FactionCards.js';
import { SentimentChart } from '../components/SentimentChart.js';
import { MapView } from '../components/MapView.js';
import { Timeline } from '../components/Timeline.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { DocumentList } from '../components/DocumentList.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class PersonView extends BaseView {
  constructor(container, personId, options = {}) {
    super(container, options);
    this.personId = personId;
  }

  async render() {
    const person = DataService.getPerson(this.personId);
    if (!person) {
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> Person not found
          </div>
          <h1>Person not found</h1>
        </div>
      `;
      return;
    }

    // Fetch all data upfront to determine which cards to show
    const relatedPersons = DataService.getRelatedPersons(this.personId);
    const relatedOrgs = DataService.getRelatedOrganizationsForPerson(this.personId);
    const affiliatedFactions = DataService.getAffiliatedFactionsForPerson(this.personId);
    const locations = DataService.getLocationsForPerson(this.personId);
    const events = DataService.getEventsForPerson(this.personId);
    const narratives = DataService.getNarrativesForPerson(this.personId);
    const documents = DataService.getDocumentsForPerson(this.personId);

    // Build sentiment data - how factions feel about this person
    const factionSentimentData = Object.entries(person.factionSentiment || {})
      .map(([factionId, sentiment]) => {
        const faction = DataService.getFaction(factionId);
        return faction ? { ...faction, sentiment } : null;
      })
      .filter(Boolean);

    const hasNetwork = relatedPersons.length > 0 || relatedOrgs.length > 0;

    // Build cards HTML conditionally
    const cards = [];

    // Row 1: Related People & Orgs + Faction Sentiment (both half-width)
    if (hasNetwork) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related People & Organizations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="person-network"></div>
        </div>
      `);
    }

    if (factionSentimentData.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Faction Sentiment Toward ${person.name}</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="person-sentiment"></div>
        </div>
      `);
    }

    // Row 2: Affiliated Factions + Map (both half-width)
    if (affiliatedFactions.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Affiliated Factions</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="person-factions"></div>
        </div>
      `);
    }

    if (locations.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Associated Locations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="person-map"></div>
        </div>
      `);
    }

    if (events.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related Events (${events.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="person-timeline"></div>
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
          <div class="card-body no-padding" id="person-narratives"></div>
        </div>
      `);
    }

    if (documents.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Source Documents (${documents.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="person-documents"></div>
        </div>
      `);
    }

    this.container.innerHTML = `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#/dashboard">Dashboard</a>
          <span>/</span>
          <a href="#/entities">People & Orgs</a>
          <span>/</span>
          ${person.name}
        </div>
        <h1>
          <span style="font-size: 1.5rem; margin-right: 12px;">👤</span>
          ${person.name}
        </h1>
        <p class="subtitle">
          ${person.type ? `Type: ${person.type}` : 'Person'}
        </p>
      </div>

      <div class="content-area">
        <div class="content-grid">
          ${cards.join('')}
        </div>
      </div>
    `;

    // Initialize card width toggles
    // Row 1: Network (0) + Sentiment (1) as half-width
    // Row 2: Factions (2) + Map (3) as half-width
    if (cards.length > 0) {
      const contentGrid = this.container.querySelector('.content-grid');
      initAllCardToggles(contentGrid, `person-${this.personId}`, { 0: 'half', 1: 'half', 2: 'half', 3: 'half' });
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = {
      person, relatedPersons, relatedOrgs, affiliatedFactions,
      locations, events, narratives, documents, factionSentimentData
    };

    await this.initializeComponents();
  }

  async initializeComponents() {
    const {
      relatedPersons, relatedOrgs, affiliatedFactions,
      locations, events, narratives, documents, factionSentimentData
    } = this._prefetchedData;

    // Network Graph
    if (relatedPersons.length > 0 || relatedOrgs.length > 0) {
      const personIds = [this.personId, ...relatedPersons.map(p => p.id)];
      const orgIds = relatedOrgs.map(o => o.id);
      const networkData = DataService.buildNetworkGraph(personIds, orgIds);

      this.components.network = new NetworkGraph('person-network', {
        height: 400,
        onNodeClick: (node) => {
          if (node.id !== this.personId) {
            const route = node.type === 'person' ? 'person' : 'organization';
            window.location.hash = `#/${route}/${node.id}`;
          }
        },
        onLinkClick: (link) => {
          this.showConnectingNarrativesModal(link);
        }
      });
      this.components.network.update(networkData);
    }

    // Faction Cards
    if (affiliatedFactions.length > 0) {
      this.components.factionCards = new FactionCards('person-factions', {
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.factionCards.update({ factions: affiliatedFactions });
    }

    // Sentiment Chart
    if (factionSentimentData.length > 0) {
      this.components.sentiment = new SentimentChart('person-sentiment', {
        height: Math.max(150, factionSentimentData.length * 50),
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.sentiment.update({ factions: factionSentimentData });
    }

    // Map
    if (locations.length > 0) {
      this.components.map = new MapView('person-map', {
        height: 350
      });
      this.components.map.update({ locations });
    }

    // Events Timeline
    if (events.length > 0) {
      this.components.timeline = new Timeline('person-timeline', {
        height: 250,
        onEventClick: (e) => {
          window.location.hash = `#/event/${e.id}`;
        }
      });
      this.components.timeline.update({ events });
    }

    // Narratives List
    if (narratives.length > 0) {
      this.components.narrativeList = new NarrativeList('person-narratives', {
        maxItems: 8,
        onNarrativeClick: (n) => {
          window.location.hash = `#/narrative/${n.id}`;
        }
      });
      this.components.narrativeList.update({ narratives });
    }

    // Document List
    if (documents.length > 0) {
      this.components.documentList = new DocumentList('person-documents', {
        maxItems: 10,
        onDocumentClick: (doc) => {
          window.location.hash = `#/document/${doc.id}`;
        }
      });
      this.components.documentList.update({ documents });
    }
  }

}

export default PersonView;
