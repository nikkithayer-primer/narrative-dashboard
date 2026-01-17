/**
 * DashboardView.js
 * Aggregate overview of all narratives, filtered by mission and time range
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { MapView } from '../components/MapView.js';
import { TimelineVolumeComposite } from '../components/TimelineVolumeComposite.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';

export class DashboardView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
  }

  async render() {
    const stats = DataService.getDashboardStats(this.missionId, this.timeRange);
    const statusCounts = DataService.getNarrativeStatusCounts(this.timeRange);
    const mission = this.missionId !== 'all' 
      ? DataService.getMission(this.missionId)
      : null;

    // Build subtitle with filter info
    let subtitle = mission ? `Mission: ${mission.name}` : 'All missions overview';
    if (this.timeRange) {
      const formatDate = d3.timeFormat('%b %d, %Y');
      subtitle += ` | ${formatDate(this.timeRange.start)} - ${formatDate(this.timeRange.end)}`;
    }

    this.container.innerHTML = `
      <div class="page-header">
        <h1>Dashboard</h1>
        <p class="subtitle">${subtitle}</p>
      </div>

      <div class="content-area">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card clickable" data-href="#/narratives">
            <svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
              <path d="M2 2h12v12H2z" rx="1"/>
              <path d="M4 5h8M4 8h8M4 11h5"/>
            </svg>
            <div class="stat-value">${stats.totalNarratives}</div>
            <div class="stat-label">Narratives</div>
          </div>
          <div class="stat-card clickable" data-href="#/subnarratives">
            <svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
              <path d="M3 3h10v10H3z" rx="1"/>
              <path d="M5 6h6M5 9h4"/>
            </svg>
            <div class="stat-value">${stats.totalSubNarratives}</div>
            <div class="stat-label">Sub-Narratives</div>
          </div>
          <div class="stat-card clickable" data-href="#/factions">
            <svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
              <circle cx="8" cy="5" r="2.5"/>
              <circle cx="4" cy="11" r="2"/>
              <circle cx="12" cy="11" r="2"/>
              <path d="M6 6.5L4.5 9M10 6.5l1.5 2.5"/>
            </svg>
            <div class="stat-value">${stats.totalFactions}</div>
            <div class="stat-label">Factions</div>
          </div>
          <div class="stat-card clickable" data-href="#/locations">
            <svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
              <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
              <circle cx="8" cy="6" r="2"/>
            </svg>
            <div class="stat-value">${stats.totalLocations}</div>
            <div class="stat-label">Locations</div>
          </div>
          <div class="stat-card clickable" data-href="#/events">
            <svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
              <rect x="2" y="3" width="12" height="11" rx="1"/>
              <path d="M2 6h12M5 1v3M11 1v3"/>
            </svg>
            <div class="stat-value">${stats.totalEvents}</div>
            <div class="stat-label">Events</div>
          </div>
          <div class="stat-card clickable" data-href="#/entities">
            <svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
              <circle cx="8" cy="4" r="2.5"/>
              <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
            </svg>
            <div class="stat-value">${stats.totalPersons + stats.totalOrganizations}</div>
            <div class="stat-label">Entities</div>
          </div>
        </div>

        <!-- Status Overview -->
        <div class="status-overview">
          <div class="status-card status-new">
            <div class="status-count">${statusCounts.new}</div>
            <div class="status-name">New</div>
          </div>
          <div class="status-card status-in-progress">
            <div class="status-count">${statusCounts.in_progress}</div>
            <div class="status-name">In Progress</div>
          </div>
          <div class="status-card status-investigating">
            <div class="status-count">${statusCounts.under_investigation}</div>
            <div class="status-name">Investigating</div>
          </div>
          <div class="status-card status-resolved">
            <div class="status-count">${statusCounts.resolved}</div>
            <div class="status-name">Resolved</div>
          </div>
        </div>

        <div class="content-grid">
          <!-- Top Narratives -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Top Narratives by Volume</h2>
              <div class="card-header-actions">
                <button class="card-action-btn description-toggle" title="Toggle descriptions" data-target="dashboard-narrative-list">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 4h10M3 8h10M3 12h6"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="card-body no-padding" id="dashboard-narrative-list"></div>
          </div>

          <!-- Map -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Activity Locations</h2>
              <div class="card-header-actions"></div>
            </div>
            <div class="card-body no-padding" id="dashboard-map"></div>
          </div>

          <!-- Volume Over Time & Events Combined -->
          <div class="card card-full">
            <div class="card-header">
              <h2 class="card-title">Volume Over Time & Events</h2>
              <div class="card-header-actions"></div>
            </div>
            <div class="card-body" id="dashboard-volume-timeline"></div>
          </div>
        </div>
      </div>
    `;

    // Initialize card width toggles
    const contentGrid = this.container.querySelector('.content-grid');
    initAllCardToggles(contentGrid, 'dashboard', {
      0: 'half', // Top Narratives - default half
      1: 'half', // Map - default half
      2: 'full'  // Volume & Timeline Composite - full width
    });

    // Add click handlers for stat cards
    this.container.querySelectorAll('.stat-card.clickable').forEach(card => {
      card.addEventListener('click', () => {
        const href = card.dataset.href;
        if (href) {
          window.location.hash = href;
        }
      });
    });

    await this.initializeComponents(stats);

    // Add click handler for description toggle
    const descToggle = this.container.querySelector('.description-toggle');
    if (descToggle && this.components.narrativeList) {
      descToggle.addEventListener('click', () => {
        const isShowing = this.components.narrativeList.toggleDescription();
        descToggle.classList.toggle('active', isShowing);
      });
    }
  }

  async initializeComponents(stats) {
    // Top Narratives List
    this.components.narrativeList = new NarrativeList('dashboard-narrative-list', {
      maxItems: 8,
      onNarrativeClick: (n) => {
        window.location.hash = `#/narrative/${n.id}`;
      }
    });
    this.components.narrativeList.update({ narratives: stats.topNarratives });

    // Volume Over Time & Events Combined (with time range filtering)
    const volumeData = DataService.getAggregateVolumeOverTime(this.missionId, this.timeRange);
    const sourceData = DataService.getAggregateSourceVolumeOverTime(this.missionId, this.timeRange);
    const recentEvents = DataService.getRecentEvents(15, this.timeRange);

    const hasVolumeData = volumeData.dates.length > 0 && volumeData.factions.length > 0;
    const hasSourceData = sourceData.dates.length > 0 && sourceData.sources.length > 0;
    const hasEvents = recentEvents.length > 0;

    if (hasVolumeData || hasSourceData || hasEvents) {
      this.components.volumeTimeline = new TimelineVolumeComposite('dashboard-volume-timeline', {
        height: 450,
        volumeHeight: 180,
        timelineHeight: 180,
        showViewToggle: hasVolumeData && hasSourceData,
        onEventClick: (e) => {
          window.location.hash = `#/event/${e.id}`;
        },
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      this.components.volumeTimeline.update({
        volumeData: hasVolumeData ? volumeData : null,
        sourceData: hasSourceData ? sourceData : null,
        events: recentEvents
      });
    }

    // Map with all locations (filtered by time range)
    const locations = DataService.getAllLocationsWithCounts(this.timeRange);
    if (locations.length > 0) {
      this.components.map = new MapView('dashboard-map', {
        height: 350
      });
      this.components.map.update({ locations });
    }
  }

  setMission(missionId) {
    this.missionId = missionId;
    this.render();
  }

  setTimeRange(timeRange) {
    this.timeRange = timeRange;
    this.render();
  }
}

export default DashboardView;
