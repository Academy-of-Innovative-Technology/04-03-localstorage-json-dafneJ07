const Database = {
 // Configuration
 keyName: 'mutantData',
 data: null,
  // Test data to populate localStorage
 testData: {
   "response": [
     {
       "name": {
         "firstName": "James",
         "lastName": "Howlett",
         "alias": "Wolverine"
       },
       "profile": {
         "gender": "Male",
         "eyes": "brown",
         "hair": "black",
         "height": "5'3"
       },
       "powers": ["Heightened Senses", "Regeneration", "Superhuman Strength", "Superhuman Durability", "Superhuman Speed", "Superhuman Reflexes"],
       "image": "https://trendingpopculture.com/wp-content/uploads/2024/12/Ultimate-Universe-One-Year-In-1-Ivan-Tao-600x897.webp",
       "affiliation": ["X-MEN", "X-Factor", "Brotherhood", "Avengers"]
     },
     {
       "name": {
         "firstName": "Jean",
         "lastName": "Grey-Summers",
         "alias": "Phoenix"
       },
       "profile": {
         "gender": "Female",
         "eyes": "Green",
         "hair": "Red",
         "height": "5'7"
       },
       "image": "https://m.media-amazon.com/images/I/81OF3Rir5JL._AC_UF894,1000_QL80_.jpg",
       "powers": ["Telepathy", "Telekinesis", "Energy Manipulation", "Energy Blasts", "Force Field", "Illusion-Casting", "Astral Projection", "Flight"],
       "affiliation": ["X-MEN", "Phoenix Force", "Brotherhood"]
     },
     {
       "name": {
         "firstName": "Anna",
         "lastName": "Marie LeBeau",
         "alias": "Rogue"
       },
       "profile": {
         "gender": "Female",
         "eyes": "Green",
         "hair": "Brown (White Streak)",
         "height": "5'8"
       },
       "image": "https://i.pinimg.com/564x/d2/64/79/d26479262f6aa69d0c63d31ed82d2724.jpg",
       "powers": ["Power Mimicry", "Nigh Invulnerability", "Flight", "Superhuman Strength", "Superhuman Reflexes"],
       "affiliation": ["X-MEN", "Avengers", "Phoenix Force", "Brotherhood"]
     },
     {
       "name": {
         "firstName": "Ororo",
         "lastName": "Munroe",
         "alias": "Storm"
       },
       "profile": {
         "gender": "Female",
         "eyes": "Blue / White",
         "hair": "White / Silver",
         "height": "5'11"
       },
       "powers": ["Atmokinetic Combat", "Psionics", "Control of Elements", "Flight", "Heighted Senses"],
       "image": "https://comicvine.gamespot.com/a/uploads/original/8/85507/2065788-515678_xtremexmen36_super.jpg",
       "affiliation": ["X-MEN", "Fantastic Four", "Morlocks", "Quiet Council of Krakoa"]
     },
     {
       "name": {
         "firstName": "Remy",
         "lastName": "Etienne LeBeau",
         "alias": "Gambit"
       },
       "profile": {
         "gender": "Male",
         "eyes": "Black / Red",
         "hair": "Brown",
         "height": "6'2"
       },
       "powers": ["Energy Manipulation", "Hand-to-Hand", "Superhuman Agility"],
       "image": "https://unknowncomicbooks.com/cdn/shop/products/GAMBIT2022003_DC41.jpg",
       "affiliation": ["X-MEN", "Excalibur", "Brotherhood", "Angel of Death"]
     }
   ]
 }
};




// ============================================
// INITIALIZATION
// ============================================




document.addEventListener('DOMContentLoaded', function() {
 console.log('%c🦸 MUTANT DATABASE INITIALIZING...', 'color: #FDD835; font-size: 16px; font-weight: bold;');
  // Initialize localStorage with test data if empty
 initializeStorage();
  // Load and display data
 loadDataSource();
});




/**
* Initialize localStorage with test data if not already present
*/
function initializeStorage() {
 const existing = localStorage.getItem(Database.keyName);
  if (!existing) {
   console.log('📦 Populating localStorage with test data...');
   localStorage.setItem(Database.keyName, JSON.stringify(Database.testData));
   console.log('✅ Test data saved to localStorage');
 } else {
   console.log('✅ localStorage already contains data');
 }
}




// ============================================
// DATA LOADING
// ============================================




/**
* Loads data from localStorage
* - Uses localStorage.getItem() with Database.keyName
* - Parses JSON string to Object using JSON.parse()
* - Stores in Database.data property
* - Passes data to displayData()
*/
function loadDataSource() {
 console.log('📥 Loading data from localStorage...');
  try {
   // Get data from localStorage using the keyName
   const storedData = localStorage.getItem(Database.keyName);
  
   if (!storedData) {
     console.error('❌ No data found in localStorage');
     return;
   }
  
   // Parse the JSON string to an Object
   const parsedData = JSON.parse(storedData);
  
   // Save to Database.data property
   Database.data = parsedData;
  
   console.log('✅ Data loaded successfully:', Database.data);
  
   // Pass the data to displayData function
   displayData(Database.data);
  
   // Update status indicator
   updateStatus('ACTIVE');
  
 } catch (error) {
   console.error('❌ Error loading data:', error);
   updateStatus('ERROR');
 }
}




