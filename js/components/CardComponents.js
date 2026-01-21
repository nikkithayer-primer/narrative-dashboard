/**
 * CardComponents.js
 * Higher-level card components that combine CardBuilder with visualization components
 * These handle both HTML generation and component initialization
 */

import { CardBuilder } from '../utils/CardBuilder.js';
import { DataService } from '../data/DataService.js';
import { NetworkGraph } from './NetworkGraph.js';
import { NarrativeList } from './NarrativeList.js';
import { DocumentList } from './DocumentList.js';
import { MapView } from './MapView.js';
import { Timeline } from './Timeline.js';
import { SentimentChart } from './SentimentChart.js';
import { FactionCards } from './FactionCards.js';
import { VennDiagram } from './VennDiagram.js';

/**
 * Base class for card components
 */
class BaseCardComponent {
  constructor(view, containerId) {
    this.view = view;
    this.containerId = containerId;
    this.component = null;
  }

  /**
   * Get the card HTML - must be implemented by subclass
   */
  getCardHtml() {
    throw new Error('getCardHtml must be implemented');
  }

  /**
   * Initialize the component - must be implemented by subclass
   */
  initialize() {
    throw new Error('initialize must be implemented');
  }

  /**
   * Destroy the component
   */
  destroy() {
    if (this.component && this.component.destroy) {
      this.component.destroy();
    }
    this.component = null;
  }
}

/**
 * Network Graph Card Component
 */
export class NetworkGraphCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.personIds = options.personIds || [];
    this.orgIds = options.orgIds || [];
    this.excludeId = options.excludeId || null;
    this.excludeType = options.excludeType || null;
    this.title = options.title || 'People & Organizations';
    this.height = options.height || 400;
    this.halfWidth = options.halfWidth !== false;
  }

  hasData() {
    return this.personIds.length > 0 || this.orgIds.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      halfWidth: this.halfWidth
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    const networkData = DataService.buildNetworkGraph(this.personIds, this.orgIds);

    this.component = new NetworkGraph(this.containerId, {
      height: this.height,
      onNodeClick: (node) => {
        if (this.excludeId && node.id === this.excludeId) return;
        const route = node.type === 'person' ? 'person' : 'organization';
        window.location.hash = `#/${route}/${node.id}`;
      },
      onLinkClick: (link) => {
        if (this.view.showConnectingNarrativesModal) {
          this.view.showConnectingNarrativesModal(link);
        }
      }
    });
    this.component.update(networkData);
    
    if (this.options.enableAutoResize !== false) {
      this.component.enableAutoResize();
    }

    return this.component;
  }
}

/**
 * Narrative List Card Component
 */
export class NarrativeListCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.narratives = options.narratives || [];
    this.title = options.title || 'Related Narratives';
    this.maxItems = options.maxItems || 8;
    this.showCount = options.showCount !== false;
  }

  hasData() {
    return this.narratives.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      count: this.showCount ? this.narratives.length : undefined,
      noPadding: true
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new NarrativeList(this.containerId, {
      maxItems: this.maxItems,
      onNarrativeClick: (n) => {
        window.location.hash = `#/narrative/${n.id}`;
      }
    });
    this.component.update({ narratives: this.narratives });

    return this.component;
  }
}

/**
 * Document List Card Component
 */
export class DocumentListCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.documents = options.documents || [];
    this.title = options.title || 'Source Documents';
    this.maxItems = options.maxItems || 10;
    this.showCount = options.showCount !== false;
    this.halfWidth = options.halfWidth || false;
  }

  hasData() {
    return this.documents.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      count: this.showCount ? this.documents.length : undefined,
      noPadding: true,
      halfWidth: this.halfWidth
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new DocumentList(this.containerId, {
      maxItems: this.maxItems,
      onDocumentClick: (doc) => {
        window.location.hash = `#/document/${doc.id}`;
      }
    });
    this.component.update({ documents: this.documents });

    return this.component;
  }
}

/**
 * Map Card Component
 */
export class MapCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.locations = options.locations || [];
    this.title = options.title || 'Locations';
    this.height = options.height || 350;
    this.halfWidth = options.halfWidth || false;
    this.defaultZoom = options.defaultZoom || null;
    this.centerOn = options.centerOn || null;
  }

  hasData() {
    return this.locations.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      noPadding: true,
      halfWidth: this.halfWidth
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    const mapOptions = { height: this.height };
    if (this.defaultZoom) mapOptions.defaultZoom = this.defaultZoom;

    this.component = new MapView(this.containerId, mapOptions);
    this.component.update({ locations: this.locations });

    if (this.centerOn) {
      setTimeout(() => {
        this.component.centerOn(this.centerOn.lat, this.centerOn.lng, this.centerOn.zoom || 12);
      }, 200);
    }

    return this.component;
  }
}

