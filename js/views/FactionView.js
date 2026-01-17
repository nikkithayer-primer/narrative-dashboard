/**
 * FactionView.js
 * Detail view for a faction
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { VennDiagram } from '../components/VennDiagram.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { SubNarrativeList } from '../components/SubNarrativeList.js';
import { SentimentChart } from '../components/SentimentChart.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class FactionView extends BaseView {
  constructor(container, factionId, options = {}) {
    super(container, options);
    this.factionId = factionId;
  }

  async render() {
    const faction = DataService.getFaction(this.factionId);
    if (!faction) {
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            <a href="#/dashboard">Dashboard</a> <span>/</span> Faction not found
          </div>
          <h1>Faction not found</h1>
        </div>
      `;
      return;
    }

    // Fetch all data upfront to determine which cards to show
    const relatedFactions = DataService.getRelatedFactions(this.factionId);
    const factionOverlaps = DataService.getFactionOverlapsFor(this.factionId);
    const narratives = DataService.getNarrativesForFaction(this.factionId);
    const subNarratives = DataService.getSubNarrativesForFaction(this.factionId);
    const affiliatedPersons = DataService.getAffiliatedPersonsForFaction(this.factionId);
    const affiliatedOrgs = DataService.getAffiliatedOrganizationsForFaction(this.factionId);

    // Build sentiment data for persons/orgs this faction has sentiment toward
    const personsWithSentiment = DataService.getPersons()
      .filter(p => p.factionSentiment && p.factionSentiment[this.factionId])
      .map(p => ({
        ...p,
        sentiment: p.factionSentiment[this.factionId],
        color: faction.color
      }));

    const orgsWithSentiment = DataService.getOrganizations()
      .filter(o => o.factionSentiment && o.factionSentiment[this.factionId])
      .map(o => ({
        ...o,
        sentiment: o.factionSentiment[this.factionId],
        color: faction.color
      }));

    const hasNetwork = affiliatedPersons.length > 0 || affiliatedOrgs.length > 0;
    const allFactions = [faction, ...relatedFactions];

    // Build cards HTML conditionally
    const cards = [];

    if (allFactions.length >= 1) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Related Factions</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="faction-venn"></div>
        </div>
      `);
    }

    if (hasNetwork) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Affiliated Entities</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="faction-network"></div>
        </div>
      `);
    }

    if (narratives.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Narratives (${narratives.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="faction-narratives"></div>
        </div>
      `);
    }

    if (subNarratives.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Sub-Narratives (${subNarratives.length})</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body no-padding" id="faction-subnarratives"></div>
        </div>
      `);
    }

    if (personsWithSentiment.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Sentiment Toward People</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="faction-person-sentiment"></div>
        </div>
      `);
    }

    if (orgsWithSentiment.length > 0) {
      cards.push(`
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Sentiment Toward Organizations</h2>
            <div class="card-header-actions"></div>
          </div>
          <div class="card-body" id="faction-org-sentiment"></div>
        </div>
      `);
    }

    this.container.innerHTML = `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#/dashboard">Dashboard</a>
          <span>/</span>
          <a href="#/factions">Factions</a>
          <span>/</span>
          ${faction.name}
        </div>
        <h1>
          <span style="display: inline-block; width: 20px; height: 20px; background: ${faction.color}; border-radius: 4px; margin-right: 12px; vertical-align: middle;"></span>
          ${faction.name}
        </h1>
        <p class="subtitle">
          ${faction.memberCount ? `${this.formatNumber(faction.memberCount)} members` : ''}
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
      initAllCardToggles(contentGrid, `faction-${this.factionId}`);
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = {
      faction, relatedFactions, factionOverlaps, narratives, subNarratives,
      affiliatedPersons, affiliatedOrgs, personsWithSentiment, orgsWithSentiment, allFactions
    };

    await this.initializeComponents();
  }

  async initializeComponents() {
    const {
      faction, factionOverlaps, narratives, subNarratives,
      affiliatedPersons, affiliatedOrgs, personsWithSentiment, orgsWithSentiment, allFactions
    } = this._prefetchedData;

    // Venn Diagram
    if (allFactions.length >= 1) {
      this.components.venn = new VennDiagram('faction-venn', {
        height: 300,
        onFactionClick: (f) => {
          if (f.id !== this.factionId) {
            window.location.hash = `#/faction/${f.id}`;
          }
        }
      });
      this.components.venn.update({
        sets: allFactions.map(f => ({
          id: f.id,
          name: f.name,
          size: f.memberCount || 1000,
          color: f.color
        })),
        overlaps: factionOverlaps
      });
    }

    // Network Graph of affiliated entities
    if (affiliatedPersons.length > 0 || affiliatedOrgs.length > 0) {
      const personIds = affiliatedPersons.map(p => p.id);
      const orgIds = affiliatedOrgs.map(o => o.id);
      const networkData = DataService.buildNetworkGraph(personIds, orgIds);

      this.components.network = new NetworkGraph('faction-network', {
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
      this.components.narrativeList = new NarrativeList('faction-narratives', {
        maxItems: 8,
        onNarrativeClick: (n) => {
          window.location.hash = `#/narrative/${n.id}`;
        }
      });
      this.components.narrativeList.update({ narratives });
    }

    // Sub-Narratives List
    if (subNarratives.length > 0) {
      this.components.subNarrativeList = new SubNarrativeList('faction-subnarratives', {
        maxItems: 8,
        onSubNarrativeClick: (s) => {
          window.location.hash = `#/subnarrative/${s.id}`;
        }
      });
      this.components.subNarrativeList.update({ subNarratives });
    }

    // Person Sentiment Chart
    if (personsWithSentiment.length > 0) {
      this.components.personSentiment = new SentimentChart('faction-person-sentiment', {
        height: Math.max(150, personsWithSentiment.length * 50),
        onFactionClick: (p) => {
          window.location.hash = `#/person/${p.id}`;
        }
      });
      this.components.personSentiment.update({ factions: personsWithSentiment });
    }

    // Org Sentiment Chart
    if (orgsWithSentiment.length > 0) {
      this.components.orgSentiment = new SentimentChart('faction-org-sentiment', {
        height: Math.max(150, orgsWithSentiment.length * 50),
        onFactionClick: (o) => {
          window.location.hash = `#/organization/${o.id}`;
        }
      });
      this.components.orgSentiment.update({ factions: orgsWithSentiment });
    }
  }

}

export default FactionView;