// ============================================
// DATA DISPLAY
// ============================================




/**
* Displays mutant data in the HTML
* - Uses querySelector to target the grid container
* - Uses forEach iterator to process each mutant
* - Uses insertAdjacentHTML to add cards
* - Uses innerText for text content
*
* @param {Object} data - The data object containing mutants array
*/
function displayData(data) {
 console.log('🎨 Displaying data...');
  // Get the container using querySelector
 const container = document.querySelector('#mutant-grid');
  if (!container) {
   console.error('❌ Container not found');
   return;
 }
  // Clear existing content
 container.innerHTML = '';
  // Check if data has response array
 if (!data || !data.response || !Array.isArray(data.response)) {
   console.error('❌ Invalid data structure');
   return;
 }
  const mutants = data.response;
  // Process each mutant using forEach iterator
 mutants.forEach(function(mutant, index) {
   // Create HTML card for this mutant
   const cardHTML = createMutantCard(mutant, index);
  
   // Insert into container using insertAdjacentHTML
   container.insertAdjacentHTML('beforeend', cardHTML);
 });
  // Update statistics
 updateStats(mutants);
  console.log(`✅ Displayed ${mutants.length} mutants`);
}




/**
* Creates HTML card for a single mutant
* Uses Utilities methods for array processing
*
* @param {Object} mutant - Single mutant object
* @param {Number} index - Index for animation delay
* @returns {String} HTML string
*/
function createMutantCard(mutant, index) {
 // Extract data using Object keys
 const firstName = mutant.name?.firstName || 'Unknown';
 const lastName = mutant.name?.lastName || '';
 const alias = mutant.name?.alias || 'Unknown';
 const gender = mutant.profile?.gender || 'Unknown';
 const eyes = mutant.profile?.eyes || 'Unknown';
 const hair = mutant.profile?.hair || 'Unknown';
 const height = mutant.profile?.height || 'Unknown';
 const image = mutant.image || 'https://via.placeholder.com/400x600?text=No+Image';
  // Process arrays using Utilities methods
 const powersHTML = Utilities.createListItems(mutant.powers || [], 'power-item');
 const affiliationsHTML = Utilities.createBadges(mutant.affiliation || []);
  // Build the card HTML
 return `
   <div class="col">
     <div class="mutant-card" data-gender="${Utilities.escapeHtml(gender)}" style="animation-delay: ${index * 0.1}s">
       <div class="mutant-image-container">
         <img src="${Utilities.escapeHtml(image)}"
              alt="${Utilities.escapeHtml(alias)}"
              class="mutant-image"
              onerror="this.src='https://via.placeholder.com/400x600?text=Image+Not+Found'">
         <div class="mutant-alias-badge">${Utilities.escapeHtml(alias)}</div>
       </div>
       <div class="mutant-body">
         <div class="mutant-real-name">
           ${Utilities.escapeHtml(firstName)} ${Utilities.escapeHtml(lastName)}
         </div>
        
         <div class="profile-section">
           <h6 class="profile-title">Profile</h6>
           <div class="profile-grid">
             <div class="profile-item">
               <span class="profile-label">Gender:</span>
               <span class="profile-value">${Utilities.escapeHtml(gender)}</span>
             </div>
             <div class="profile-item">
               <span class="profile-label">Height:</span>
               <span class="profile-value">${Utilities.escapeHtml(height)}</span>
             </div>
             <div class="profile-item">
               <span class="profile-label">Eyes:</span>
               <span class="profile-value">${Utilities.escapeHtml(eyes)}</span>
             </div>
             <div class="profile-item">
               <span class="profile-label">Hair:</span>
               <span class="profile-value">${Utilities.escapeHtml(hair)}</span>
             </div>
           </div>
         </div>
        
         <div class="powers-section">
           <h6 class="section-title">Powers</h6>
           <ul class="powers-list">
             ${powersHTML}
           </ul>
         </div>
        
         <div class="affiliations-section">
           <h6 class="section-title" style="color: #1565C0;">Affiliations</h6>
           <div class="affiliations-list">
             ${affiliationsHTML}
           </div>
         </div>
       </div>
     </div>
   </div>
 `;
}




// ============================================
// STATISTICS & UI UPDATES
// ============================================