/**
 * Timeline Card Component
 */
export class TimelineCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.events = options.events || [];
    this.title = options.title || 'Events';
    this.height = options.height || 250;
    this.showCount = options.showCount !== false;
    this.excludeId = options.excludeId || null;
  }

  hasData() {
    return this.events.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      count: this.showCount ? this.events.length : undefined
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new Timeline(this.containerId, {
      height: this.height,
      onEventClick: (e) => {
        if (this.excludeId && e.id === this.excludeId) return;
        window.location.hash = `#/event/${e.id}`;
      }
    });
    this.component.update({ events: this.events });

    return this.component;
  }
}

/**
 * Sentiment Chart Card Component
 */
export class SentimentChartCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.factions = options.factions || [];
    this.title = options.title || 'Sentiment';
    this.halfWidth = options.halfWidth || false;
    this.clickRoute = options.clickRoute || 'faction';
  }

  hasData() {
    return this.factions.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      halfWidth: this.halfWidth
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new SentimentChart(this.containerId, {
      height: Math.max(150, this.factions.length * 50),
      onFactionClick: (f) => {
        window.location.hash = `#/${this.clickRoute}/${f.id}`;
      }
    });
    this.component.update({ factions: this.factions });
    
    if (this.options.enableAutoResize !== false) {
      this.component.enableAutoResize();
    }

    return this.component;
  }
}

/**
 * Faction Cards Card Component
 */
export class FactionCardsCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.factions = options.factions || [];
    this.title = options.title || 'Affiliated Factions';
    this.halfWidth = options.halfWidth || false;
  }

  hasData() {
    return this.factions.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      halfWidth: this.halfWidth
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new FactionCards(this.containerId, {
      onFactionClick: (f) => {
        window.location.hash = `#/faction/${f.id}`;
      }
    });
    this.component.update({ factions: this.factions });

    return this.component;
  }
}

/**
 * Venn Diagram Card Component
 */
export class VennDiagramCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.factions = options.factions || [];
    this.overlaps = options.overlaps || [];
    this.title = options.title || 'Faction Overlaps';
    this.height = options.height || 300;
    this.halfWidth = options.halfWidth || false;
    this.excludeId = options.excludeId || null;
  }

  hasData() {
    return this.factions.length >= 1;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      halfWidth: this.halfWidth
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new VennDiagram(this.containerId, {
      height: this.height,
      onFactionClick: (f) => {
        if (this.excludeId && f.id === this.excludeId) return;
        window.location.hash = `#/faction/${f.id}`;
      }
    });
    this.component.update({
      sets: this.factions.map(f => ({
        id: f.id,
        name: f.name,
        size: f.memberCount || 1000,
        color: f.color
      })),
      overlaps: this.overlaps
    });
    
    if (this.options.enableAutoResize !== false) {
      this.component.enableAutoResize();
    }

    return this.component;
  }
}

/**
 * Card Manager - helps manage multiple card components
 */
export class CardManager {
  constructor(view) {
    this.view = view;
    this.cards = [];
  }

  /**
   * Add a card component
   * @param {BaseCardComponent} card - Card component instance
   */
  add(card) {
    this.cards.push(card);
    return this;
  }

  /**
   * Get combined HTML for all cards that have data
   * @returns {string} Combined card HTML
   */
  getHtml() {
    return this.cards
      .filter(card => card.hasData())
      .map(card => card.getCardHtml())
      .join('');
  }

  /**
   * Initialize all card components
   * @returns {Object} Map of containerId to component
   */
  initializeAll() {
    const components = {};
    for (const card of this.cards) {
      if (card.hasData()) {
        const component = card.initialize();
        if (component) {
          components[card.containerId] = component;
        }
      }
    }
    return components;
  }

  /**
   * Destroy all card components
   */
  destroyAll() {
    for (const card of this.cards) {
      card.destroy();
    }
    this.cards = [];
  }
}

export default {
  NetworkGraphCard,
  NarrativeListCard,
  DocumentListCard,
  MapCard,
  TimelineCard,
  SentimentChartCard,
  FactionCardsCard,
  VennDiagramCard,
  CardManager
};
