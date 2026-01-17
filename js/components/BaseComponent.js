/**
 * BaseComponent.js
 * Base class for all visualization components
 * Provides standard lifecycle methods and utilities
 */

export class BaseComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.container = typeof containerId === 'string'
      ? document.getElementById(containerId)
      : containerId;

    if (!this.container) {
      console.warn(`Container not found: ${containerId}`);
    }

    this.options = {
      width: options.width || (this.container ? this.container.clientWidth : 400),
      height: options.height || 300,
      margin: options.margin || { top: 20, right: 20, bottom: 30, left: 40 },
      ...options
    };

    this.data = null;
    this.svg = null;
    this._resizeHandler = null;
  }

  /**
   * Render the component - must be implemented by subclass
   */
  render() {
    throw new Error('render() must be implemented by subclass');
  }

  /**
   * Update data and re-render
   */
  update(data) {
    this.data = data;
    if (this.container) {
      this.render();
    }
    return this;
  }

  /**
   * Clear the container
   */
  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
    return this;
  }

  /**
   * Handle window resize
   */
  resize() {
    if (this.container) {
      this.options.width = this.container.clientWidth;
      if (this.data) {
        this.render();
      }
    }
    return this;
  }

  /**
   * Enable auto-resize on window resize
   */
  enableAutoResize() {
    if (!this._resizeHandler) {
      this._resizeHandler = () => this.resize();
      window.addEventListener('resize', this._resizeHandler);
    }
    return this;
  }

  /**
   * Disable auto-resize
   */
  disableAutoResize() {
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
      this._resizeHandler = null;
    }
    return this;
  }

  /**
   * Clean up and destroy the component
   */
  destroy() {
    this.disableAutoResize();
    this.clear();
    this.data = null;
    this.svg = null;
  }

  /**
   * Show empty state message
   */
  showEmptyState(message = 'No data available') {
    this.clear();
    if (this.container) {
      this.container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">◇</span>
          <p>${message}</p>
        </div>
      `;
    }
    return this;
  }

  /**
   * Show loading state
   */
  showLoading() {
    this.clear();
    if (this.container) {
      this.container.innerHTML = `
        <div class="loading-state">
          <div class="loader"></div>
          <p>Loading...</p>
        </div>
      `;
    }
    return this;
  }

  /**
   * Create SVG element with proper dimensions
   */
  createSvg() {
    const { width, height } = this.options;
    this.clear();

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    return this.svg;
  }

  /**
   * Create inner group with margins applied
   */
  createInnerGroup() {
    const { margin } = this.options;
    return this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  }

  /**
   * Get inner dimensions (excluding margins)
   */
  getInnerDimensions() {
    const { width, height, margin } = this.options;
    return {
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom
    };
  }

  /**
   * Format number with locale string
   */
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  }

  /**
   * Format date for display
   */
  formatDate(date) {
    const d = new Date(date);
    return d3.timeFormat('%b %d')(d);
  }

  /**
   * Get sentiment color - supports both numeric (-1 to 1) and legacy categorical values
   * @param {number|string} sentiment - Numeric value from -1 to 1, or legacy 'positive'/'neutral'/'negative'
   * @returns {string} CSS color value
   */
  getSentimentColor(sentiment) {
    // Handle legacy categorical values
    if (typeof sentiment === 'string') {
      const legacyColors = {
        positive: '#50b464',
        neutral: '#9ca3af',
        negative: '#c85050'
      };
      return legacyColors[sentiment] || legacyColors.neutral;
    }

    // Handle numeric sentiment (-1 to 1)
    const value = this.normalizeSentiment(sentiment);
    
    // Color stops: negative (red) -> neutral (gray) -> positive (green)
    const negativeColor = { r: 200, g: 80, b: 80 };   // #c85050
    const neutralColor = { r: 156, g: 163, b: 175 };  // #9ca3af
    const positiveColor = { r: 80, g: 180, b: 100 };  // #50b464

    let r, g, b;
    if (value < 0) {
      // Interpolate between negative and neutral
      const t = (value + 1); // 0 to 1 range for negative side
      r = Math.round(negativeColor.r + (neutralColor.r - negativeColor.r) * t);
      g = Math.round(negativeColor.g + (neutralColor.g - negativeColor.g) * t);
      b = Math.round(negativeColor.b + (neutralColor.b - negativeColor.b) * t);
    } else {
      // Interpolate between neutral and positive
      const t = value; // 0 to 1 range for positive side
      r = Math.round(neutralColor.r + (positiveColor.r - neutralColor.r) * t);
      g = Math.round(neutralColor.g + (positiveColor.g - neutralColor.g) * t);
      b = Math.round(neutralColor.b + (positiveColor.b - neutralColor.b) * t);
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Normalize sentiment value to -1 to 1 range
   * Handles both numeric values and legacy categorical strings
   * @param {number|string} sentiment
   * @returns {number} Value between -1 and 1
   */
  normalizeSentiment(sentiment) {
    if (typeof sentiment === 'string') {
      const legacyMap = { positive: 1, neutral: 0, negative: -1 };
      return legacyMap[sentiment] ?? 0;
    }
    if (typeof sentiment !== 'number' || isNaN(sentiment)) {
      return 0;
    }
    return Math.max(-1, Math.min(1, sentiment));
  }

  /**
   * Format sentiment value for display
   * @param {number|string} sentiment
   * @returns {string} Human-readable sentiment label
   */
  formatSentimentLabel(sentiment) {
    const value = this.normalizeSentiment(sentiment);
    if (value <= -0.6) return 'Very Negative';
    if (value <= -0.2) return 'Negative';
    if (value < 0.2) return 'Neutral';
    if (value < 0.6) return 'Positive';
    return 'Very Positive';
  }

  /**
   * Format sentiment value as a number string
   * @param {number|string} sentiment
   * @returns {string} Formatted number (e.g., "+0.75", "-0.25", "0.00")
   */
  formatSentimentValue(sentiment) {
    const value = this.normalizeSentiment(sentiment);
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}`;
  }

  /**
   * Get sentiment class - supports both numeric and legacy categorical values
   * @param {number|string} sentiment
   * @returns {string} CSS class suffix
   */
  getSentimentClass(sentiment) {
    const value = this.normalizeSentiment(sentiment);
    if (value < -0.2) return 'negative';
    if (value > 0.2) return 'positive';
    return 'neutral';
  }

  /**
   * Add tooltip behavior to selection
   */
  addTooltip(selection, contentFn) {
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('pointer-events', 'none');

    selection
      .on('mouseover', function(event, d) {
        tooltip.transition()
          .duration(200)
          .style('opacity', 1);
        tooltip.html(contentFn(d))
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Store tooltip reference for cleanup
    this._tooltip = tooltip;
    return selection;
  }

  /**
   * Remove tooltip
   */
  removeTooltip() {
    if (this._tooltip) {
      this._tooltip.remove();
      this._tooltip = null;
    }
  }
}

export default BaseComponent;
