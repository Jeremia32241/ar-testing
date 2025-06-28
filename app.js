document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const exitViewButton = document.getElementById('exit-view');
    const scanModePanel = document.getElementById('scan-mode');
    const viewModePanel = document.getElementById('view-mode');
    const artworkTitle = document.getElementById('artwork-title');
    const artworkDescription = document.getElementById('artwork-description');
    const arScene = document.getElementById('ar-scene');
    const currentMarker = document.getElementById('current-marker');
    const currentModel = document.getElementById('current-model');
    const statusText = document.getElementById('status-text');

    // State management
    let currentArtwork = null;
    let isViewing = false;

    // Update status text
    function updateStatus(text) {
        if (statusText) statusText.textContent = text;
        console.log('ℹ️ Status:', text);
    }

    // Show artwork in AR view
    function showArtwork(artwork) {
        console.log('🖼️ Displaying artwork:', artwork.title);
        currentArtwork = artwork;
        isViewing = true;

        scanModePanel.classList.add('hidden');
        viewModePanel.classList.remove('hidden');
        artworkTitle.textContent = artwork.title;
        artworkDescription.textContent = artwork.description;

        if (artwork.modelPath) {
            load3DModel(artwork.modelPath, artwork.scale);
        }

        updateStatus(`Melihat: ${artwork.title}`);
    }

    // Load 3D model
    function load3DModel(url, scale = "0.5 0.5 0.5") {
        currentModel.setAttribute('gltf-model', `url(${url})`);
        currentModel.setAttribute('scale', scale);
    }

    // Return to scan mode
    function returnToScanMode() {
        currentModel.setAttribute('gltf-model', '');
        scanModePanel.classList.remove('hidden');
        viewModePanel.classList.add('hidden');
        isViewing = false;
        currentArtwork = null;
        updateStatus('AR Siap - Arahkan ke marker');
    }

    // Event listener for marker found
    currentMarker.addEventListener('markerFound', () => {
        if (isViewing) return;

        const patternUrl = currentMarker.getAttribute('url');
        console.log('🔍 Marker ditemukan:', patternUrl);
        const artwork = findArtworkByMarkerPattern(patternUrl);

        if (artwork) {
            showArtwork(artwork);
        } else {
            updateStatus('Marker tidak dikenal');
        }
    });

    // Exit view
    exitViewButton.addEventListener('click', returnToScanMode);

    // Auto init
    updateStatus('Menunggu marker...');
});
