/**
 * DocumentView.js
 * Detail view for a single source document
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { SubNarrativeList } from '../components/SubNarrativeList.js';
import { MapView } from '../components/MapView.js';
import { Timeline } from '../components/Timeline.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class DocumentView extends BaseView {
  constructor(container, documentId, options = {}) {
    super(container, options);
    this.documentId = documentId;
  }

  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  async render() {
    const doc = DataService.getDocument(this.documentId);
    if (!doc) {
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> Document not found
          </div>
          <h1>Document not found</h1>
        </div>
      `;
      return;
    }

    // Fetch related entities
    const source = DataService.getSourceForDocument(this.documentId);
    const narratives = DataService.getNarrativesForDocument(this.documentId);
    const subNarratives = DataService.getSubNarrativesForDocument(this.documentId);
    const persons = DataService.getPersonsForDocument(this.documentId);
    const organizations = DataService.getOrganizationsForDocument(this.documentId);
    const locations = DataService.getLocationsForDocument(this.documentId);
    const events = DataService.getEventsForDocument(this.documentId);

    const hasNetwork = persons.length > 0 || organizations.length > 0;

    // Build cards HTML conditionally
    const cards = [];

    if (narratives.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related Narratives (${narratives.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="doc-narratives"></div>
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
          <div class="card-body no-padding" id="doc-subnarratives"></div>
        </div>
      `);
    }

    if (hasNetwork) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Mentioned People & Organizations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="doc-network"></div>
        </div>
      `);
    }

    if (locations.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Mentioned Locations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="doc-map"></div>
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
          <div class="card-body" id="doc-timeline"></div>
        </div>
      `);
    }

    this.container.innerHTML = `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#/dashboard">Dashboard</a>
          <span>/</span>
          Document
        </div>
        <div class="document-detail-header">
          ${source ? `
            <div class="document-source-badge" ${source.color ? `style="background: ${source.color}20; border-color: ${source.color}40; color: ${source.color}"` : ''}>
              ${source.name}
            </div>
          ` : ''}
          <span class="document-date-detail">${this.formatDate(doc.publishedDate)}</span>
        </div>
        <h1>${doc.title}</h1>
        ${doc.excerpt ? `
          <p class="document-excerpt-detail">${doc.excerpt}</p>
        ` : ''}
        <div class="document-actions">
          <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2h8v8M14 2L6 10"/>
            </svg>
            View Original Source
          </a>
        </div>
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
      initAllCardToggles(contentGrid, `doc-${this.documentId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = {
      doc, source, narratives, subNarratives,
      persons, organizations, locations, events
    };

    await this.initializeComponents();
  }

  async initializeComponents() {
    const {
      narratives, subNarratives, persons, organizations, locations, events
    } = this._prefetchedData;

    // Narratives List
    if (narratives.length > 0) {
      this.components.narrativeList = new NarrativeList('doc-narratives', {
        maxItems: 10,
        onNarrativeClick: (n) => {
          window.location.hash = `#/narrative/${n.id}`;
        }
      });
      this.components.narrativeList.update({ narratives });
    }

    // Sub-Narratives List
    if (subNarratives.length > 0) {
      this.components.subNarrativeList = new SubNarrativeList('doc-subnarratives', {
        maxItems: 10,
        onSubNarrativeClick: (s) => {
          window.location.hash = `#/subnarrative/${s.id}`;
        }
      });
      this.components.subNarrativeList.update({ subNarratives });
    }

    // Network Graph
    if (persons.length > 0 || organizations.length > 0) {
      const personIds = persons.map(p => p.id);
      const orgIds = organizations.map(o => o.id);
      const networkData = DataService.buildNetworkGraph(personIds, orgIds);

      this.components.network = new NetworkGraph('doc-network', {
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

    // Map
    if (locations.length > 0) {
      this.components.map = new MapView('doc-map', {
        height: 300
      });
      this.components.map.update({ locations });
    }

    // Events Timeline
    if (events.length > 0) {
      this.components.timeline = new Timeline('doc-timeline', {
        height: 200,
        onEventClick: (e) => {
          window.location.hash = `#/event/${e.id}`;
        }
      });
      this.components.timeline.update({ events });
    }
  }

}

export default DocumentView;
