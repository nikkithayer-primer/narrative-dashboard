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
import { ListView } from './views/ListView.js';
import { EditorView } from './views/EditorView.js';
import { initStickyHeader, destroyStickyHeader } from './utils/stickyHeader.js';
import { TimeRangeFilter } from './components/TimeRangeFilter.js';
import { DataService } from './data/DataService.js';

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

    const formatDate = d3.timeFormat('%b %d');
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
   * Create a placeholder Monitors view
   */
  createMonitorsView(filterOptions) {
    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h1 class="view-title">Monitors</h1>
          <p class="view-subtitle">Track and manage automated monitoring rules</p>
        </div>
      </div>
      
      <div class="content-grid">
        <div class="card card-full">
          <div class="card-header">
            <span class="card-title">Active Monitors</span>
            <button class="btn btn-small btn-primary">+ New Monitor</button>
          </div>
          <div class="card-body">
            <div class="empty-state">
              <div class="empty-state-icon">📡</div>
              <p class="empty-state-text">No monitors configured yet</p>
              <p class="text-xs text-muted mt-sm">Monitors allow you to set up automated alerts for narrative patterns, faction activity spikes, or emerging themes.</p>
            </div>
          </div>
        </div>
        
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Monitor Types</span>
          </div>
          <div class="card-body">
            <ul class="data-list">
              <li class="data-list-item">
                <span class="data-label">Volume Spike</span>
                <span class="tag">Threshold-based</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">New Narrative</span>
                <span class="tag">Pattern matching</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">Faction Activity</span>
                <span class="tag">Entity tracking</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">Sentiment Shift</span>
                <span class="tag">Trend analysis</span>
              </li>
              <li class="data-list-item">
                <span class="data-label">Geographic Spread</span>
                <span class="tag">Location-based</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="card card-half">
          <div class="card-header">
            <span class="card-title">Recent Alerts</span>
          </div>
          <div class="card-body">
            <div class="empty-state">
              <div class="empty-state-icon">🔔</div>
              <p class="empty-state-text">No recent alerts</p>
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
}

export default Router;