/**
* Updates the statistics display
* @param {Array} mutants - Array of mutant objects
*/
function updateStats(mutants) {
 // Count total mutants
 const totalMutants = mutants.length;
  // Count unique powers
 const totalPowers = Utilities.countUniqueItems(mutants, 'powers');
  // Count unique affiliations
 const totalTeams = Utilities.countUniqueItems(mutants, 'affiliation');
  // Update DOM using querySelector and innerText
 const mutantsEl = document.querySelector('#total-mutants');
 const powersEl = document.querySelector('#total-powers');
 const teamsEl = document.querySelector('#total-teams');
  if (mutantsEl) mutantsEl.innerText = totalMutants;
 if (powersEl) powersEl.innerText = totalPowers;
 if (teamsEl) teamsEl.innerText = totalTeams;
}




/**
* Updates the database status indicator
* @param {String} status - Status text
*/
function updateStatus(status) {
 const statusEl = document.querySelector('#db-status');
 if (statusEl) {
   statusEl.innerText = status;
   if (status === 'ACTIVE') {
     statusEl.classList.remove('bg-info', 'bg-danger');
     statusEl.classList.add('bg-success');
   } else if (status === 'ERROR') {
     statusEl.classList.remove('bg-info', 'bg-success');
     statusEl.classList.add('bg-danger');
   }
 }
}




// ============================================
// ADVANCED FEATURES (IndexedDB)
// ============================================




/**
* IndexedDB Manager Object
* Single interface for managing IndexedDB operations
*/
const IndexedDBManager = {
 dbName: 'MutantDatabase',
 dbVersion: 1,
 storeName: 'mutants',
 db: null,




 /**
  * Initialize IndexedDB connection
  * @returns {Promise} Resolves when DB is ready
  */
 init: function() {
   return new Promise((resolve, reject) => {
     const request = indexedDB.open(this.dbName, this.dbVersion);




     request.onerror = () => reject(request.error);
     request.onsuccess = () => {
       this.db = request.result;
       console.log('✅ IndexedDB connected');
       resolve(this.db);
     };




     request.onupgradeneeded = (event) => {
       const db = event.target.result;
       if (!db.objectStoreNames.contains(this.storeName)) {
         const store = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
         store.createIndex('alias', 'name.alias', { unique: false });
         store.createIndex('affiliation', 'affiliation', { unique: false, multiEntry: true });
         console.log('✅ Object store created');
       }
     };
   });
 },




 /**
  * Transfer data from localStorage to IndexedDB
  * @param {Object} data - Data to transfer
  * @returns {Promise}
  */
 transferFromLocalStorage: function(data) {
   return new Promise((resolve, reject) => {
     if (!this.db) {
       reject(new Error('Database not initialized'));
       return;
     }




     const transaction = this.db.transaction([this.storeName], 'readwrite');
     const store = transaction.objectStore(this.storeName);




     // Clear existing data
     const clearRequest = store.clear();
    
     clearRequest.onsuccess = () => {
       // Add new data
       const mutants = data.response || [];
       let added = 0;




       mutants.forEach((mutant) => {
         const request = store.add(mutant);
         request.onsuccess = () => {
           added++;
           if (added === mutants.length) {
             console.log(`✅ Transferred ${added} mutants to IndexedDB`);
             resolve(added);
           }
         };
       });
     };




     transaction.onerror = () => reject(transaction.error);
   });
 },




 /**
  * Get all mutants from IndexedDB
  * @returns {Promise<Array>}
  */
 getAll: function() {
   return new Promise((resolve, reject) => {
     if (!this.db) {
       reject(new Error('Database not initialized'));
       return;
     }




     const transaction = this.db.transaction([this.storeName], 'readonly');
     const store = transaction.objectStore(this.storeName);
     const request = store.getAll();




     request.onsuccess = () => resolve(request.result);
     request.onerror = () => reject(request.error);
   });
 },




 /**
  * Query mutants by affiliation
  * @param {String} affiliation - Affiliation to search for
  * @returns {Promise<Array>}
  */
 queryByAffiliation: function(affiliation) {
   return new Promise((resolve, reject) => {
     if (!this.db) {
       reject(new Error('Database not initialized'));
       return;
     }




     const transaction = this.db.transaction([this.storeName], 'readonly');
     const store = transaction.objectStore(this.storeName);
     const index = store.index('affiliation');
     const request = index.getAll(affiliation);




     request.onsuccess = () => resolve(request.result);
     request.onerror = () => reject(request.error);
   });
 }
};




/**
* Initialize IndexedDB and transfer data
* Call this function to upgrade from localStorage to IndexedDB
*/
async function upgradeToIndexedDB() {
 console.log('🚀 Upgrading to IndexedDB...');
  try {
   await IndexedDBManager.init();
   await IndexedDBManager.transferFromLocalStorage(Database.data);
  
   // Display data from IndexedDB
   const indexedDBData = await IndexedDBManager.getAll();
   console.log('📊 Data from IndexedDB:', indexedDBData);
  
   // Update status
   updateStatus('INDEXEDDB');
  
   return true;
 } catch (error) {
   console.error('❌ IndexedDB upgrade failed:', error);
   return false;
 }
}




// Expose upgrade function globally for testing
window.upgradeToIndexedDB = upgradeToIndexedDB;




console.log('✅ Mutant Database script loaded successfully');








