// Artwork Database
const artworkDatabase = [
    {
        id: "castil",
        title: "Castil terlarang",
        artist: "Pak Bintang",
        year: "gak tau",
        description: "test.",
        markerPattern: "markers/castil-marker.patt",
        modelPath: "models/castil.glb",
        scale: "0.5 0.5 0.5",
    }
];


function findArtworkByMarkerPattern(patternUrl) {
    return artworkDatabase.find(artwork => 
        artwork.markerPattern === patternUrl
    );
}


function getAllMarkerPatterns() {
    return artworkDatabase.map(artwork => artwork.markerPattern);
}