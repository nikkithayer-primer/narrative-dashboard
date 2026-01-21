/**
 * router.js
 * Hash-based routing for single-page navigation
 * Manages global filter state (mission + time range)
 */

import { DashboardView } from './views/DashboardView.js';
import { NarrativeView } from './views/NarrativeView.js';
import { SubNarrativeView } from './views/SubNarrativeView.js';
import { FactionView } from './views/FactionView.js';
import { LocationView } from './views/LocationView.js';
import { EventView } from './views/EventView.js';
import { PersonView } from './views/PersonView.js';
import { OrganizationView } from './views/OrganizationView.js';
import { DocumentView } from './views/DocumentView.js';
import { ListView } from './views/ListView.js';
import { EditorView } from './views/EditorView.js';
import { initStickyHeader, destroyStickyHeader } from './utils/stickyHeader.js';
import { TimeRangeFilter } from './components/TimeRangeFilter.js';
import { DataService } from './data/DataService.js';
import { truncateText, formatDate } from './utils/formatters.js';
import { NarrativeList } from './components/NarrativeList.js';

export class Router {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentView = null;
    this.timeRangeFilter = null;
    
    // Global filter state
    this.filters = {
      missionId: 'all',
      timeRange: null // { start: Date, end: Date } or null for all time
    };

    // Bind hash change handler
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  /**
   * Initialize router and navigate to current hash
   */
  init() {
    // Set up mission filter listener
    this.initMissionFilter();
    
    // Set up time range filter
    this.initTimeRangeFilter();
    
    // Set up clear time filter button
    this.initClearTimeFilterButton();

    // Navigate to current hash or default to dashboard
    if (!window.location.hash || window.location.hash === '#/') {
      window.location.hash = '#/dashboard';
    } else {
      this.handleRoute();
    }
  }

  /**
   * Initialize mission filter dropdown
   */
  initMissionFilter() {
    const missionSelect = document.getElementById('mission-filter');
    if (missionSelect) {
      missionSelect.addEventListener('change', (e) => {
        this.filters.missionId = e.target.value;
        this.onFiltersChanged();
      });
    }
  }

  /**
   * Initialize time range filter component
   */
  initTimeRangeFilter() {
    const container = document.getElementById('time-range-filter');
    if (!container) return;

    // Get aggregate volume data for the histogram
    const volumeData = this.getTimeFilterData();
    
    if (!volumeData || !volumeData.dates.length) {
      container.innerHTML = '<div class="empty-state text-xs">No time data</div>';
      return;
    }

    // Create time range filter component
    this.timeRangeFilter = new TimeRangeFilter('time-range-filter', {
      height: 44,
      onChange: (range) => this.onTimeRangeChanged(range)
    });

    // Update with data
    this.timeRangeFilter.update(volumeData);
  }

  /**
   * Get aggregated volume data for the time filter histogram
   */
  getTimeFilterData() {
    // Get volume data aggregated across all missions (for consistent histogram)
    const volumeData = DataService.getAggregateVolumeOverTime('all');
    
    if (!volumeData || !volumeData.dates || !volumeData.dates.length) {
      return null;
    }

    // Calculate total volume per date (sum all factions)
    const volumes = volumeData.dates.map((date, i) => {
      return volumeData.series.reduce((sum, series) => sum + (series[i] || 0), 0);
    });

    return {
      dates: volumeData.dates,
      volumes
    };
  }

