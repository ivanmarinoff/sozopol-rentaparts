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
                    "static/js/bootstrap.min.js",
                    "static/js/jquery.singlePageNav.min.js",
                    "static/js/typed.js",
                    "static/js/wow.min.js",
                    "static/js/custom.js",
                    "static/js/body_tagscript.js",
                    "static/js/cookieinfo.min.js",
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
                    "static/js/bootstrap.min.js",
                    "static/js/jquery.singlePageNav.min.js",
                    "static/js/typed.js",
                    "static/js/wow.min.js",
                    "static/js/custom.js",
                    "static/js/cookieinfo.min.js",
                    "static/js/body_tagscript.js",
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


// Set up your index route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/properties.html', function (req, res){
    res.sendFile(path.join(__dirname + '/properties.html'));
});

app.get('/property-details.html', function (req, res){
    res.sendFile(path.join(__dirname + '/property-details.html'));
});

app.get('/contact.html', function (req, res){
    res.sendFile(path.join(__dirname + '/contact.html'));
});
app.get('/food&drink.html', function (req, res){
    res.sendFile(path.join(__dirname + '/food&drink.html'));
});
app.get('/traveling.html', function (req, res){
    res.sendFile(path.join(__dirname + '/traveling.html'));
});

// Dynamic route for 'apartment-1.html' to 'apartment-9.html'
app.get('/apartment-:id.html', function (req, res) {
    const apartmentId = req.params.id;

    // Ensure 'id' is a number between 1 and 9 to prevent invalid access
    if (apartmentId >= 1 && apartmentId <= 9) {
        res.sendFile(path.join(__dirname, `apartment-${apartmentId}.html`));
    } else {
        res.status(404).send('Apartment not found');
    }
});

// Start the server
app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});
