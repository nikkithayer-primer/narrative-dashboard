/**
 * NarrativeView.js
 * Detail view for a single narrative
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CardBuilder } from '../utils/CardBuilder.js';
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
      this.renderNotFound('Narrative');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchNarrativeData(narrative);
    
    // Build cards HTML
    const cardsHtml = this.buildCardsHtml(narrative, data);

    // Build page header
    const mission = narrative.missionId 
      ? DataService.getMission(narrative.missionId) 
      : null;
    
    const subtitleParts = [
      `<span class="badge badge-${this.getSentimentClass(narrative.sentiment)}">${this.formatSentiment(narrative.sentiment)}</span>`,
      mission ? `<span class="text-muted ml-2">Mission: ${mission.name}</span>` : ''
    ].filter(Boolean).join('');

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Dashboard', href: '#/dashboard' },
        { label: 'Narratives', href: '#/narratives' },
        'Detail'
      ],
      title: narrative.text,
      badge: `<span class="badge badge-status-${narrative.status || 'new'}">${this.formatStatus(narrative.status || 'new')}</span>`,
      subtitle: subtitleParts,
      description: narrative.description,
      descriptionLink: narrative.description 
        ? `<a href="#" class="source-link" id="narrative-source-link">View source</a>` 
        : ''
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
      initAllCardToggles(contentGrid, `narrative-${this.narrativeId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = { narrative, ...data };

    await this.initializeComponents();

    // Set up source link handler
    const sourceLink = this.container.querySelector('#narrative-source-link');
    if (sourceLink) {
      sourceLink.addEventListener('click', (e) => {
        e.preventDefault();
        getSourceViewer().open(narrative, 'narrative');
      });
    }

    // Set up description toggle for themes
    const descToggle = this.container.querySelector('#subnarrative-desc-toggle');
    if (descToggle && this.components.subNarrativeList) {
      descToggle.addEventListener('click', () => {
        const isShowing = this.components.subNarrativeList.toggleDescription();
        descToggle.classList.toggle('active', isShowing);
      });
    }
  }

  fetchNarrativeData(narrative) {
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

    return {
      subNarratives, factionData, factions, factionOverlaps,
      events, allEvents, hasVolumeData, sourceVolumeTime, hasSourceData, hasVolumeTimeline,
      locations, mapLocations, personIds, orgIds, hasNetwork, documents
    };
  }

  buildCardsHtml(narrative, data) {
    const cards = [];

    if (data.subNarratives.length > 0) {
      cards.push(CardBuilder.create('Themes', 'narrative-subnarratives', {
        count: data.subNarratives.length,
        fullWidth: true,
        noPadding: true,
        actions: CardBuilder.descriptionToggle('subnarrative-desc-toggle')
      }));
    }

    // Volume Over Time and Sentiment by Faction as half-width cards (side by side)
    if (data.hasVolumeTimeline) {
      cards.push(CardBuilder.create('Volume & Events', 'narrative-volume-events', { halfWidth: true }));
    }

    if (data.factionData.length > 0) {
      cards.push(CardBuilder.create('Sentiment by Faction', 'narrative-sentiment-chart', { halfWidth: true }));
    }

    if (data.factions.length >= 2) {
      cards.push(CardBuilder.create('Faction Overlaps', 'narrative-venn', { halfWidth: true }));
    }

    if (data.hasNetwork) {
      cards.push(CardBuilder.create('People & Organizations', 'narrative-network', { halfWidth: true }));
    }

    if (data.documents.length > 0) {
      cards.push(CardBuilder.create('Source Documents', 'narrative-documents', {
        count: data.documents.length,
        halfWidth: true,
        noPadding: true
      }));
    }

    if (data.mapLocations.length > 0) {
      cards.push(CardBuilder.create('Related Locations & Events', 'narrative-map', {
        halfWidth: true,
        noPadding: true
      }));
    }

    return cards.join('');
  }

  async initializeComponents() {
    const {
      narrative, subNarratives, factionData, factions, factionOverlaps,
      allEvents, hasVolumeData, sourceVolumeTime, hasSourceData,
      mapLocations, personIds, orgIds, documents
    } = this._prefetchedData;

    // Themes List
    if (subNarratives.length > 0) {
      this.components.subNarrativeList = new SubNarrativeList('narrative-subnarratives', {
        onSubNarrativeClick: (s) => {
          window.location.hash = `#/subnarrative/${s.id}`;
        }
      });
      this.components.subNarrativeList.update({ subNarratives });
    }

    // Volume & Events Chart (half-width)
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

      this.components.volumeEvents = new TimelineVolumeComposite('narrative-volume-events', {
        height: 320,
        volumeHeight: 140,
        timelineHeight: 140,
        showViewToggle: !!(volumeData && sourceData),
        onEventClick: (e) => {
          window.location.hash = `#/event/${e.id}`;
        },
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.volumeEvents.update({
        volumeData,
        sourceData,
        events: allEvents
      });
      this.components.volumeEvents.enableAutoResize();
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
      this.components.sentimentChart.enableAutoResize();
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
