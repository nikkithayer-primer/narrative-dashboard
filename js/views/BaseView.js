/**
 * BaseView.js
 * Base class for all view components
 * Provides shared functionality and reduces code duplication across views
 */

import {
  getSentimentClass,
  formatSentiment,
  formatNumber,
  formatStatus,
  truncateText
} from '../utils/formatters.js';
import { PageHeader } from '../utils/PageHeader.js';

export class BaseView {
  /**
   * @param {HTMLElement|string} container - Container element or ID
   * @param {Object} options - View options including missionId and timeRange
   */
  constructor(container, options = {}) {
    this.container = typeof container === 'string'
      ? document.getElementById(container)
      : container;
    this.options = options;
    this.components = {};
    this.missionId = options.missionId || 'all';
    this.timeRange = options.timeRange || null;
  }

  /**
   * Render the view - must be implemented by subclass
   */
  async render() {
    throw new Error('render() must be implemented by subclass');
  }

  /**
   * Clean up components and release resources
   */
  destroy() {
    Object.values(this.components).forEach(c => {
      if (c && c.destroy) c.destroy();
    });
    this.components = {};
  }

  /**
   * Get sentiment CSS class
   * @param {number|string} sentiment
   * @returns {string} CSS class suffix
   */
  getSentimentClass(sentiment) {
    return getSentimentClass(sentiment);
  }

  /**
   * Format sentiment for display
   * @param {number|string} sentiment
   * @returns {string} Human-readable sentiment label
   */
  formatSentiment(sentiment) {
    return formatSentiment(sentiment);
  }

  /**
   * Format number with abbreviations
   * @param {number} num
   * @returns {string} Formatted number
   */
  formatNumber(num) {
    return formatNumber(num);
  }

  /**
   * Format status for display
   * @param {string} status
   * @returns {string} Human-readable status label
   */
  formatStatus(status) {
    return formatStatus(status);
  }

  /**
   * Truncate text to max length
   * @param {string} text
   * @param {number} maxLength
   * @returns {string} Truncated text
   */
  truncateText(text, maxLength = 40) {
    return truncateText(text, maxLength);
  }

  /**
   * Show modal with narratives connecting two entities
   * Used by views that display network graphs
   * @param {Object} link - Link object with source, target, and narratives
   */
  showConnectingNarrativesModal(link) {
    const sourceNode = typeof link.source === 'object' ? link.source : { id: link.source };
    const targetNode = typeof link.target === 'object' ? link.target : { id: link.target };
    
    const sourceLabel = sourceNode.label || sourceNode.id;
    const targetLabel = targetNode.label || targetNode.id;
    
    const narrativesList = link.narratives.map(n => `
      <li class="narrative-link-item" data-id="${n.id}">
        <div class="narrative-link-text">${n.text}</div>
        <div class="narrative-link-meta">
          <span class="badge badge-${this.getSentimentClass(n.sentiment)}">${this.formatSentiment(n.sentiment)}</span>
        </div>
      </li>
    `).join('');

    window.app.showModal(`
      <div class="modal-header">
        <div class="modal-title-row">
          <span class="modal-icon">🔗</span>
          <h2 class="modal-title">Connecting Narratives</h2>
        </div>
        <button class="modal-close" onclick="window.app.closeModal()">×</button>
      </div>
      <div class="modal-body">
        <p class="connection-description">
          <strong>${sourceLabel}</strong> and <strong>${targetLabel}</strong> 
          appear together in ${link.narratives.length} narrative${link.narratives.length !== 1 ? 's' : ''}:
        </p>
        <ul class="connecting-narratives-list">
          ${narrativesList}
        </ul>
      </div>
    `);

    // Add click handlers for narrative items
    document.querySelectorAll('.narrative-link-item').forEach(item => {
      item.addEventListener('click', () => {
        const narrativeId = item.dataset.id;
        window.app.closeModal();
        window.location.hash = `#/narrative/${narrativeId}`;
      });
    });
  }

  /**
   * Render a "not found" page using PageHeader utility
   * @param {string} entityType - Type of entity (e.g., "Narrative", "Person")
   */
  renderNotFound(entityType) {
    this.container.innerHTML = PageHeader.notFound(entityType);
  }

  /**
   * Create a page header using PageHeader utility
   * @param {Object} config - Header configuration
   * @returns {string} Header HTML
   */
  createPageHeader(config) {
    return PageHeader.render(config);
  }
}

export default BaseView;
