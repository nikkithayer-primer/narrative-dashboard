/**
 * PageHeader.js
 * Utility for generating consistent page headers with breadcrumbs
 */

export const PageHeader = {
  /**
   * Create a page header HTML string
   * @param {Object} config - Header configuration
   * @param {Array} config.breadcrumbs - Array of breadcrumb items [{label, href}] or strings
   * @param {string} config.title - Page title
   * @param {string} [config.subtitle] - Subtitle text
   * @param {string} [config.icon] - Icon HTML or emoji
   * @param {string} [config.iconColor] - Background color for icon (for colored squares)
   * @param {string} [config.badge] - Badge HTML
   * @param {string} [config.description] - Description text
   * @param {string} [config.descriptionLink] - Link HTML to append to description
   * @returns {string} Page header HTML string
   */
  render(config) {
    const {
      breadcrumbs = [],
      title,
      subtitle,
      icon,
      iconColor,
      badge,
      description,
      descriptionLink
    } = config;

    const breadcrumbHtml = this.renderBreadcrumbs(breadcrumbs);
    const iconHtml = this.renderIcon(icon, iconColor);
    const titleRowHtml = this.renderTitleRow(title, iconHtml, badge);
    const subtitleHtml = subtitle ? `<p class="subtitle">${subtitle}</p>` : '';
    const descriptionHtml = this.renderDescription(description, descriptionLink);

    return `
      <div class="page-header">
        ${breadcrumbHtml}
        ${titleRowHtml}
        ${subtitleHtml}
        ${descriptionHtml}
      </div>
    `;
  },

  /**
   * Render breadcrumbs HTML
   * @param {Array} breadcrumbs - Array of breadcrumb items
   * @returns {string} Breadcrumbs HTML
   */
  renderBreadcrumbs(breadcrumbs) {
    if (!breadcrumbs.length) return '';

    const items = breadcrumbs.map((crumb, index) => {
      const isLast = index === breadcrumbs.length - 1;
      
      if (typeof crumb === 'string') {
        return isLast ? crumb : `${crumb} <span>/</span>`;
      }
      
      if (crumb.href) {
        return `<a href="${crumb.href}">${crumb.label}</a>${isLast ? '' : ' <span>/</span>'}`;
      }
      
      return `${crumb.label}${isLast ? '' : ' <span>/</span>'}`;
    });

    return `<div class="breadcrumb">${items.join(' ')}</div>`;
  },

  /**
   * Render icon HTML
   * @param {string} icon - Icon content
   * @param {string} iconColor - Background color for icon
   * @returns {string} Icon HTML
   */
  renderIcon(icon, iconColor) {
    if (!icon && !iconColor) return '';
    
    if (iconColor) {
      return `<span style="display: inline-block; width: 20px; height: 20px; background: ${iconColor}; border-radius: 4px; margin-right: 12px; vertical-align: middle;"></span>`;
    }
    
    return `<span style="font-size: 1.5rem; margin-right: 12px;">${icon}</span>`;
  },

  /**
   * Render title row with optional badge
   * @param {string} title - Page title
   * @param {string} iconHtml - Icon HTML
   * @param {string} badge - Badge HTML
   * @returns {string} Title row HTML
   */
  renderTitleRow(title, iconHtml, badge) {
    if (badge) {
      return `
        <div class="page-title-row">
          <h1>${iconHtml}${title}</h1>
          ${badge}
        </div>
      `;
    }
    return `<h1>${iconHtml}${title}</h1>`;
  },

  /**
   * Render description with optional link
   * @param {string} description - Description text
   * @param {string} descriptionLink - Link HTML
   * @returns {string} Description HTML
   */
  renderDescription(description, descriptionLink) {
    if (!description) return '';
    
    return `
      <p class="narrative-detail-description header-description">
        ${description}
        ${descriptionLink || ''}
      </p>
    `;
  },

  /**
   * Create a "not found" page header
   * @param {string} entityType - Type of entity (e.g., "Narrative", "Person")
   * @returns {string} Not found header HTML
   */
  notFound(entityType) {
    return `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#/dashboard">Dashboard</a> <span>/</span> ${entityType} not found
        </div>
        <h1>${entityType} not found</h1>
      </div>
    `;
  }
};

export default PageHeader;
