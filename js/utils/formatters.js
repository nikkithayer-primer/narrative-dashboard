/**
 * formatters.js
 * Shared formatting utilities for the application
 * Single source of truth for all formatting functions
 */

/**
 * Status labels mapping
 */
export const STATUS_LABELS = {
  'new': 'New',
  'in_progress': 'In Progress',
  'under_investigation': 'Investigating',
  'resolved': 'Resolved'
};

/**
 * Format status for display
 * @param {string} status - Status key
 * @returns {string} Human-readable status label
 */
export function formatStatus(status) {
  return STATUS_LABELS[status] || status;
}

/**
 * Normalize sentiment value to -1 to 1 range
 * Handles both numeric values and legacy categorical strings
 * @param {number|string} sentiment
 * @returns {number} Value between -1 and 1
 */
export function normalizeSentiment(sentiment) {
  if (typeof sentiment === 'string') {
    // Handle numeric strings
    if (!isNaN(parseFloat(sentiment))) {
      return Math.max(-1, Math.min(1, parseFloat(sentiment)));
    }
    // Handle legacy categorical values
    const legacyMap = { positive: 1, neutral: 0, negative: -1 };
    return legacyMap[sentiment] ?? 0;
  }
  if (typeof sentiment !== 'number' || isNaN(sentiment)) {
    return 0;
  }
  return Math.max(-1, Math.min(1, sentiment));
}

/**
 * Get sentiment CSS class - supports both numeric and legacy categorical values
 * @param {number|string} sentiment
 * @returns {string} CSS class suffix ('positive', 'neutral', or 'negative')
 */
export function getSentimentClass(sentiment) {
  const value = normalizeSentiment(sentiment);
  if (value < -0.2) return 'negative';
  if (value > 0.2) return 'positive';
  return 'neutral';
}

/**
 * Format sentiment value for display as a label
 * @param {number|string} sentiment
 * @returns {string} Human-readable sentiment label
 */
export function formatSentiment(sentiment) {
  const value = normalizeSentiment(sentiment);
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
export function formatSentimentValue(sentiment) {
  const value = normalizeSentiment(sentiment);
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

/**
 * Get sentiment color - supports both numeric (-1 to 1) and legacy categorical values
 * @param {number|string} sentiment - Numeric value from -1 to 1, or legacy 'positive'/'neutral'/'negative'
 * @returns {string} CSS color value
 */
export function getSentimentColor(sentiment) {
  // Handle legacy categorical values
  if (typeof sentiment === 'string' && isNaN(parseFloat(sentiment))) {
    const legacyColors = {
      positive: '#50b464',
      neutral: '#9ca3af',
      negative: '#c85050'
    };
    return legacyColors[sentiment] || legacyColors.neutral;
  }

  // Handle numeric sentiment (-1 to 1)
  const value = normalizeSentiment(sentiment);
  
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
 * Format number with locale string and abbreviations
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1.2M", "5.3K", "123")
 */
export function formatNumber(num) {
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
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const d = new Date(date);
  return d3.timeFormat('%b %d')(d);
}

/**
 * Format date with full details
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string with time
 */
export function formatDateFull(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Truncate text to a maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 40)
 * @returns {string} Truncated text with ellipsis if needed
 */
export function truncateText(text, maxLength = 40) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
