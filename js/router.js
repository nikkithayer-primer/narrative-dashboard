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
import { DocumentsView } from './views/DocumentsView.js';
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
    if (!this.container) {
      console.error(`Router: Container element '${containerId}' not found`);
    }
    
    this.currentView = null;
    this.timeRangeFilter = null;
    
    // Global filter state
    this.filters = {
      missionId: 'all',
      timeRange: null // { start: Date, end: Date } or null for all time
    };

    // Bind hash change handler with error handling
    window.addEventListener('hashchange', () => {
      try {
        this.handleRoute();
      } catch (e) {
        console.error('Router: Error handling route change:', e);
        this.showErrorPage('Navigation Error', 'An error occurred while loading this page.');
      }
    });
  }

  /**
   * Show an error page when something goes wrong
   */
  showErrorPage(title = 'Error', message = 'An unexpected error occurred.') {
    if (this.container) {
      this.container.innerHTML = `
        <div class="view-header">
          <div>
            <h1 class="view-title">${this.escapeHtml(title)}</h1>
            <p class="view-subtitle">${this.escapeHtml(message)}</p>
          </div>
        </div>
        <div class="content-area">
          <div class="card">
            <div class="card-body" style="padding: var(--space-2xl); text-align: center;">
              <p>Try <a href="#/dashboard">returning to the dashboard</a> or refreshing the page.</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Initialize router and navigate to current hash
   */
  init() {
    try {
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
    } catch (e) {
      console.error('Router: Error during initialization:', e);
      // Try to at least show the dashboard
      window.location.hash = '#/dashboard';
    }
  }

  /**
   * Initialize mission filter dropdown
   */
  initMissionFilter() {
    try {
      const missionSelect = document.getElementById('mission-filter');
      if (missionSelect) {
        missionSelect.addEventListener('change', (e) => {
          this.filters.missionId = e.target.value || 'all';
          this.onFiltersChanged();
        });
      }
    } catch (e) {
      console.error('Router: Error initializing mission filter:', e);
    }
  }

  /**
   * Initialize time range filter component
   */
  initTimeRangeFilter() {
    try {
      const container = document.getElementById('time-range-filter');
      if (!container) return;

      // Get aggregate volume data for the histogram
      const volumeData = this.getTimeFilterData();
      
      if (!volumeData || !volumeData.dates || !volumeData.dates.length) {
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
    } catch (e) {
      console.error('Router: Error initializing time range filter:', e);
      const container = document.getElementById('time-range-filter');
      if (container) {
        container.innerHTML = '<div class="empty-state text-xs">Filter unavailable</div>';
      }
    }
  }

  /**
   * Get aggregated volume data for the time filter histogram
   */
  getTimeFilterData() {
    try {
      // Get volume data aggregated across all missions (for consistent histogram)
      const volumeData = DataService.getAggregateVolumeOverTime('all');
      
      if (!volumeData || !volumeData.dates || !volumeData.dates.length) {
        return null;
      }

      // Ensure series is an array
      const series = Array.isArray(volumeData.series) ? volumeData.series : [];

      // Calculate total volume per date (sum all factions)
      const volumes = volumeData.dates.map((date, i) => {
        return series.reduce((sum, s) => {
          const val = Array.isArray(s) ? (s[i] || 0) : 0;
          return sum + val;
        }, 0);
      });

      return {
        dates: volumeData.dates,
        volumes
      };
    } catch (e) {
      console.error('Router: Error getting time filter data:', e);
      return null;
    }
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
   * Parse query parameters from a hash string
   * @param {string} hash - The hash string (without #/)
   * @returns {Object} Query parameters as key-value pairs
   */
  parseQueryParams(hash) {
    const queryIndex = hash.indexOf('?');
    if (queryIndex === -1) return {};
    
    const queryString = hash.slice(queryIndex + 1);
    const params = {};
    
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    });
    
    return params;
  }

  /**
   * Parse current hash and route to appropriate view
   */
  handleRoute() {
    const fullHash = window.location.hash.slice(2) || 'dashboard'; // Remove #/
    
    // Separate path from query string
    const queryIndex = fullHash.indexOf('?');
    const hash = queryIndex === -1 ? fullHash : fullHash.slice(0, queryIndex);
    const queryParams = this.parseQueryParams(fullHash);
    
    const [route, id] = hash.split('/');

    this.currentRoute = route;

    // Destroy current view and clean up sticky header
    try {
      destroyStickyHeader();
    } catch (e) {
      console.error('Router: Error destroying sticky header:', e);
    }
    
    if (this.currentView && this.currentView.destroy) {
      try {
        this.currentView.destroy();
      } catch (e) {
        console.error('Router: Error destroying previous view:', e);
      }
    }
    this.currentView = null;

    // Update active nav link
    try {
      this.updateNavLinks(route);
    } catch (e) {
      console.error('Router: Error updating nav links:', e);
    }

    // Common options with filters
    const filterOptions = {
      missionId: this.filters.missionId || 'all',
      timeRange: this.filters.timeRange,
      tab: queryParams.tab || 'dashboard' // Default to dashboard tab
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
          window.location.hash = '#/documents';
          return;
        }
        break;

      case 'documents':
        this.currentView = new DocumentsView(this.container, filterOptions);
        break;

      case 'entities':
        this.currentView = new ListView(this.container, 'entities', filterOptions);
        break;

      case 'editor':
        this.currentView = new EditorView(this.container);
        break;

      case 'data-model':
        // Navigate to standalone data model page
        window.location.href = 'data-model.html';
        return;

      case 'component-demos':
        // Navigate to standalone component demos page
        window.location.href = 'component-demos.html';
        return;

      case 'status':
        // Status pages have been removed - redirect to dashboard
        // The dashboard now handles status filtering inline
        window.location.hash = '#/dashboard';
        return;

      case 'monitors':
        this.currentView = this.createMonitorsView(filterOptions);
        break;

      case 'workspaces':
        this.currentView = this.createWorkspacesView(filterOptions);
        break;

      case 'search':
        this.currentView = this.createSearchView(filterOptions);
        break;

      case 'projects':
        this.currentView = this.createProjectsView(filterOptions);
        break;

      default:
        // Default to dashboard
        window.location.hash = '#/dashboard';
        return;
    }

    // Render the view
    if (this.currentView && this.currentView.render) {
      try {
        this.currentView.render();
      } catch (e) {
        console.error(`Router: Error rendering view for route '${route}':`, e);
        this.showErrorPage('Page Error', `An error occurred while loading ${route || 'this page'}.`);
        return;
      }
    }

    // Initialize sticky header behavior
    try {
      initStickyHeader();
    } catch (e) {
      console.error('Router: Error initializing sticky header:', e);
    }

    // Scroll to top
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      // Scroll errors are non-critical
    }
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
          (linkRoute === 'entities' && (route === 'person' || route === 'organization')) ||
          (linkRoute === 'documents' && route === 'document')) {
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
    const fullHash = window.location.hash.slice(2) || 'dashboard';
    const queryIndex = fullHash.indexOf('?');
    const hash = queryIndex === -1 ? fullHash : fullHash.slice(0, queryIndex);
    const [route, id] = hash.split('/');
    const queryParams = this.parseQueryParams(fullHash);
    return { route, id, queryParams };
  }

  /**
   * Build a URL with the current route and updated query params
   * @param {Object} params - Query params to set/update
   * @returns {string} The full hash URL
   */
  buildUrl(params = {}) {
    const { route, id } = this.getCurrentRoute();
    const basePath = id ? `#/${route}/${id}` : `#/${route}`;
    
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    return queryString ? `${basePath}?${queryString}` : basePath;
  }

  /**
   * Refresh the time filter data (e.g., after data import)
   */
  refreshTimeFilter() {
    try {
      if (this.timeRangeFilter && this.timeRangeFilter.updateData) {
        const volumeData = this.getTimeFilterData();
        if (volumeData) {
          this.timeRangeFilter.updateData(volumeData);
        }
      }
    } catch (e) {
      console.error('Router: Error refreshing time filter:', e);
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
   * Create the Search view stub
   */
  createSearchView(filterOptions) {
    this.container.innerHTML = `
      <div class="page-header">
        <h1>Search</h1>
        <p class="header-description text-secondary">Search across all narratives, factions, events, and entities</p>
      </div>
      
      <div class="content-area">
        <div class="card">
          <div class="card-body" style="padding: var(--space-2xl);">
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
              <div style="margin-bottom: var(--space-xl);">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-bottom: var(--space-md);">
                  <circle cx="11" cy="11" r="7"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <h2 style="font-size: var(--text-lg); font-weight: 500; color: var(--text-primary); margin-bottom: var(--space-sm);">Global Search</h2>
                <p class="text-secondary text-sm">Search functionality coming soon. This will allow you to search across all narratives, themes, factions, events, people, and organizations.</p>
              </div>
              
              <div style="position: relative; max-width: 400px; margin: 0 auto;">
                <input 
                  type="text" 
                  class="search-input" 
                  placeholder="Search narratives, factions, events..." 
                  style="width: 100%; padding: var(--space-md) var(--space-lg); padding-left: 44px; font-size: var(--text-base);"
                  disabled
                />
                <svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%);">
                  <circle cx="7" cy="7" r="4.5"/>
                  <path d="M10.5 10.5L14 14"/>
                </svg>
              </div>
              
              <div style="margin-top: var(--space-2xl); display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
                <span class="badge">Narratives</span>
                <span class="badge">Themes</span>
                <span class="badge">Factions</span>
                <span class="badge">Events</span>
                <span class="badge">People</span>
                <span class="badge">Organizations</span>
              </div>
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
   * Create the Projects view stub
   */
  createProjectsView(filterOptions) {
    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h1 class="view-title">Projects</h1>
          <p class="view-subtitle">Manage and track your analysis projects</p>
        </div>
        <button class="btn btn-primary">+ New Project</button>
      </div>
      
      <div class="content-area">
        <div class="card">
          <div class="card-body" style="padding: var(--space-2xl);">
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
              <div style="margin-bottom: var(--space-xl);">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-bottom: var(--space-md);">
                  <path d="M3 7h7l2 2h9v11H3V7z"/>
                  <path d="M3 7V5a2 2 0 012-2h5l2 2"/>
                </svg>
                <h2 style="font-size: var(--text-lg); font-weight: 500; color: var(--text-primary); margin-bottom: var(--space-sm);">Projects</h2>
                <p class="text-secondary text-sm">Projects feature coming soon. This will allow you to organize your analysis work into discrete projects with dedicated resources and collaborators.</p>
              </div>
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
   * Create the Monitors view - loads monitors from DataService
   */
  createMonitorsView(filterOptions) {
    // Load monitors from DataService
    const monitors = DataService.getMonitors();
    
    // Helper to get scope icon based on scope type
    const getScopeIcon = (scopeType) => {
      const icons = {
        narrative: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <path d="M2 2h12v12H2z" rx="1"/>
          <path d="M4 5h8M4 8h8M4 11h5"/>
        </svg>`,
        theme: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <path d="M2 2h12v12H2z" rx="1"/>
          <path d="M4 5h8M4 8h6M4 11h4"/>
        </svg>`,
        faction: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <circle cx="8" cy="5" r="2.5"/>
          <circle cx="4" cy="11" r="2"/>
          <circle cx="12" cy="11" r="2"/>
          <path d="M6 6.5L4.5 9M10 6.5l1.5 2.5"/>
        </svg>`,
        person: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <circle cx="8" cy="4" r="2.5"/>
          <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
        </svg>`,
        organization: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <rect x="3" y="6" width="10" height="8" rx="1"/>
          <path d="M5 6V4a3 3 0 0 1 6 0v2"/>
          <rect x="5" y="9" width="2" height="2"/>
          <rect x="9" y="9" width="2" height="2"/>
        </svg>`,
        location: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
          <circle cx="8" cy="6" r="2"/>
        </svg>`,
        event: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <rect x="2" y="3" width="12" height="11" rx="1"/>
          <path d="M2 6h12M5 1v3M11 1v3"/>
        </svg>`,
        custom: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
          <circle cx="8" cy="8" r="6"/>
          <path d="M8 5v6M5 8h6"/>
        </svg>`
      };
      return icons[scopeType] || icons.custom;
    };
    
    // Helper to format relative time
    const formatRelativeTime = (isoDate) => {
      if (!isoDate) return null;
      const date = new Date(isoDate);
      const now = new Date();
      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString();
    };
    
    // Helper to get alert type label
    const getAlertTypeLabel = (type) => {
      const labels = {
        'volume_spike': 'Volume Spike',
        'sentiment_shift': 'Sentiment Shift',
        'new_narrative': 'New Narrative',
        'new_event': 'New Event',
        'faction_engagement': 'Faction Engagement'
      };
      return labels[type] || type;
    };
    
    // Helper to get alert type CSS class
    const getAlertTypeClass = (type) => {
      const classes = {
        'volume_spike': 'volume',
        'sentiment_shift': 'sentiment',
        'new_narrative': 'narrative',
        'new_event': 'event',
        'faction_engagement': 'faction'
      };
      return classes[type] || 'default';
    };
    
    // Build enriched monitor data with computed fields
    const enrichedMonitors = monitors.map(monitor => {
      const scopeType = DataService.getMonitorScopeType(monitor.id);
      const scopeLabel = DataService.getMonitorScopeLabel(monitor.id);
      const triggerLabels = DataService.getMonitorTriggerLabels(monitor.id);
      const matchedNarratives = DataService.getNarrativesForMonitor(monitor.id);
      const alerts = DataService.getAlertsForMonitor(monitor.id);
      const containerId = `monitor-narratives-${monitor.id}`;
      
      return {
        ...monitor,
        scopeType,
        scopeLabel,
        scopeIcon: getScopeIcon(scopeType),
        triggerLabels,
        matchedNarratives,
        alerts,
        containerId,
        lastTriggeredFormatted: formatRelativeTime(monitor.lastTriggered)
      };
    });
    
    // Build monitor cards HTML
    const monitorCardsHtml = enrichedMonitors.map(monitor => {
      const statusClass = monitor.enabled ? '' : 'monitor-paused';
      const indicatorClass = monitor.enabled ? 'active' : 'paused';
      
      // Build alerts HTML
      const alertsHtml = monitor.alerts && monitor.alerts.length > 0 
        ? monitor.alerts.slice(0, 3).map(alert => `
            <div class="monitor-alert-item">
              <span class="alert-type-badge ${getAlertTypeClass(alert.type)}">${getAlertTypeLabel(alert.type)}</span>
              <span class="alert-description">${alert.description}</span>
              <span class="alert-time">${formatRelativeTime(alert.triggeredAt)}</span>
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
                      ${monitor.triggerLabels.map(t => `<span class="trigger-tag">${t}</span>`).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-header-actions">
              ${!monitor.enabled ? '<span class="badge badge-status-paused">Paused</span>' : ''}
              <span class="monitor-meta-text">${
                monitor.enabled && monitor.lastTriggeredFormatted
                  ? `Triggered ${monitor.lastTriggeredFormatted}` 
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
            <div class="monitor-narratives-container" id="${monitor.containerId}"></div>
          </div>
        </div>
      `;
    }).join('');
    
    // Calculate today's alerts count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const allAlerts = DataService.getAlerts();
    const todayAlerts = allAlerts.filter(a => new Date(a.triggeredAt) >= today);
    
    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h1 class="view-title">Monitors</h1>
          <p class="view-subtitle">Track entities and narratives with custom alert thresholds</p>
        </div>
        <div class="view-header-actions">
          <div class="nav-dropdown monitor-dropdown">
            <button class="nav-dropdown-trigger">
              <span>Trigger Types</span>
              <svg class="dropdown-arrow" viewBox="0 0 16 16" fill="none" stroke="var(--text-secondary)" stroke-width="1">
                <path d="M4 6l4 4 4-4"/>
              </svg>
            </button>
            <div class="nav-dropdown-menu monitor-dropdown-menu">
              <div class="dropdown-item-row">
                <span class="data-label">Volume Spike</span>
                <span class="text-muted">Threshold-based</span>
              </div>
              <div class="dropdown-item-row">
                <span class="data-label">Sentiment Shift</span>
                <span class="text-muted">Trend analysis</span>
              </div>
              <div class="dropdown-item-row">
                <span class="data-label">New Narrative</span>
                <span class="text-muted">Pattern matching</span>
              </div>
              <div class="dropdown-item-row">
                <span class="data-label">New Event</span>
                <span class="text-muted">Entity tracking</span>
              </div>
              <div class="dropdown-item-row">
                <span class="data-label">Faction Engagement</span>
                <span class="text-muted">Activity monitoring</span>
              </div>
            </div>
          </div>
          
          <div class="nav-dropdown monitor-dropdown">
            <button class="nav-dropdown-trigger">
              <span>Scope Types</span>
              <svg class="dropdown-arrow" viewBox="0 0 16 16" fill="none" stroke="var(--text-secondary)" stroke-width="1">
                <path d="M4 6l4 4 4-4"/>
              </svg>
            </button>
            <div class="nav-dropdown-menu monitor-dropdown-menu">
              <div class="dropdown-item-row">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <path d="M2 2h12v12H2z" rx="1"/>
                    <path d="M4 5h8M4 8h8M4 11h5"/>
                  </svg>
                  <span class="scope-type-label">Narrative</span>
                </span>
                <span class="text-xs text-muted">Watch existing narratives</span>
              </div>
              <div class="dropdown-item-row">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <path d="M2 2h12v12H2z" rx="1"/>
                    <path d="M4 5h8M4 8h6M4 11h4"/>
                  </svg>
                  <span class="scope-type-label">Theme</span>
                </span>
                <span class="text-xs text-muted">Watch specific themes</span>
              </div>
              <div class="dropdown-item-row">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <path d="M6 1v14M10 1v14M1 6h14M1 10h14"/>
                  </svg>
                  <span class="scope-type-label">Topic</span>
                </span>
                <span class="text-xs text-muted">Watch topic keywords</span>
              </div>
              <div class="dropdown-item-row">
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
              </div>
              <div class="dropdown-item-row">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <circle cx="8" cy="4" r="2.5"/>
                    <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
                  </svg>
                  <span class="scope-type-label">Person</span>
                </span>
                <span class="text-xs text-muted">Watch individuals</span>
              </div>
              <div class="dropdown-item-row">
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
              </div>
              <div class="dropdown-item-row">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
                    <circle cx="8" cy="6" r="2"/>
                  </svg>
                  <span class="scope-type-label">Location</span>
                </span>
                <span class="text-xs text-muted">Watch geographic areas</span>
              </div>
              <div class="dropdown-item-row">
                <span class="scope-type-item">
                  <svg class="scope-type-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                    <rect x="2" y="3" width="12" height="11" rx="1"/>
                    <path d="M2 6h12M5 1v3M11 1v3"/>
                  </svg>
                  <span class="scope-type-label">Event</span>
                </span>
                <span class="text-xs text-muted">Watch specific events</span>
              </div>
            </div>
          </div>
          
          <div class="view-header-stats">
            <span class="badge badge-status-active">${enrichedMonitors.filter(m => m.enabled).length} Active Monitors</span>
            <span class="badge badge-status-high">${todayAlerts.length} Alert${todayAlerts.length !== 1 ? 's' : ''} Today</span>
          </div>
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
      
    `;
    
    // Setup popover toggle handlers
    this.setupHeaderPopovers();
    
    // Initialize NarrativeList components for each monitor
    const narrativeListComponents = [];
    enrichedMonitors.forEach(monitor => {
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
   * Setup dropdown toggle handlers for Monitors view
   * Uses the same pattern as the header nav-dropdowns
   */
  setupHeaderPopovers() {
    const dropdowns = this.container.querySelectorAll('.nav-dropdown.monitor-dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          
          // Close other open dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('open');
            }
          });
          
          // Toggle this dropdown
          dropdown.classList.toggle('open');
        });
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown.monitor-dropdown')) {
        dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
      }
    });
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
