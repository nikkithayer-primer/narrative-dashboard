/**
 * CardBuilder.js
 * Utility for generating consistent card HTML across all views
 */

export const CardBuilder = {
  /**
   * Create a card HTML string
   * @param {string} title - Card title
   * @param {string} containerId - ID for the card body container
   * @param {Object} options - Configuration options
   * @param {number} [options.count] - Optional count to display in title
   * @param {boolean} [options.noPadding] - Remove padding from card body
   * @param {boolean} [options.halfWidth] - Make card half-width
   * @param {boolean} [options.fullWidth] - Make card full-width
   * @param {string} [options.actions] - HTML for card header actions
   * @param {string} [options.bodyClass] - Additional classes for card body
   * @returns {string} Card HTML string
   */
  create(title, containerId, options = {}) {
    const countLabel = options.count !== undefined ? ` (${options.count})` : '';
    
    const bodyClasses = [
      'card-body',
      options.noPadding ? 'no-padding' : '',
      options.bodyClass || ''
    ].filter(Boolean).join(' ');
    
    const cardClasses = [
      'card',
      options.halfWidth ? 'card-half-width' : '',
      options.fullWidth ? 'card-full-width' : ''
    ].filter(Boolean).join(' ');
    
    return `
      <div class="${cardClasses}">
        <div class="card-header">
          <h2 class="card-title">${title}${countLabel}</h2>
          <div class="card-header-actions">${options.actions || ''}</div>
        </div>
        <div class="${bodyClasses}" id="${containerId}"></div>
      </div>
    `;
  },

  /**
   * Create description toggle button HTML
   * @param {string} id - Button ID
   * @returns {string} Button HTML
   */
  descriptionToggle(id) {
    return `
      <button class="card-action-btn description-toggle" title="Toggle descriptions" id="${id}">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 4h10M3 8h10M3 12h6"/>
        </svg>
      </button>
    `;
  },

  /**
   * Create multiple cards from a configuration array
   * @param {Array} configs - Array of card configurations
   * @returns {string} Combined card HTML
   */
  createMultiple(configs) {
    return configs
      .filter(config => config.condition !== false)
      .map(config => this.create(config.title, config.id, config.options))
      .join('');
  }
};

export default CardBuilder;
