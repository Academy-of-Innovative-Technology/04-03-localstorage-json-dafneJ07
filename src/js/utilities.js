const Utilities = {
 /**
  * Creates HTML list items from an array
  * REQUIRED METHOD: Processes arrays and wraps in HTML
  * @param {Array} items - Array of strings
  * @param {String} className - CSS class for list items
  * @returns {String} HTML string of list items
  */
 createListItems: function(items, className = '') {
   if (!Array.isArray(items) || items.length === 0) {
     return '<li class="text-muted">No data available</li>';
   }
  
   return items.map(item => {
     const specialClass = this.isSpecialPower(item) ? 'data-special="true"' : '';
     return `<li class="${className}" ${specialClass}>${this.escapeHtml(item)}</li>`;
   }).join('');
 },


 /**
  * Creates badge elements from an array
  * @param {Array} items - Array of strings
  * @returns {String} HTML string of badges
  */
 createBadges: function(items) {
   if (!Array.isArray(items) || items.length === 0) {
     return '<span class="text-muted">No affiliations</span>';
   }
  
   return items.map(item => {
     const badgeClass = this.getAffiliationClass(item);
     return `<span class="affiliation-badge ${badgeClass}">${this.escapeHtml(item)}</span>`;
   }).join('');
 },


 /**
  * Determines CSS class based on affiliation name
  * @param {String} affiliation - Affiliation name
  * @returns {String} CSS class name
  */
 getAffiliationClass: function(affiliation) {
   const lower = affiliation.toLowerCase();
   if (lower.includes('x-men')) return 'x-men';
   if (lower.includes('brotherhood')) return 'brotherhood';
   if (lower.includes('avengers')) return 'avengers';
   return '';
 },


 /**
  * Checks if a power is considered "special"
  * @param {String} power - Power name
  * @returns {Boolean}
  */
 isSpecialPower: function(power) {
   const specialPowers = ['Phoenix Force', 'Regeneration', 'Telepathy', 'Energy Manipulation'];
   return specialPowers.some(sp => power.toLowerCase().includes(sp.toLowerCase()));
 },


 /**
  * Escapes HTML to prevent XSS
  * @param {String} text - Raw text
  * @returns {String} Escaped text
  */
 escapeHtml: function(text) {
   const div = document.createElement('div');
   div.textContent = text;
   return div.innerHTML;
 },


 /**
  * Formats height string
  * @param {String} height - Height value
  * @returns {String} Formatted height
  */
 formatHeight: function(height) {
   return height || 'Unknown';
 },


 /**
  * Counts unique items across all mutants
  * @param {Array} mutants - Array of mutant objects
  * @param {String} property - Property to count (e.g., 'powers', 'affiliation')
  * @returns {Number} Count of unique items
  */
 countUniqueItems: function(mutants, property) {
   const allItems = mutants.flatMap(m => m[property] || []);
   return new Set(allItems).size;
 },


 /**
  * Logs data to console with styling
  * @param {String} message - Message to log
  * @param {*} data - Data to log
  */
 log: function(message, data) {
   console.log(`%c[MutantDB] ${message}`, 'color: #1565C0; font-weight: bold;', data);
 }
};


// Export for use in other scripts (if using modules)
if (typeof module !== 'undefined' && module.exports) {
 module.exports = Utilities;
}


