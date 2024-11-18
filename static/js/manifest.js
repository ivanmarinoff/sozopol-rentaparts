function isDesktop() {
    return /Windows|Macintosh|Linux/.test(navigator.userAgent);
}

// Construct the manifest based on device type
// let iconUrl = isDesktop() ? '/static/fonts/fontawesome-webfont.svg' : '/static/fonts/fontawesome-webfont.svg';

// Generate the manifest content dynamically
let manifest = {
    name: "App name",
    short_name: "App",
    description: "Description of the app",
    start_url: "/",
    display: "standalone",
    background_color: "#3367D6",
    theme_color: "#3367D6",
    icons: [{
        // src: iconUrl,
        sizes: "512x512",
        type: "image/png"
    }]
};

// Create a data URL for the manifest
let content = encodeURIComponent(JSON.stringify(manifest));
let url = "data:application/manifest+json," + content;

// Create and append the manifest link to the document head
let element = document.createElement('link');
element.setAttribute('rel', 'manifest');
element.setAttribute('href', url);
document.querySelector('head').appendChild(element);
nonce = "{{nonce}}"