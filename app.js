document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startARButton = document.getElementById('start-ar');
    const exitViewButton = document.getElementById('exit-view');
    const scanModePanel = document.getElementById('scan-mode');
    const viewModePanel = document.getElementById('view-mode');
    const artworkTitle = document.getElementById('artwork-title');
    const artworkDescription = document.getElementById('artwork-description');
    const arScene = document.getElementById('ar-scene');
    const currentMarker = document.getElementById('current-marker');
    const currentModel = document.getElementById('current-model');
    
    // State management
    let currentArtwork = null;
    let isViewing = false;
    
    // Initialize AR scene with all possible markers
    function initializeARScene() {
        const patterns = getAllMarkerPatterns();
        patterns.forEach(pattern => {
            // AR.js will handle multiple markers internally
        });
    }
    
    // Show artwork in AR view
    function showArtwork(artwork) {
        currentArtwork = artwork;
        
        // Update marker and model
        currentMarker.setAttribute('url', artwork.markerPattern);
        currentModel.setAttribute('gltf-model', artwork.modelPath);
        currentModel.setAttribute('scale', artwork.scale);
        
        // Update info panel
        artworkTitle.textContent = `${artwork.title} (${artwork.year})`;
        artworkDescription.textContent = artwork.description;
        
        // Switch to view mode
        scanModePanel.classList.add('hidden');
        viewModePanel.classList.remove('hidden');
        isViewing = true;
    }
    
    // Return to scan mode
    function returnToScanMode() {
        // Reset AR scene
        currentMarker.setAttribute('url', '');
        currentModel.setAttribute('gltf-model', '');
        
        // Switch to scan mode
        scanModePanel.classList.remove('hidden');
        viewModePanel.classList.add('hidden');
        isViewing = false;
        currentArtwork = null;
    }
    
    // Event listener for marker found
    arScene.addEventListener('markerFound', (e) => {
        if (isViewing) return; // Already viewing an artwork
        
        const marker = e.target;
        const patternUrl = marker.getAttribute('url');
        const artwork = findArtworkByMarkerPattern(patternUrl);
        
        if (artwork) {
            showArtwork(artwork);
        }
    });
    
    // Event listener for exit view button
    exitViewButton.addEventListener('click', returnToScanMode);
    
    // Event listener for start AR button
    startARButton.addEventListener('click', () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => {
                    startARButton.textContent = 'Scanning...';
                    initializeARScene();
                })
                .catch((error) => {
                    alert('Tidak dapat mengakses kamera: ' + error.message);
                });
        }
    });
    
    // Initialize
    initializeARScene();
});