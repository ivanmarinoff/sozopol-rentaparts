const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
const useragent = require('express-useragent');
const helmet = require('helmet');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64'); // Generate a unique nonce
    next();
});

app.use(useragent.express());
require('dotenv').config();
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", `script-src 'self' 'nonce-${res.locals.nonce}'; object-src 'none';`);
    next();
});

// Static file serving
app.use('/static', express.static(path.join(__dirname, 'static')));



// Body parser for form data
app.use(require('body-parser').urlencoded({extended: true}));
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'"],
            imgSrc: ["'self'"],
            scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`], // Use the generated nonce
            styleSrc: ["'self'"],
            frameSrc: ["'self'"],
        },
        reportOnly: true, // Set to 'true' to enable report-only mode
    })
);

const isDesktop = (userAgent) => {
    return /Windows|Macintosh|Linux/.test(userAgent);
};

// Serve the manifest.json dynamically
const fs = require('fs'); // Import the file system module

app.get('/manifest.json', function (req, res) {
    const iconUrl = isDesktop(req.useragent.platform)
        ? '/static/fonts/fontawesome-webfont.svg'
        : '/static/fonts/fontawesome-webfont.svg';

    const manifest = {
        name: "rental_site",
        short_name: "Rental site",
        description: "This is a Rental site on my portfolio.",
        version: "1.0.0",
        start_url: "/",
        display: "standalone",
        orientation: "any",
        permissions: ["storage", "activeTab", "scripting"],
        host_permissions: [
            "*://cookieinfoscript.com/*",
            "*://google-analytics.com/*",
            "*://tagmanager.google.com/*",
            "*://fonts.googleapis.com/*"
        ],
        content_scripts: [
            {
                matches: ["<all_urls>"],
                js: [
                    "static/js/gtag.js",
                    "static/js/head_tagscript.js",
                    "static/js/jquery.js",
                    "static/js/owl-carousel.js",
                    "static/bootstrap/js/bootstrap.min.js",
                    "static/js/counter.js",
                    "static/js/isotope.min.js",
                    "static/js/manifest.js",
                    "static/js/custom.js",
                    "static/js/body_tagscript.js",
                    "static/js/cookieinfo.min.js",
                    "https://code.jquery.com/jquery-3.6.0.min.js",
                ]
            }
        ],
        background: {
            service_worker: "static/js/background.js"
        },
        web_accessible_resources: [
            {
                resources: [
                    "static/js/gtag.js",
                    "static/js/head_tagscript.js",
                    "static/js/jquery.js",
                    "static/js/owl-carousel.js",
                    "static/bootstrap/js/bootstrap.min.js",
                    "static/js/counter.js",
                    "static/js/isotope.min.js",
                    "static/js/manifest.js",
                    "static/js/custom.js",
                    "static/js/body_tagscript.js",
                    "static/js/cookieinfo.min.js",
                    "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800"
                ],
                matches: ["<all_urls>"]
            }
        ],
        content_security_policy:
            "script-src 'self' 'nonce-randomNonceValue'; object-src 'self'; 'unsafe-inline' 'unsafe-eval' https://cookieinfoscript.com https://google-analytics.com; object-src 'self';",
        background_color: "#3367D6",
        theme_color: "#3367D6",
        icons: [
            {
                src: iconUrl,
                sizes: "512x512",
                type: "image/png"
            }
        ]
    };

    // Write the manifest to the root directory as 'manifest.json'
    fs.writeFileSync('./manifest.json', JSON.stringify(manifest, null, 2), 'utf-8');

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(manifest, null, 2));
});



if (typeof window !== 'undefined') {
    // Set the language preference
    function setLanguage(language) {
        localStorage.setItem('language', language);
    }

    // Redirect based on the stored language preference
    window.addEventListener('DOMContentLoaded', () => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        const currentPath = window.location.pathname;

        if (savedLanguage === 'bg' && !currentPath.startsWith('/bg')) {
            window.location.href = '/bg';
        } else if (savedLanguage === 'en' && !currentPath.startsWith('/en')) {
            window.location.href = '/en';
        }
    });
}


// Set up your index route
app.get('/', (req, res) => {
    res.redirect('/bg' + '/');
});

app.get('/en', (req, res) => {
    res.sendFile(path.join(__dirname, 'en', 'index.html'));
});

app.get('/bg', (req, res) => {
    res.sendFile(path.join(__dirname, 'bg', 'index.html'));
});

app.get('/en/properties.html', function (req, res){
    res.sendFile(path.join(__dirname, '/en', '/properties.html'));
});

app.get('/bg/properties.html', function (req, res){
    res.sendFile(path.join(__dirname, '/bg', '/properties.html'));
});

app.get('/en/property-details.html', function (req, res){
    res.sendFile(path.join(__dirname, '/en', '/property-details.html'));
});

app.get('/bg/property-details.html', function (req, res){
    res.sendFile(path.join(__dirname, '/bg', '/property-details.html'));
});

app.get('/bg/contact.html', function (req, res){
    res.sendFile(path.join(__dirname  + '/bg' +'/contact.html'));
});

app.get('/en/contact.html', function (req, res){
    res.sendFile(path.join(__dirname + '/en' + '/contact.html'));
});
app.get('/bg/food&drink.html', function (req, res){
    res.sendFile(path.join(__dirname + '/bg' + '/food&drink.html'));
});

app.get('/en/food&drink.html', function (req, res){
    res.sendFile(path.join(__dirname + '/en' + '/food&drink.html'));
});

app.get('/bg/traveling.html', function (req, res){
    res.sendFile(path.join(__dirname + '/bg' + '/traveling.html'));
});

app.get('/en/traveling.html', function (req, res){
    res.sendFile(path.join(__dirname + '/en' + '/traveling.html'));
});

app.get('/bg/culture.html', function (req, res){
    res.sendFile(path.join(__dirname + '/bg' + '/culture.html'));
});

app.get('/en/culture.html', function (req, res){
    res.sendFile(path.join(__dirname + '/en' + '/culture.html'));
});

app.get('/bg/cuisine.html', function (req, res){
    res.sendFile(path.join(__dirname + '/bg' + '/cuisine.html'));
});

app.get('/en/cuisine.html', function (req, res){
    res.sendFile(path.join(__dirname + '/en' + '/cuisine.html'));
});

app.get('/bg/complete-guide.html', function (req, res){
    res.sendFile(path.join(__dirname + '/bg' + '/complete-guide.html'));
});

app.get('/en/complete-guide.html', function (req, res){
    res.sendFile(path.join(__dirname + '/en' + '/complete-guide.html'));
});

app.get('/bg/bar&nightlife.html', function (req, res){
    res.sendFile(path.join(__dirname + '/bg' + '/bar&nightlife.html'));
});

app.get('/en/bar&nightlife.html', function (req, res){
    res.sendFile(path.join(__dirname + '/en' + '/bar&nightlife.html'));
});

// Dynamic route for 'apartment-1.html' to 'apartment-9.html'
app.get('/bg/apartment-:id.html', function (req, res) {
    const apartmentId = req.params.id;

    // Ensure 'id' is a number between 1 and 9 to prevent invalid access
    if (apartmentId >= 1 && apartmentId <= 9) {
        res.sendFile(path.join(__dirname,  '/bg', `apartment-${apartmentId}.html`));
    } else {
        res.status(404).send('Apartment not found');
    }
});

app.get('/en/apartment-:id.html', function (req, res) {
    const apartmentId = req.params.id;

    // Ensure 'id' is a number between 1 and 9 to prevent invalid access
    if (apartmentId >= 1 && apartmentId <= 9) {
        res.sendFile(path.join(__dirname, '/en', `apartment-${apartmentId}.html`));
    } else {
        res.status(404).send('Apartment not found');
    }
});

// Start the server
app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});
