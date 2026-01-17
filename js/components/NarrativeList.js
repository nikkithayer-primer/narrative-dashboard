/**
 * NarrativeList.js
 * List of narratives with sparklines
 */

import { BaseComponent } from './BaseComponent.js';
import { Sparkline } from './Sparkline.js';
import { getSourceViewer } from './SourceViewerModal.js';
import { formatStatus } from '../utils/formatters.js';

export class NarrativeList extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      maxItems: 10,
      showSentiment: true,
      showStatus: true,
      showSparkline: true,
      showVolume: true,
      defaultShowDescription: false,
      ...options
    });
    this.sparklines = [];
    this.showDescription = this.options.defaultShowDescription;
  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
    this.render();
    return this.showDescription;
  }

  setShowDescription(show) {
    this.showDescription = show;
    this.render();
  }

  render() {
    this.clear();
    this.sparklines.forEach(s => s.destroy());
    this.sparklines = [];

    if (!this.data || !this.data.narratives || !this.data.narratives.length) {
      this.showEmptyState('No narratives found');
      return;
    }

    const list = document.createElement('ul');
    list.className = 'narrative-list';

    const items = this.data.narratives.slice(0, this.options.maxItems);

    items.forEach((narrative, i) => {
      const totalVolume = this.calculateTotalVolume(narrative);
      const sparklineId = `sparkline-${this.containerId || 'list'}-${i}-${Date.now()}`;

      const item = document.createElement('li');
      item.className = 'narrative-item';
      item.dataset.id = narrative.id;

      item.innerHTML = `
        <div class="narrative-content">
          <div class="narrative-title-row">
            <span class="narrative-text">${narrative.text}</span>
            ${this.options.showStatus ? `
              <span class="badge badge-status-${narrative.status || 'new'}">${formatStatus(narrative.status || 'new')}</span>
            ` : ''}
          </div>
          ${narrative.description && this.showDescription ? `
            <p class="narrative-description">
              ${narrative.description}
              <a href="#" class="source-link" data-id="${narrative.id}" data-type="narrative">View source</a>
            </p>
          ` : ''}
        </div>
        <div class="narrative-meta">
          ${this.options.showVolume ? `
            <span class="narrative-volume">${this.formatNumber(totalVolume)}</span>
          ` : ''}
          ${this.options.showSparkline ? `
            <div class="sparkline-container" id="${sparklineId}"></div>
          ` : ''}
        </div>
      `;

      item.addEventListener('click', (e) => {
        // Don't navigate if clicking the source link
        if (e.target.classList.contains('source-link')) {
          return;
        }
        if (this.options.onNarrativeClick) {
          this.options.onNarrativeClick(narrative);
        }
      });

      // Handle source link click
      const sourceLink = item.querySelector('.source-link');
      if (sourceLink) {
        sourceLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          getSourceViewer().open(narrative, 'narrative');
        });
      }

      list.appendChild(item);
    });

    this.container.appendChild(list);

    // Render sparklines after DOM update
    if (this.options.showSparkline) {
      requestAnimationFrame(() => {
        items.forEach((narrative, i) => {
          const sparklineId = `sparkline-${this.containerId || 'list'}-${i}-${Date.now()}`;
          // Find the sparkline container that was just created
          const containers = this.container.querySelectorAll('.sparkline-container');
          const container = containers[i];
          
          if (container && narrative.volumeOverTime && narrative.volumeOverTime.length) {
            const sparkline = new Sparkline(container, {
              width: 80,
              height: 24,
              color: this.getSentimentColor(narrative.sentiment)
            });
            const values = narrative.volumeOverTime.map(d =>
              Object.values(d.factionVolumes || {}).reduce((a, b) => a + b, 0)
            );
            sparkline.update(values);
            this.sparklines.push(sparkline);
          }
        });
      });
    }
  }

  calculateTotalVolume(narrative) {
    return Object.values(narrative.factionMentions || {})
      .reduce((sum, f) => sum + (f.volume || 0), 0);
  }

  destroy() {
    this.sparklines.forEach(s => s.destroy());
    this.sparklines = [];
    super.destroy();
  }
}

export default NarrativeList;
