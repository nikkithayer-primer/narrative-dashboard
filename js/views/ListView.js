/**
 * ListView.js
 * Generic list view for browsing all entities of a type
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { STATUS_LABELS } from '../utils/formatters.js';

export class ListView extends BaseView {
  constructor(container, entityType, options = {}) {
    super(container, options);
    this.entityType = entityType;
    this.searchQuery = '';
    this.narrativeList = null;
  }

  async render() {
    const config = this.getConfig();
    const items = this.getItems();
    const filteredItems = this.filterItems(items);

    // Build breadcrumb based on whether this is a status-filtered view
    const breadcrumbHtml = this.options.statusFilter
      ? `<a href="#/dashboard">Dashboard</a>
         <span>/</span>
         <a href="#/narratives">Narratives</a>
         <span>/</span>
         ${config.title}`
      : `<a href="#/dashboard">Dashboard</a>
         <span>/</span>
         ${config.title}`;

    // Use NarrativeList component for narratives
    if (this.entityType === 'narratives') {
      this.container.innerHTML = `
        <div class="page-header">
          <div class="breadcrumb">
            ${breadcrumbHtml}
          </div>
          <h1>${config.title}</h1>
          <p class="subtitle">${filteredItems.length} ${config.itemName}${filteredItems.length !== 1 ? 's' : ''}</p>
        </div>

        <div class="content-area">
          <div class="card">
            <div class="card-header">
              <div class="search-input-wrapper" style="max-width: 300px;">
                <span class="search-icon">🔍</span>
                <input 
                  type="text" 
                  class="search-input" 
                  placeholder="Search ${config.itemName}s..." 
                  id="list-search"
                  value="${this.searchQuery}"
                />
              </div>
            </div>
            <div class="card-body no-padding" id="narrative-list-container"></div>
          </div>
        </div>
      `;

      // Initialize NarrativeList component
      this.narrativeList = new NarrativeList('narrative-list-container', {
        maxItems: 100,
        showStatus: true,
        showSparkline: true,
        showVolume: true,
        onNarrativeClick: (narrative) => {
          window.location.hash = `#/narrative/${narrative.id}`;
        }
      });
      this.narrativeList.update({ narratives: filteredItems });

      // Attach search listener
      const searchInput = document.getElementById('list-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value;
          this.render();
        });
      }
      return;
    }

    // Default rendering for other entity types
    this.container.innerHTML = `
      <div class="page-header">
        <div class="breadcrumb">
          ${breadcrumbHtml}
        </div>
        <h1>${config.title}</h1>
        <p class="subtitle">${filteredItems.length} ${config.itemName}${filteredItems.length !== 1 ? 's' : ''}</p>
      </div>

      <div class="content-area">
        <div class="card">
          <div class="card-header">
            <div class="search-input-wrapper" style="max-width: 300px;">
              <span class="search-icon">🔍</span>
              <input 
                type="text" 
                class="search-input" 
                placeholder="Search ${config.itemName}s..." 
                id="list-search"
                value="${this.searchQuery}"
              />
            </div>
          </div>
          <div class="card-body no-padding">
            <ul class="entity-list" id="entity-list">
              ${filteredItems.map(item => this.renderItem(item, config)).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners(config);
  }

  getConfig() {
    const configs = {
      narratives: {
        title: this.options.statusFilter 
          ? `${STATUS_LABELS[this.options.statusFilter] || this.options.statusFilter} Narratives`
          : 'Narratives',
        itemName: 'narrative',
        icon: '◈',
        route: 'narrative',
        getSubtitle: (item) => {
          const volume = Object.values(item.factionMentions || {})
            .reduce((sum, f) => sum + (f.volume || 0), 0);
          return `${volume.toLocaleString()} mentions`;
        },
        getStatus: (item) => ({
          key: item.status || 'new',
          label: STATUS_LABELS[item.status] || 'New'
        })
      },
      factions: {
        title: 'Factions',
        itemName: 'faction',
        icon: '◇',
        route: 'faction',
        getSubtitle: (item) => `${item.memberCount ? item.memberCount.toLocaleString() + ' members' : 'No member data'}`,
        getColor: (item) => item.color
      },
      locations: {
        title: 'Locations',
        itemName: 'location',
        icon: '◎',
        route: 'location',
        getSubtitle: (item) => item.type || 'Location'
      },
      events: {
        title: 'Events',
        itemName: 'event',
        icon: '◆',
        route: 'event',
        getSubtitle: (item) => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          });
        }
      },
      entities: {
        title: 'People & Organizations',
        itemName: 'entity',
        icon: '◐',
        route: null, // Special handling
        getSubtitle: (item) => item.type || (item._entityType === 'person' ? 'Person' : 'Organization')
      }
    };

    return configs[this.entityType] || configs.narratives;
  }

  getItems() {
    let items;
    switch (this.entityType) {
      case 'narratives':
        // Apply mission and time range filters
        items = DataService.getNarratives(this.missionId, this.timeRange);
        // Apply status filter if provided
        if (this.options.statusFilter) {
          items = items.filter(n => (n.status || 'new') === this.options.statusFilter);
        }
        return items;
      case 'factions':
        return DataService.getFactions();
      case 'locations':
        return DataService.getLocations();
      case 'events':
        let events = DataService.getEvents().filter(e => !e.parentEventId); // Only top-level events
        // Apply time range filter to events
        if (this.timeRange) {
          events = events.filter(e => DataService.isDateInRange(e.date, this.timeRange));
        }
        return events;
      case 'entities':
        return [
          ...DataService.getPersons().map(p => ({ ...p, _entityType: 'person' })),
          ...DataService.getOrganizations().map(o => ({ ...o, _entityType: 'organization' }))
        ];
      default:
        return [];
    }
  }

  filterItems(items) {
    if (!this.searchQuery) return items;
    const query = this.searchQuery.toLowerCase();
    return items.filter(item => {
      const searchText = (item.text || item.name || '').toLowerCase();
      return searchText.includes(query);
    });
  }

  renderItem(item, config) {
    const title = item.text || item.name;
    const subtitle = config.getSubtitle ? config.getSubtitle(item) : '';
    const color = config.getColor ? config.getColor(item) : null;
    const status = config.getStatus ? config.getStatus(item) : null;
    const icon = item._entityType === 'person' ? '👤' : 
                 item._entityType === 'organization' ? '🏢' : 
                 config.icon;

    return `
      <li class="entity-list-item" data-id="${item.id}" data-type="${item._entityType || this.entityType}">
        <div class="entity-avatar ${item._entityType || ''}" ${color ? `style="background: ${color}20; color: ${color};"` : ''}>
          ${icon}
        </div>
        <div class="entity-info">
          <div class="entity-name">${title.length > 60 ? title.slice(0, 58) + '...' : title}</div>
          <div class="entity-meta">
            ${subtitle ? `<span class="entity-subtitle">${subtitle}</span>` : ''}
            ${status ? `<span class="badge badge-status-${status.key}">${status.label}</span>` : ''}
          </div>
        </div>
      </li>
    `;
  }

  attachEventListeners(config) {
    // Search input
    const searchInput = document.getElementById('list-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
      });
    }

    // Item clicks
    const items = document.querySelectorAll('.entity-list-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const type = item.dataset.type;
        
        if (this.entityType === 'entities') {
          window.location.hash = `#/${type}/${id}`;
        } else {
          window.location.hash = `#/${config.route}/${id}`;
        }
      });
    });
  }

  destroy() {
    if (this.narrativeList) {
      this.narrativeList.destroy();
      this.narrativeList = null;
    }
    super.destroy();
  }
}

export default ListView;
