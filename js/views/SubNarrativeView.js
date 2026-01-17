/**
 * SubNarrativeView.js
 * Detail view for a sub-narrative (similar to NarrativeView but with parent link)
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { StackedAreaChart } from '../components/StackedAreaChart.js';
import { SentimentChart } from '../components/SentimentChart.js';
import { VennDiagram } from '../components/VennDiagram.js';
import { MapView } from '../components/MapView.js';
import { Timeline } from '../components/Timeline.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { getSourceViewer } from '../components/SourceViewerModal.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class SubNarrativeView extends BaseView {
  constructor(container, subNarrativeId, options = {}) {
    super(container, options);
    this.subNarrativeId = subNarrativeId;
  }

  async render() {
    const subNarrative = DataService.getSubNarrative(this.subNarrativeId);
    if (!subNarrative) {
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> Sub-Narrative not found
          </div>
          <h1>Sub-Narrative not found</h1>
        </div>
      `;
      return;
    }

    // Fetch all data upfront to determine which cards to show
    const parentNarrative = DataService.getParentNarrative(this.subNarrativeId);
    const factionData = DataService.getFactionsForSubNarrative(subNarrative.id);
    const factions = factionData.map(f => f.faction).filter(Boolean);
    const factionOverlaps = factions.length > 1
      ? DataService.getFactionOverlapsFor(factions[0]?.id).filter(o =>
          o.factionIds.every(fid => factions.some(f => f.id === fid))
        )
      : [];

    // Check data availability for each section
    const hasVolumeData = subNarrative.volumeOverTime && subNarrative.volumeOverTime.length > 0 && factions.length > 0;
    const locations = (subNarrative.locationIds || []).map(lid => DataService.getLocation(lid)).filter(Boolean);
    const events = (subNarrative.eventIds || []).map(eid => DataService.getEvent(eid)).filter(Boolean);
    const personIds = subNarrative.personIds || [];
    const orgIds = subNarrative.organizationIds || [];
    const hasNetwork = personIds.length > 0 || orgIds.length > 0;

    // Build cards HTML conditionally
    const cards = [];

    if (hasVolumeData) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Volume by Faction Over Time</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="sub-volume-chart"></div>
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
          <div class="card-body" id="sub-sentiment-chart"></div>
        </div>
      `);
    }

    if (factions.length >= 2) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Faction Overlaps</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="sub-venn"></div>
        </div>
      `);
    }

    if (locations.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related Locations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="sub-map"></div>
        </div>
      `);
    }

    if (events.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related Events</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="sub-timeline"></div>
        </div>
      `);
    }

    if (hasNetwork) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">People & Organizations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="sub-network"></div>
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
          ${parentNarrative ? `<a href="#/narrative/${parentNarrative.id}">Parent</a> <span>/</span>` : ''}
          Sub-Narrative
        </div>
        <h1>${subNarrative.text}</h1>
        <p class="subtitle">
          <span class="badge badge-${this.getSentimentClass(subNarrative.sentiment)}">${this.formatSentiment(subNarrative.sentiment)}</span>
        </p>
        ${subNarrative.description ? `
          <p class="narrative-detail-description header-description">
            ${subNarrative.description}
            <a href="#" class="source-link" id="subnarrative-source-link">View source</a>
          </p>
        ` : ''}
      </div>

      <div class="content-area">
        ${parentNarrative ? `
          <div class="parent-link" onclick="window.location.hash='#/narrative/${parentNarrative.id}'">
            <span class="parent-link-icon">↑</span>
            <span class="parent-link-text">${parentNarrative.text}</span>
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
      initAllCardToggles(contentGrid, `subnarrative-${this.subNarrativeId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = {
      subNarrative, factionData, factions, factionOverlaps,
      hasVolumeData, locations, events, personIds, orgIds
    };

    await this.initializeComponents();

    // Set up source link handler
    const sourceLink = this.container.querySelector('#subnarrative-source-link');
    if (sourceLink) {
      sourceLink.addEventListener('click', (e) => {
        e.preventDefault();
        getSourceViewer().open(subNarrative, 'subnarrative');
      });
    }
  }

  async initializeComponents() {
    const {
      subNarrative, factionData, factions, factionOverlaps,
      hasVolumeData, locations, events, personIds, orgIds
    } = this._prefetchedData;

    // Volume Over Time Chart
    if (hasVolumeData) {
      const dates = subNarrative.volumeOverTime.map(d => d.date);
      const series = factions.map(f =>
        subNarrative.volumeOverTime.map(d => (d.factionVolumes || {})[f.id] || 0)
      );

      this.components.volumeChart = new StackedAreaChart('sub-volume-chart', {
        height: 250,
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.volumeChart.update({ dates, series, factions });
    }

    // Sentiment Chart
    if (factionData.length > 0) {
      const sentimentFactions = factionData.map(fd => ({
        ...fd.faction,
        sentiment: fd.sentiment
      }));

      this.components.sentimentChart = new SentimentChart('sub-sentiment-chart', {
        height: Math.max(150, factionData.length * 50),
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.sentimentChart.update({ factions: sentimentFactions });
    }

    // Venn Diagram
    if (factions.length >= 2) {
      this.components.venn = new VennDiagram('sub-venn', {
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
    }

    // Map
    if (locations.length > 0) {
      this.components.map = new MapView('sub-map', {
        height: 350
      });
      this.components.map.update({ locations });
    }

    // Timeline
    if (events.length > 0) {
      this.components.timeline = new Timeline('sub-timeline', {
        height: 250,
        onEventClick: (e) => {
          window.location.hash = `#/event/${e.id}`;
        }
      });
      this.components.timeline.update({ events });
    }

    // Network Graph
    if (personIds.length > 0 || orgIds.length > 0) {
      const networkData = DataService.buildNetworkGraph(personIds, orgIds);

      this.components.network = new NetworkGraph('sub-network', {
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
    }
  }

}

export default SubNarrativeView;