  /**
   * Initialize clear time filter button
   */
  initClearTimeFilterButton() {
    const clearBtn = document.getElementById('clear-time-filter');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (this.timeRangeFilter) {
          this.timeRangeFilter.clearSelection();
        }
        this.filters.timeRange = null;
        this.updateTimeRangeLabel(null);
        this.onFiltersChanged();
      });
    }
  }

  /**
   * Handle time range filter change
   */
  onTimeRangeChanged(range) {
    this.filters.timeRange = range;
    this.updateTimeRangeLabel(range);
    this.onFiltersChanged();
  }

  /**
   * Update the time range label display
   */
  updateTimeRangeLabel(range) {
    const label = document.getElementById('time-range-label');
    if (!label) return;

    if (!range || !range.start || !range.end) {
      label.textContent = 'All Time';
      return;
    }

    label.textContent = `${formatDate(range.start)} - ${formatDate(range.end)}`;
  }

  /**
   * Called when any filter changes - re-render current view
   */
  onFiltersChanged() {
    // Re-render the current view with new filters
    this.handleRoute();
  }

  /**
   * Get current filters
   */
  getFilters() {
    return { ...this.filters };
  }

  /**
   * Parse current hash and route to appropriate view
   */
  handleRoute() {
    const hash = window.location.hash.slice(2) || 'dashboard'; // Remove #/
    const [route, id] = hash.split('/');

    this.currentRoute = route;

    // Destroy current view and clean up sticky header
    destroyStickyHeader();
    if (this.currentView && this.currentView.destroy) {
      this.currentView.destroy();
    }

    // Update active nav link
    this.updateNavLinks(route);

    // Common options with filters
    const filterOptions = {
      missionId: this.filters.missionId,
      timeRange: this.filters.timeRange
    };

    // Route to appropriate view
    switch (route) {
      case 'dashboard':
        this.currentView = new DashboardView(this.container, filterOptions);
        break;

      case 'narrative':
        if (id) {
          this.currentView = new NarrativeView(this.container, id, filterOptions);
        } else {
          this.currentView = new ListView(this.container, 'narratives', filterOptions);
        }
        break;

      case 'narratives':
        this.currentView = new ListView(this.container, 'narratives', filterOptions);
        break;

      case 'subnarrative':
        if (id) {
          this.currentView = new SubNarrativeView(this.container, id, filterOptions);
        } else {
          window.location.hash = '#/narratives';
          return;
        }
        break;

      case 'faction':
        if (id) {
          this.currentView = new FactionView(this.container, id, filterOptions);
        } else {
          this.currentView = new ListView(this.container, 'factions', filterOptions);
        }
        break;

      case 'factions':
        this.currentView = new ListView(this.container, 'factions', filterOptions);
        break;

      case 'location':
        if (id) {
          this.currentView = new LocationView(this.container, id, filterOptions);
        } else {
          this.currentView = new ListView(this.container, 'locations', filterOptions);
        }
        break;

      case 'locations':
        this.currentView = new ListView(this.container, 'locations', filterOptions);
        break;

      case 'event':
        if (id) {
          this.currentView = new EventView(this.container, id, filterOptions);
        } else {
          this.currentView = new ListView(this.container, 'events', filterOptions);
        }
        break;

      case 'events':
        this.currentView = new ListView(this.container, 'events', filterOptions);
        break;

      case 'person':
        if (id) {
          this.currentView = new PersonView(this.container, id, filterOptions);
        } else {
          this.currentView = new ListView(this.container, 'entities', filterOptions);
        }
        break;

      case 'organization':
        if (id) {
          this.currentView = new OrganizationView(this.container, id, filterOptions);
        } else {
          this.currentView = new ListView(this.container, 'entities', filterOptions);
        }
        break;

      case 'document':
        if (id) {
          this.currentView = new DocumentView(this.container, id, filterOptions);
        } else {
          window.location.hash = '#/dashboard';
          return;
        }
        break;

      case 'entities':
        this.currentView = new ListView(this.container, 'entities', filterOptions);
        break;

      case 'editor':
        this.currentView = new EditorView(this.container);
        break;

      case 'status':
        // Filter narratives by status
        if (id) {
          this.currentView = new ListView(this.container, 'narratives', { 
            ...filterOptions,
            statusFilter: id 
          });
        } else {
          window.location.hash = '#/status/new';
          return;
        }
        break;

      case 'monitors':
        this.currentView = this.createMonitorsView(filterOptions);
        break;

      case 'workspaces':
        this.currentView = this.createWorkspacesView(filterOptions);
        break;

      case 'ai-briefing':
        this.currentView = this.createAIBriefingView(filterOptions);
        break;

      default:
        // Default to dashboard
        window.location.hash = '#/dashboard';
        return;
    }

    // Render the view
    if (this.currentView && this.currentView.render) {
      this.currentView.render();
    }

    // Initialize sticky header behavior
    initStickyHeader();

    // Scroll to top
    window.scrollTo(0, 0);
  }

  /**
   * Update active state on navigation links
   */
  updateNavLinks(route) {
    const hash = window.location.hash.slice(2) || 'dashboard';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkRoute = link.getAttribute('href')?.replace('#/', '') || '';
      
      // Check if this link matches the current route
      if (linkRoute === route || 
          linkRoute === hash ||
          (linkRoute === 'narratives' && route === 'narrative') ||
          (linkRoute === 'factions' && route === 'faction') ||
          (linkRoute === 'locations' && route === 'location') ||
          (linkRoute === 'events' && route === 'event') ||
          (linkRoute === 'entities' && (route === 'person' || route === 'organization'))) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Navigate programmatically
   */
  navigate(route, id = null) {
    if (id) {
      window.location.hash = `#/${route}/${id}`;
    } else {
      window.location.hash = `#/${route}`;
    }
  }

  /**
   * Get current route info
   */
  getCurrentRoute() {
    const hash = window.location.hash.slice(2) || 'dashboard';
    const [route, id] = hash.split('/');
    return { route, id };
  }

  /**
   * Refresh the time filter data (e.g., after data import)
   */
  refreshTimeFilter() {
    if (this.timeRangeFilter) {
      const volumeData = this.getTimeFilterData();
      if (volumeData) {
        this.timeRangeFilter.updateData(volumeData);
      }
    }
  }

  /**
   * Create a placeholder Workspaces view
   */
  createWorkspacesView(filterOptions) {
    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h1 class="view-title">Workspaces</h1>
          <p class="view-subtitle">Organize your analysis into focused workspaces</p>
        </div>
        <button class="btn btn-primary">+ New Workspace</button>
      </div>
      
      <div class="content-grid">
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Election Integrity 2024</span>
            <span class="tag">Active</span>
          </div>
          <div class="card-body">
            <p class="text-sm text-secondary mb-md">Tracking narratives related to election security and voting processes.</p>
            <div class="flex gap-sm">
              <span class="badge">12 Narratives</span>
              <span class="badge">4 Factions</span>
              <span class="badge">8 Monitors</span>
            </div>
            <p class="text-xs text-muted mt-md">Last updated 2 hours ago</p>
          </div>
        </div>
        
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Climate Disinformation</span>
            <span class="tag">Active</span>
          </div>
          <div class="card-body">
            <p class="text-sm text-secondary mb-md">Monitoring false claims about climate science and policy.</p>
            <div class="flex gap-sm">
              <span class="badge">8 Narratives</span>
              <span class="badge">6 Factions</span>
              <span class="badge">3 Monitors</span>
            </div>
            <p class="text-xs text-muted mt-md">Last updated 5 hours ago</p>
          </div>
        </div>
        
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Health Misinformation</span>
            <span class="tag tag-neutral">Archived</span>
          </div>
          <div class="card-body">
            <p class="text-sm text-secondary mb-md">Historical analysis of health-related false claims.</p>
            <div class="flex gap-sm">
              <span class="badge">24 Narratives</span>
              <span class="badge">9 Factions</span>
              <span class="badge">0 Monitors</span>
            </div>
            <p class="text-xs text-muted mt-md">Archived 3 weeks ago</p>
          </div>
        </div>
        
        <div class="card card-half">
          <div class="card-body" style="display: flex; align-items: center; justify-content: center; min-height: 120px;">
            <div class="empty-state" style="padding: 0;">
              <div class="empty-state-icon">+</div>
              <p class="empty-state-text">Create New Workspace</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    return {
      render: () => {},
      destroy: () => {}
    };
  }

  /**
   * Create a placeholder AI Briefing view
   */
  createAIBriefingView(filterOptions) {
    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h1 class="view-title">AI Briefing</h1>
          <p class="view-subtitle">AI-generated intelligence summaries and insights</p>
        </div>
        <button class="btn btn-primary">Generate New Briefing</button>
      </div>
      
      <div class="content-grid">
        <div class="card card-full">
          <div class="card-header">
            <span class="card-title">Daily Intelligence Summary</span>
            <span class="text-xs text-muted">Generated today at 06:00</span>
          </div>
          <div class="card-body">
            <div class="briefing-section mb-lg">
              <h3 class="text-sm font-semibold mb-sm">Key Developments</h3>
              <ul class="data-list">
                <li class="data-list-item">
                  <span class="text-sm">Significant volume spike detected in election-related narratives (+45% over 24h)</span>
                </li>
                <li class="data-list-item">
                  <span class="text-sm">New coordinated campaign identified across 3 monitored factions</span>
                </li>
                <li class="data-list-item">
                  <span class="text-sm">Sentiment shift toward negative detected in climate narratives</span>
                </li>
              </ul>
            </div>
            
            <div class="briefing-section mb-lg">
              <h3 class="text-sm font-semibold mb-sm">Emerging Narratives</h3>
              <p class="text-sm text-secondary">2 new narrative clusters identified in the past 24 hours that warrant attention. Both appear to originate from previously identified faction networks.</p>
            </div>
            
            <div class="briefing-section">
              <h3 class="text-sm font-semibold mb-sm">Recommended Actions</h3>
              <ul class="data-list">
                <li class="data-list-item">
                  <span class="badge badge-status-new mr-sm">Priority</span>
                  <span class="text-sm">Review emerging election narrative cluster for potential escalation</span>
                </li>
                <li class="data-list-item">
                  <span class="badge badge-status-in_progress mr-sm">Monitor</span>
                  <span class="text-sm">Continue tracking coordinated faction activity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Previous Briefings</span>
          </div>
          <div class="card-body">
            <ul class="data-list">
              <li class="data-list-item clickable">
                <span class="data-label">Yesterday, 06:00</span>
                <span class="text-xs text-muted">Daily Summary</span>
              </li>
              <li class="data-list-item clickable">
                <span class="data-label">Jan 14, 06:00</span>
                <span class="text-xs text-muted">Daily Summary</span>
              </li>
              <li class="data-list-item clickable">
                <span class="data-label">Jan 13, 06:00</span>
                <span class="text-xs text-muted">Daily Summary</span>
              </li>
              <li class="data-list-item clickable">
                <span class="data-label">Jan 12, 18:00</span>
                <span class="text-xs text-muted">Alert Briefing</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Briefing Settings</span>
          </div>
          <div class="card-body">
            <ul class="data-list">
              <li class="data-list-item">
                <span class="data-label">Schedule</span>
                <span class="data-value">Daily at 06:00</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">Scope</span>
                <span class="data-value">All Workspaces</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">Alert Threshold</span>
                <span class="data-value">High Priority</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">Recipients</span>
                <span class="data-value">3 users</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
    
    return {
      render: () => {},
      destroy: () => {}
    };
  }

  /**
   * Create the Monitors view with example monitors and alerts
   */
  createMonitorsView(filterOptions) {
    // Get all narratives from DataService
    const allNarratives = DataService.getNarratives();
    
    // Define monitor configurations with their scope filters and alerts
    const monitors = [
      {
        id: 'trump-tracker',
        name: 'Trump Activity Tracker',
        scopeType: 'person',
        scopeLabel: 'Donald Trump',
        scopeIcon: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <circle cx="8" cy="4" r="2.5"/>
          <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
        </svg>`,
        triggers: ['Volume >500/day', 'Sentiment >15%'],
        lastTriggered: '2 hours ago',
        enabled: true,
        alerts: [
          { time: '2 hours ago', type: 'volume', typeLabel: 'Volume Spike', description: '847 mentions in 24h (threshold: 500)', severity: 'high' },
          { time: '2 days ago', type: 'sentiment', typeLabel: 'Sentiment Shift', description: '-23% sentiment change detected', severity: 'medium' }
        ],
        // Filter: narratives mentioning Trump (person-003)
        filterNarratives: (narratives) => narratives.filter(n => 
          n.personIds?.includes('person-003')
        )
      },
      {
        id: 'ice-monitor',
        name: 'ICE Policy Monitor',
        scopeType: 'organization',
        scopeLabel: 'Immigration and Customs Enforcement',
        scopeIcon: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <rect x="3" y="6" width="10" height="8" rx="1"/>
          <path d="M5 6V4a3 3 0 0 1 6 0v2"/>
          <rect x="5" y="9" width="2" height="2"/>
          <rect x="9" y="9" width="2" height="2"/>
        </svg>`,
        triggers: ['New Narratives', 'New Events'],
        lastTriggered: 'Yesterday',
        enabled: true,
        alerts: [
          { time: '5 hours ago', type: 'narrative', typeLabel: 'New Narrative', description: '"Deportation policy misinformation" emerged', severity: 'medium' },
          { time: '4 days ago', type: 'event', typeLabel: 'New Event', description: 'Policy announcement event detected', severity: 'low' }
        ],
        // Filter: narratives mentioning ICE (org-010) or DOJ (org-011)
        filterNarratives: (narratives) => narratives.filter(n => 
          n.organizationIds?.includes('org-010') || n.organizationIds?.includes('org-011')
        )
      },
      {
        id: 'election-watch',
        name: 'Election Integrity Watch',
        scopeType: 'narrative',
        scopeLabel: 'Election & Judicial Safety',
        scopeIcon: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <path d="M2 2h12v12H2z" rx="1"/>
          <path d="M4 5h8M4 8h8M4 11h5"/>
        </svg>`,
        triggers: ['Volume >1000/day', 'Faction Engagement'],
        lastTriggered: '3 days ago',
        enabled: true,
        alerts: [
          { time: 'Yesterday', type: 'faction', typeLabel: 'Faction Engagement', description: '3 tracked factions amplifying content', severity: 'high' }
        ],
        // Filter: narratives related to election/judicial safety (narr-007)
        filterNarratives: (narratives) => narratives.filter(n => 
          n.id === 'narr-007' || 
          n.text?.toLowerCase().includes('election') || 
          n.text?.toLowerCase().includes('judicial') ||
          n.organizationIds?.includes('org-013') || // Tippecanoe Superior Court
          n.organizationIds?.includes('org-014') || // Indiana Supreme Court
          n.organizationIds?.includes('org-015')    // FBI
        )
      },
      {
        id: 'campaign-detector',
        name: 'Coordinated Campaign Detector',
        scopeType: 'faction',
        scopeLabel: '3 tracked factions',
        scopeIcon: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <circle cx="8" cy="5" r="2.5"/>
          <circle cx="4" cy="11" r="2"/>
          <circle cx="12" cy="11" r="2"/>
          <path d="M6 6.5L4.5 9M10 6.5l1.5 2.5"/>
        </svg>`,
        triggers: ['New Narratives', 'Sentiment Shift'],
        lastTriggered: null,
        enabled: false,
        alerts: [], // Paused, no recent alerts
        // Filter: narratives with high faction engagement (faction-001, faction-002, faction-003)
        filterNarratives: (narratives) => narratives.filter(n => {
          const factions = n.factionMentions || {};
          const trackedFactions = ['faction-001', 'faction-002', 'faction-003'];
          const matchCount = trackedFactions.filter(f => factions[f] && factions[f].volume > 100).length;
          return matchCount >= 2; // At least 2 tracked factions with significant volume
        })
      }
    ];
    
    // Build monitor cards HTML with container IDs for NarrativeList
    const monitorCardsHtml = monitors.map(monitor => {
      const matchedNarratives = monitor.filterNarratives(allNarratives);
      const statusClass = monitor.enabled ? '' : 'monitor-paused';
      const indicatorClass = monitor.enabled ? 'active' : 'paused';
      const containerId = `monitor-narratives-${monitor.id}`;
      
      // Store the matched narratives for later use
      monitor.matchedNarratives = matchedNarratives;
      monitor.containerId = containerId;
      
      // Build alerts HTML
      const alertsHtml = monitor.alerts && monitor.alerts.length > 0 
        ? monitor.alerts.map(alert => `
            <div class="monitor-alert-item">
              <span class="alert-type-badge ${alert.type}">${alert.typeLabel}</span>
              <span class="alert-description">${alert.description}</span>
              <span class="alert-time">${alert.time}</span>
            </div>
          `).join('')
        : '<div class="monitor-no-alerts">No recent alerts</div>';
      
      return `
        <div class="card ${statusClass}">
          <div class="card-header">
            <div class="monitor-title-row">
              <div class="monitor-status-indicator ${indicatorClass}"></div>
              <div class="monitor-title-wrapper">
                <h2 class="card-title">${monitor.name}</h2>
                <svg class="info-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
                <div class="monitor-scope-popover">
                  <div class="popover-section">
                    <div class="popover-label">Scope</div>
                    <div class="popover-scope-entity">
                      ${monitor.scopeIcon}
                      <span>${monitor.scopeLabel}</span>
                    </div>
                  </div>
                  <div class="popover-section">
                    <div class="popover-label">Triggers</div>
                    <div class="popover-triggers">
                      ${monitor.triggers.map(t => `<span class="trigger-tag">${t}</span>`).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-header-actions">
              ${!monitor.enabled ? '<span class="badge badge-status-paused">Paused</span>' : ''}
              <span class="monitor-meta-text">${
                monitor.enabled 
                  ? `Triggered ${monitor.lastTriggered}` 
                  : ''
              }</span>
            </div>
          </div>
          <div class="card-body no-padding">
            <div class="monitor-alerts-section">
              <div class="monitor-section-header">
                <span class="monitor-section-title">Recent Alerts</span>
                ${monitor.alerts && monitor.alerts.length > 0 ? `<span class="alert-count">${monitor.alerts.length}</span>` : ''}
              </div>
              <div class="monitor-alerts-list">
                ${alertsHtml}
              </div>
            </div>
            <div class="monitor-narratives-container" id="${containerId}"></div>
          </div>
        </div>
      `;
    }).join('');
    
    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h1 class="view-title">Monitors</h1>
          <p class="view-subtitle">Track entities and narratives with custom alert thresholds</p>
        </div>
        <div class="view-header-stats">
          <span class="badge badge-status-active">${monitors.filter(m => m.enabled).length} Active Monitors</span>
          <span class="badge badge-status-high">3 Alerts Today</span>
        </div>
      </div>
      
      <div class="monitors-section">
        <div class="monitors-section-header">
          <h2 class="section-title">Active Monitors</h2>
          <button class="btn btn-small btn-primary">+ New Monitor</button>
        </div>
        <div class="monitors-grid">
          ${monitorCardsHtml}
        </div>
      </div>
      
      <div class="content-grid">
        <!-- Monitor Types Reference -->
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Trigger Types</span>
          </div>
          <div class="card-body">
            <ul class="data-list">
              <li class="data-list-item">
                <span class="data-label">Volume Spike</span>
                <span class="tag">Threshold-based</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">Sentiment Shift</span>
                <span class="tag">Trend analysis</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">New Narrative</span>
                <span class="tag">Pattern matching</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">New Event</span>
                <span class="tag">Entity tracking</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">Faction Engagement</span>
                <span class="tag">Activity monitoring</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Scope Types Reference -->
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Scope Types</span>
          </div>
          <div class="card-body">
            <ul class="data-list">
              <li class="data-list-item">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <circle cx="8" cy="4" r="2.5"/>
                    <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
                  </svg>
                  <span class="scope-type-label">Person</span>
                </span>
                <span class="text-xs text-muted">Watch individuals</span>
              </li>
              <li class="data-list-item">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <rect x="3" y="6" width="10" height="8" rx="1"/>
                    <path d="M5 6V4a3 3 0 0 1 6 0v2"/>
                    <rect x="5" y="9" width="2" height="2"/>
                    <rect x="9" y="9" width="2" height="2"/>
                  </svg>
                  <span class="scope-type-label">Organization</span>
                </span>
                <span class="text-xs text-muted">Watch organizations</span>
              </li>
              <li class="data-list-item">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <circle cx="8" cy="5" r="2.5"/>
                    <circle cx="4" cy="11" r="2"/>
                    <circle cx="12" cy="11" r="2"/>
                    <path d="M6 6.5L4.5 9M10 6.5l1.5 2.5"/>
                  </svg>
                  <span class="scope-type-label">Faction</span>
                </span>
                <span class="text-xs text-muted">Watch faction activity</span>
              </li>
              <li class="data-list-item">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <path d="M2 2h12v12H2z" rx="1"/>
                    <path d="M4 5h8M4 8h8M4 11h5"/>
                  </svg>
                  <span class="scope-type-label">Narrative</span>
                </span>
                <span class="text-xs text-muted">Watch existing narratives</span>
              </li>
              <li class="data-list-item">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
                    <circle cx="8" cy="6" r="2"/>
                  </svg>
                  <span class="scope-type-label">Location</span>
                </span>
                <span class="text-xs text-muted">Watch geographic areas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
    
    // Initialize NarrativeList components for each monitor
    const narrativeListComponents = [];
    monitors.forEach(monitor => {
      if (monitor.matchedNarratives && monitor.matchedNarratives.length > 0) {
        const narrativeList = new NarrativeList(monitor.containerId, {
          maxItems: 5,
          showSentiment: true,
          showStatus: true,
          showSparkline: true,
          showVolume: true,
          showSubNarratives: true,
          maxSubNarratives: 3,
          defaultShowDescription: false,
          onNarrativeClick: (n) => {
            window.location.hash = `#/narrative/${n.id}`;
          }
        });
        narrativeList.update({ narratives: monitor.matchedNarratives });
        narrativeListComponents.push(narrativeList);
      } else {
        // Show empty state for monitors with no matching narratives
        const container = document.getElementById(monitor.containerId);
        if (container) {
          container.innerHTML = `
            <div class="empty-state" style="padding: 24px;">
              <div class="empty-state-icon">📋</div>
              <p class="empty-state-text">No matching narratives</p>
            </div>
          `;
        }
      }
    });
    
    return {
      render: () => {},
      destroy: () => {
        narrativeListComponents.forEach(c => c.destroy && c.destroy());
      }
    };
  }
  
  /**
   * Truncate text to a maximum length with ellipsis
   */
  truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }
}

export default Router;
