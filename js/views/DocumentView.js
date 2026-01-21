/**
 * DocumentView.js
 * Detail view for a single source document
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CardBuilder } from '../utils/CardBuilder.js';
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
      this.renderNotFound('Document');
      return;
    }

    // Fetch all related data
    const data = this.fetchDocumentData(doc);
    
    // Build cards HTML
    const cardsHtml = this.buildCardsHtml(doc, data);

    // Build custom header (documents have a unique header format)
    const headerHtml = this.renderDocumentHeader(doc, data.source);

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
      initAllCardToggles(contentGrid, `doc-${this.documentId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = { doc, ...data };

    await this.initializeComponents();
  }

  fetchDocumentData(doc) {
    const source = DataService.getSourceForDocument(this.documentId);
    const narratives = DataService.getNarrativesForDocument(this.documentId);
    const subNarratives = DataService.getSubNarrativesForDocument(this.documentId);
    const persons = DataService.getPersonsForDocument(this.documentId);
    const organizations = DataService.getOrganizationsForDocument(this.documentId);
    const locations = DataService.getLocationsForDocument(this.documentId);
    const events = DataService.getEventsForDocument(this.documentId);
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    return {
      source, narratives, subNarratives, persons, organizations, locations, events, hasNetwork
    };
  }

  buildCardsHtml(doc, data) {
    const cards = [];

    if (data.narratives.length > 0) {
      cards.push(CardBuilder.create('Related Narratives', 'doc-narratives', {
        count: data.narratives.length,
        noPadding: true
      }));
    }

    if (data.subNarratives.length > 0) {
      cards.push(CardBuilder.create('Related Themes', 'doc-subnarratives', {
        count: data.subNarratives.length,
        noPadding: true
      }));
    }

    if (data.hasNetwork) {
      cards.push(CardBuilder.create('Mentioned People & Organizations', 'doc-network'));
    }

    if (data.locations.length > 0) {
      cards.push(CardBuilder.create('Mentioned Locations', 'doc-map', { noPadding: true }));
    }

    if (data.events.length > 0) {
      cards.push(CardBuilder.create('Related Events', 'doc-timeline', {
        count: data.events.length
      }));
    }

    return cards.join('');
  }

  renderDocumentHeader(doc, source) {
    const breadcrumbsHtml = PageHeader.renderBreadcrumbs([
      { label: 'Dashboard', href: '#/dashboard' },
      'Document'
    ]);

    const sourceHtml = source ? `
      <div class="document-source-badge" ${source.color ? `style="background: ${source.color}20; border-color: ${source.color}40; color: ${source.color}"` : ''}>
        ${source.name}
      </div>
    ` : '';

    return `
      <div class="page-header">
        ${breadcrumbsHtml}
        <div class="document-detail-header">
          ${sourceHtml}
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
    `;
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

    // Themes List
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
