// Artwork Database
const artworkDatabase = [
    {
        id: "castil-luar",
        title: "Castil di Luar Negeri",
        description: "Sebuah representasi digital dari kastil luar negeri yang misterius.",
        markerPattern: "markers/castil-luar-marker.patt",
        modelPath: "models/castil.glb",
        scale: "0.5 0.5 0.5"
    }
];

function findArtworkByMarkerPattern(patternUrl) {
    return artworkDatabase.find(artwork => 
        artwork.markerPattern === patternUrl
    );
}
