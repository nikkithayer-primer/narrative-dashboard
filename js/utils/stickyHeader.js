/**
 * stickyHeader.js
 * Utility to manage sticky header behavior with scroll-based description hiding
 */

let scrollContainer = null;
let lastScrollTop = 0;
let scrollThreshold = 50; // Pixels to scroll before collapsing
let scrollHysteresis = 30; // Buffer zone to prevent flickering
let isInitialized = false;
let isCollapsed = false; // Track current state to apply hysteresis

/**
 * Get the actual scroll container
 */
function getScrollContainer() {
  // Try .main-content first (when inside content-wrapper)
  const mainContent = document.querySelector('.main-content');
  if (mainContent && mainContent.scrollHeight > mainContent.clientHeight) {
    return mainContent;
  }
  // Fall back to window
  return null;
}

/**
 * Get current scroll position
 */
function getScrollTop() {
  if (scrollContainer) {
    return scrollContainer.scrollTop;
  }
  return window.scrollY;
}

/**
 * Initialize sticky header scroll behavior
 * Call this after rendering a view with a page-header
 */
export function initStickyHeader() {
  // Determine the scroll container
  scrollContainer = getScrollContainer();
  
  // Remove any existing listeners
  window.removeEventListener('scroll', handleScroll);
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
  } else {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  // Reset scroll state
  lastScrollTop = getScrollTop();
  isCollapsed = false;
  isInitialized = true;
  
  // Initial check
  updateHeaderState();
}

/**
 * Handle scroll events
 */
function handleScroll() {
  if (!isInitialized) return;
  
  requestAnimationFrame(updateHeaderState);
}

/**
 * Update header state based on scroll position
 * Uses hysteresis to prevent flickering when near the threshold
 */
function updateHeaderState() {
  const currentScrollTop = getScrollTop();
  const pageHeader = document.querySelector('.page-header');
  
  if (!pageHeader) return;
  
  // Apply hysteresis: use different thresholds for collapsing vs expanding
  // This prevents the flickering caused by layout shifts when the description toggles
  if (!isCollapsed && currentScrollTop > scrollThreshold) {
    // Collapse when scrolling down past threshold
    pageHeader.classList.add('scrolled');
    isCollapsed = true;
  } else if (isCollapsed && currentScrollTop < (scrollThreshold - scrollHysteresis)) {
    // Only expand when scrolled back up past the hysteresis buffer
    // This means you need to scroll higher than where you collapsed
    pageHeader.classList.remove('scrolled');
    isCollapsed = false;
  }
  
  lastScrollTop = currentScrollTop;
}

/**
 * Clean up scroll listener
 */
export function destroyStickyHeader() {
  window.removeEventListener('scroll', handleScroll);
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll);
  }
  scrollContainer = null;
  isInitialized = false;
  isCollapsed = false;
}

/**
 * Reset header to expanded state
 */
export function resetStickyHeader() {
  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    pageHeader.classList.remove('scrolled');
  }
  lastScrollTop = getScrollTop();
  isCollapsed = false;
}

export default {
  initStickyHeader,
  destroyStickyHeader,
  resetStickyHeader
};
