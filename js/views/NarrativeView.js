/**
 * NarrativeView.js
 * Detail view for a single narrative
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { SubNarrativeList } from '../components/SubNarrativeList.js';
import { SentimentChart } from '../components/SentimentChart.js';
import { VennDiagram } from '../components/VennDiagram.js';
import { MapView } from '../components/MapView.js';
import { TimelineVolumeComposite } from '../components/TimelineVolumeComposite.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { DocumentList } from '../components/DocumentList.js';
import { getSourceViewer } from '../components/SourceViewerModal.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class NarrativeView extends BaseView {
  constructor(container, narrativeId, options = {}) {
    super(container, options);
    this.narrativeId = narrativeId;
  }

  async render() {
    const narrative = DataService.getNarrative(this.narrativeId);
    if (!narrative) {
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> Narrative not found
          </div>
          <h1>Narrative not found</h1>
        </div>
      `;
      return;
    }

    // Fetch all data upfront to determine which cards to show
    const mission = narrative.missionId 
      ? DataService.getMission(narrative.missionId) 
      : null;
    const subNarratives = DataService.getSubNarrativesForNarrative(narrative.id);
    const factionData = DataService.getFactionsForNarrative(narrative.id);
    const factions = factionData.map(f => f.faction).filter(Boolean);
    const factionOverlaps = factions.length > 1 
      ? DataService.getFactionOverlapsFor(factions[0]?.id).filter(o =>
          o.factionIds.every(fid => factions.some(f => f.id === fid))
        )
      : [];

    // Volume/Timeline data
    const events = DataService.getEventsForNarrative(narrative.id);
    const allEvents = events.flatMap(e => [e, ...DataService.getSubEventsForEvent(e.id)]);
    const hasVolumeData = narrative.volumeOverTime && narrative.volumeOverTime.length > 0 && factions.length > 0;
    const sourceVolumeTime = DataService.getSourceVolumeOverTime(narrative.id);
    const hasSourceData = sourceVolumeTime.dates.length > 0 && sourceVolumeTime.sources.length > 0;
    const hasVolumeTimeline = hasVolumeData || hasSourceData || allEvents.length > 0;

    // Map data
    const locations = DataService.getLocationsForNarrative(narrative.id);
    const mapLocations = [
      ...locations.map(l => ({ ...l, isEvent: false })),
      ...events.filter(e => e.locationId).map(e => {
        const loc = DataService.getLocation(e.locationId);
        return loc ? { ...loc, isEvent: true, eventText: e.text } : null;
      }).filter(Boolean)
    ];

    // Network data
    const personIds = narrative.personIds || [];
    const orgIds = narrative.organizationIds || [];
    const hasNetwork = personIds.length > 0 || orgIds.length > 0;

    // Documents data
    const documents = DataService.getDocumentsForNarrative(narrative.id);

    // Build cards HTML conditionally
    const cards = [];

    if (subNarratives.length > 0) {
      cards.push(`
        <div class="card card-full-width">
          <div class="card-header">
            <h2 class="card-title">Sub-Narratives (${subNarratives.length})</h2>
            <div class="card-header-actions">
              <button class="card-action-btn description-toggle" title="Toggle descriptions" id="subnarrative-desc-toggle">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 4h10M3 8h10M3 12h6"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="card-body no-padding" id="narrative-subnarratives"></div>
        </div>
      `);
    }

    if (hasVolumeTimeline) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Volume Over Time & Events</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="narrative-volume-timeline"></div>
        </div>
      `);
    }

    if (factionData.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Sentiment by Faction</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="narrative-sentiment-chart"></div>
        </div>
      `);
    }

    // Faction Overlaps and Network side by side (half width each)
    if (factions.length >= 2) {
      cards.push(`
        <div class="card card-half-width">
          <div class="card-header">
            <h2 class="card-title">Faction Overlaps</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="narrative-venn"></div>
        </div>
      `);
    }

    if (hasNetwork) {
      cards.push(`
        <div class="card card-half-width">
          <div class="card-header">
            <h2 class="card-title">People & Organizations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="narrative-network"></div>
        </div>
      `);
    }

    // Documents and Map side by side (half width each)
    if (documents.length > 0) {
      cards.push(`
        <div class="card card-half-width">
          <div class="card-header">
            <h2 class="card-title">Source Documents (${documents.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="narrative-documents"></div>
        </div>
      `);
    }

    if (mapLocations.length > 0) {
      cards.push(`
        <div class="card card-half-width">
          <div class="card-header">
            <h2 class="card-title">Related Locations & Events</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="narrative-map"></div>
        </div>
      `);
    }

    this.container.innerHTML = `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#/dashboard">Dashboard</a>
          <span>/</span>
          <a href="#/narratives">Narratives</a>
          <span>/</span>
          Detail
        </div>
        <div class="page-title-row">
          <h1>${narrative.text}</h1>
          <span class="badge badge-status-${narrative.status || 'new'}">${this.formatStatus(narrative.status || 'new')}</span>
        </div>
        <p class="subtitle">
          <span class="badge badge-${this.getSentimentClass(narrative.sentiment)}">${this.formatSentiment(narrative.sentiment)}</span>
          ${mission ? `<span class="text-muted ml-2">Mission: ${mission.name}</span>` : ''}
        </p>
        ${narrative.description ? `
          <p class="narrative-detail-description header-description">
            ${narrative.description}
            <a href="#" class="source-link" id="narrative-source-link">View source</a>
          </p>
        ` : ''}
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
      initAllCardToggles(contentGrid, `narrative-${this.narrativeId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = {
      narrative, subNarratives, factionData, factions, factionOverlaps,
      events, allEvents, hasVolumeData, sourceVolumeTime, hasSourceData,
      mapLocations, personIds, orgIds, documents
    };

    await this.initializeComponents();

    // Set up source link handler
    const sourceLink = this.container.querySelector('#narrative-source-link');
    if (sourceLink) {
      sourceLink.addEventListener('click', (e) => {
        e.preventDefault();
        getSourceViewer().open(narrative, 'narrative');
      });
    }

    // Set up description toggle for sub-narratives
    const descToggle = this.container.querySelector('#subnarrative-desc-toggle');
    if (descToggle && this.components.subNarrativeList) {
      descToggle.addEventListener('click', () => {
        const isShowing = this.components.subNarrativeList.toggleDescription();
        descToggle.classList.toggle('active', isShowing);
      });
    }
  }

  async initializeComponents() {
    const {
      narrative, subNarratives, factionData, factions, factionOverlaps,
      allEvents, hasVolumeData, sourceVolumeTime, hasSourceData,
      mapLocations, personIds, orgIds, documents
    } = this._prefetchedData;

    // Sub-Narratives List
    if (subNarratives.length > 0) {
      this.components.subNarrativeList = new SubNarrativeList('narrative-subnarratives', {
        onSubNarrativeClick: (s) => {
          window.location.hash = `#/subnarrative/${s.id}`;
        }
      });
      this.components.subNarrativeList.update({ subNarratives });
    }

    // Volume & Timeline Composite
    if (hasVolumeData || hasSourceData || allEvents.length > 0) {
      let volumeData = null;
      if (hasVolumeData) {
        const dates = narrative.volumeOverTime.map(d => d.date);
        const series = factions.map(f =>
          narrative.volumeOverTime.map(d => (d.factionVolumes || {})[f.id] || 0)
        );
        volumeData = { dates, series, factions };
      }

      const sourceData = hasSourceData ? sourceVolumeTime : null;

      this.components.volumeTimeline = new TimelineVolumeComposite('narrative-volume-timeline', {
        height: 450,
        volumeHeight: 180,
        timelineHeight: 180,
        showViewToggle: !!(volumeData && sourceData),
        onEventClick: (e) => {
          window.location.hash = `#/event/${e.id}`;
        },
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.volumeTimeline.update({
        volumeData,
        sourceData,
        events: allEvents
      });
    }

    // Sentiment Chart
    if (factionData.length > 0) {
      const sentimentFactions = factionData.map(fd => ({
        ...fd.faction,
        sentiment: fd.sentiment
      }));

      this.components.sentimentChart = new SentimentChart('narrative-sentiment-chart', {
        height: Math.max(150, factionData.length * 50),
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.sentimentChart.update({ factions: sentimentFactions });
    }

    // Venn Diagram
    if (factions.length >= 2) {
      this.components.venn = new VennDiagram('narrative-venn', {
        height: 300,
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.venn.update({
        sets: factions.map(f => ({
          id: f.id,
          name: f.name,
          size: f.memberCount || 1000,
          color: f.color
        })),
        overlaps: factionOverlaps
      });
      // Enable auto-resize so diagram re-centers when card is resized
      this.components.venn.enableAutoResize();
    }

    // Map
    if (mapLocations.length > 0) {
      this.components.map = new MapView('narrative-map', {
        height: 350
      });
      this.components.map.update({ locations: mapLocations });
    }

    // Network Graph
    if (personIds.length > 0 || orgIds.length > 0) {
      const networkData = DataService.buildNetworkGraph(personIds, orgIds);
      
      this.components.network = new NetworkGraph('narrative-network', {
        height: 400,
        onNodeClick: (node) => {
          const route = node.type === 'person' ? 'person' : 'organization';
          window.location.hash = `#/${route}/${node.id}`;
        },
        onLinkClick: (link) => {
          this.showConnectingNarrativesModal(link);
        }
      });
      this.components.network.update(networkData);
      // Enable auto-resize so graph re-centers when card is resized
      this.components.network.enableAutoResize();
    }

    // Document List
    if (documents.length > 0) {
      this.components.documentList = new DocumentList('narrative-documents', {
        maxItems: 10,
        onDocumentClick: (doc) => {
          window.location.hash = `#/document/${doc.id}`;
        }
      });
      this.components.documentList.update({ documents });
    }
  }

}

export default NarrativeView;
