/**
 * FactionView.js
 * Detail view for a faction
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CardBuilder } from '../utils/CardBuilder.js';
import { VennDiagram } from '../components/VennDiagram.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { SentimentChart } from '../components/SentimentChart.js';
import { DocumentList } from '../components/DocumentList.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class FactionView extends BaseView {
  constructor(container, factionId, options = {}) {
    super(container, options);
    this.factionId = factionId;
  }

  async render() {
    const faction = DataService.getFaction(this.factionId);
    if (!faction) {
      this.renderNotFound('Faction');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchFactionData(faction);
    
    // Build cards HTML
    const cardsHtml = this.buildCardsHtml(faction, data);

    // Build page header
    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Dashboard', href: '#/dashboard' },
        { label: 'Factions', href: '#/factions' },
        faction.name
      ],
      title: faction.name,
      iconColor: faction.color,
      subtitle: faction.memberCount ? `${this.formatNumber(faction.memberCount)} members` : ''
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
    // Related Factions (index 0) and Affiliated Entities (index 1) default to half-width
    if (cardsHtml) {
      const contentGrid = this.container.querySelector('.content-grid');
      initAllCardToggles(contentGrid, `faction-${this.factionId}`, { 0: 'half', 1: 'half' });
    }

    // Store pre-fetched data for component initialization
    this._prefetchedData = { faction, ...data };

    await this.initializeComponents();
  }

  fetchFactionData(faction) {
    const relatedFactions = DataService.getRelatedFactions(this.factionId);
    const factionOverlaps = DataService.getFactionOverlapsFor(this.factionId);
    const narratives = DataService.getNarrativesForFaction(this.factionId);
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

    const documents = DataService.getDocumentsForFaction(this.factionId);
    const hasNetwork = affiliatedPersons.length > 0 || affiliatedOrgs.length > 0;
    const allFactions = [faction, ...relatedFactions];

    return {
      relatedFactions, factionOverlaps, narratives, documents,
      affiliatedPersons, affiliatedOrgs, personsWithSentiment,
      orgsWithSentiment, hasNetwork, allFactions
    };
  }

  buildCardsHtml(faction, data) {
    const cards = [];

    if (data.allFactions.length >= 1) {
      cards.push(CardBuilder.create('Related Factions', 'faction-venn', { halfWidth: true }));
    }

    if (data.hasNetwork) {
      cards.push(CardBuilder.create('Affiliated Entities', 'faction-network', { halfWidth: true }));
    }

    if (data.narratives.length > 0) {
      cards.push(CardBuilder.create('Narratives', 'faction-narratives', {
        count: data.narratives.length,
        noPadding: true
      }));
    }

    if (data.personsWithSentiment.length > 0) {
      cards.push(CardBuilder.create('Sentiment Toward People', 'faction-person-sentiment', { halfWidth: true }));
    }

    if (data.orgsWithSentiment.length > 0) {
      cards.push(CardBuilder.create('Sentiment Toward Organizations', 'faction-org-sentiment', { halfWidth: true }));
    }

    if (data.documents.length > 0) {
      cards.push(CardBuilder.create('Source Documents', 'faction-documents', {
        count: data.documents.length,
        noPadding: true
      }));
    }

    return cards.join('');
  }

  async initializeComponents() {
    const {
      faction, factionOverlaps, narratives, documents,
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
      this.components.venn.enableAutoResize();
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
      this.components.network.enableAutoResize();
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

    // Person Sentiment Chart
    if (personsWithSentiment.length > 0) {
      this.components.personSentiment = new SentimentChart('faction-person-sentiment', {
        height: Math.max(150, personsWithSentiment.length * 50),
        onFactionClick: (p) => {
          window.location.hash = `#/person/${p.id}`;
        }
      });
      this.components.personSentiment.update({ factions: personsWithSentiment });
      this.components.personSentiment.enableAutoResize();
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
      this.components.orgSentiment.enableAutoResize();
    }

    // Document List
    if (documents.length > 0) {
      this.components.documentList = new DocumentList('faction-documents', {
        maxItems: 10,
        onDocumentClick: (doc) => {
          window.location.hash = `#/document/${doc.id}`;
        }
      });
      this.components.documentList.update({ documents });
    }
  }
}

export default FactionView;
