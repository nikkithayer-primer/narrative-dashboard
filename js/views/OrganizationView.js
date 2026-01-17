/**
 * OrganizationView.js
 * Detail view for an organization
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { FactionCards } from '../components/FactionCards.js';
import { SentimentChart } from '../components/SentimentChart.js';
import { MapView } from '../components/MapView.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { SubNarrativeList } from '../components/SubNarrativeList.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class OrganizationView extends BaseView {
  constructor(container, organizationId, options = {}) {
    super(container, options);
    this.organizationId = organizationId;
  }

  async render() {
    const org = DataService.getOrganization(this.organizationId);
    if (!org) {
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> Organization not found
          </div>
          <h1>Organization not found</h1>
        </div>
      `;
      return;
    }

    // Fetch all data upfront to determine which cards to show
    const relatedPersons = DataService.getRelatedPersonsForOrganization(this.organizationId);
    const relatedOrgs = DataService.getRelatedOrganizations(this.organizationId);
    const affiliatedFactions = DataService.getAffiliatedFactionsForOrganization(this.organizationId);
    const locations = DataService.getLocationsForOrganization(this.organizationId);
    const narratives = DataService.getNarrativesForOrganization(this.organizationId);
    const subNarratives = DataService.getSubNarrativesForOrganization(this.organizationId);

    // Build sentiment data - how factions feel about this org
    const factionSentimentData = Object.entries(org.factionSentiment || {})
      .map(([factionId, sentiment]) => {
        const faction = DataService.getFaction(factionId);
        return faction ? { ...faction, sentiment } : null;
      })
      .filter(Boolean);

    const hasNetwork = relatedPersons.length > 0 || relatedOrgs.length > 0;

    // Build cards HTML conditionally
    const cards = [];

    if (hasNetwork) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related People & Organizations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="org-network"></div>
        </div>
      `);
    }

    if (affiliatedFactions.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Affiliated Factions</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="org-factions"></div>
        </div>
      `);
    }

    if (factionSentimentData.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Faction Sentiment Toward ${org.name}</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="org-sentiment"></div>
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
          <div class="card-body no-padding" id="org-map"></div>
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
          <div class="card-body no-padding" id="org-narratives"></div>
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
          <div class="card-body no-padding" id="org-subnarratives"></div>
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
          ${org.name}
        </div>
        <h1>
          <span style="font-size: 1.5rem; margin-right: 12px;">🏢</span>
          ${org.name}
        </h1>
        <p class="subtitle">
          ${org.type ? `Type: ${org.type}` : 'Organization'}
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
      initAllCardToggles(contentGrid, `org-${this.organizationId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = {
      org, relatedPersons, relatedOrgs, affiliatedFactions,
      locations, narratives, subNarratives, factionSentimentData
    };

    await this.initializeComponents();
  }

  async initializeComponents() {
    const {
      relatedPersons, relatedOrgs, affiliatedFactions,
      locations, narratives, subNarratives, factionSentimentData
    } = this._prefetchedData;

    // Network Graph
    if (relatedPersons.length > 0 || relatedOrgs.length > 0) {
      const personIds = relatedPersons.map(p => p.id);
      const orgIds = [this.organizationId, ...relatedOrgs.map(o => o.id)];
      const networkData = DataService.buildNetworkGraph(personIds, orgIds);

      this.components.network = new NetworkGraph('org-network', {
        height: 400,
        onNodeClick: (node) => {
          if (node.id !== this.organizationId) {
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
      this.components.factionCards = new FactionCards('org-factions', {
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.factionCards.update({ factions: affiliatedFactions });
    }

    // Sentiment Chart
    if (factionSentimentData.length > 0) {
      this.components.sentiment = new SentimentChart('org-sentiment', {
        height: Math.max(150, factionSentimentData.length * 50),
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.sentiment.update({ factions: factionSentimentData });
    }

    // Map
    if (locations.length > 0) {
      this.components.map = new MapView('org-map', {
        height: 350
      });
      this.components.map.update({ locations });
    }

    // Narratives List
    if (narratives.length > 0) {
      this.components.narrativeList = new NarrativeList('org-narratives', {
        maxItems: 8,
        onNarrativeClick: (n) => {
          window.location.hash = `#/narrative/${n.id}`;
        }
      });
      this.components.narrativeList.update({ narratives });
    }

    // Sub-Narratives List
    if (subNarratives.length > 0) {
      this.components.subNarrativeList = new SubNarrativeList('org-subnarratives', {
        maxItems: 8,
        onSubNarrativeClick: (s) => {
          window.location.hash = `#/subnarrative/${s.id}`;
        }
      });
      this.components.subNarrativeList.update({ subNarratives });
    }
  }

}

export default OrganizationView;
