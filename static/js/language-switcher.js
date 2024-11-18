//// Function to get the language parameter from the URL
//function getLanguage() {
//    const params = new URLSearchParams(window.location.search);
//    return params.get('lang') || 'bg'; // Default to 'bg' if no parameter is present
//}
//
//// Function to load and apply translations
//async function loadLanguageContent(language) {
//    try {
//        const response = await fetch('en.json'); // Load the respective language file
//        if (!response.ok) throw new Error("Language file not found");
//        const fallbackResponse = await fetch(`en.json`);
//        const translations = await response.json();
//        return response.json();
//
//        const metaTitleElement = document.querySelector('.meta-title');
//        if (metaTitleElement) {
//            metaTitleElement.textContent = translations.title;
//        }
//
//        const homeNavElement = document.querySelector('.nav .home');
//        if (homeNavElement) {
//            homeNavElement.textContent = translations.nav.home;
//        }
//
//        const metaDescriptionElement = document.querySelector('.meta-description');
//        if (metaDescriptionElement) {
//            metaDescriptionElement.textContent = translations.description;
//        }
//
//        // Update text content dynamically
//
//        //Home
//        document.querySelector('.nav .active').textContent = translations.nav.home;
//        document.querySelector('.nav [href="/properties.html"]').textContent = translations.nav.apartments;
//        document.querySelector('.nav [href="/property-details.html"]').textContent = translations.nav.details;
//        document.querySelector('.nav [href="/contact.html"]').textContent = translations.nav.contact;
//
//
//        // Sub-header
//        document.querySelector('.sub-header .email').textContent = translations.subHeader.email;
//        document.querySelector('.sub-header .address').textContent = translations.subHeader.address;
//
//        // Navigation
//        document.querySelector('.nav .home').textContent = translations.nav.home;
//        document.querySelector('.nav .apartments').textContent = translations.nav.apartments;
//        document.querySelector('.nav .details').textContent = translations.nav.details;
//        document.querySelector('.nav .contact').textContent = translations.nav.contact;
//        document.querySelector('.nav .schedule').textContent = translations.nav.schedule;
//
//        // Additional sections...
//        // main-banner.
//        document.querySelector('.main-banner .category').textContent = translations.mainBanner.category;
//        document.querySelector('.main-banner .headline').textContent = translations.mainBanner.headline;
////
//        // featured-section
//        document.querySelector('.featured-section .title').textContent = translations.featuredSection.title;
//        document.querySelector('.featured-section .headline').textContent = translations.featuredSection.headline;
//        document.querySelector('.featured-section .accordion .title').textContent = translations.featuredSection.title;
//        document.querySelector('.featured-section .accordion .content').textContent = translations.featuredSection.content;
//        document.querySelector('.featured-section .accordion .info').textContent = translations.featuredSection.accordion.info;
//        document.querySelector('.featured-section .accordion .info .title').textContent = translations.featuredSection.accordion.schedule;
//        document.querySelector('.featured-section .accordion .info .subtitle').textContent = translations.featuredSection.accordion.schedule;
//
//        // properties-section
//        document.querySelector('.properties-section .title').textContent = translations.propertiesSection.title;
//        document.querySelector('.properties-section .headline').textContent = translations.propertiesSection.headline;
//        document.querySelector('.properties-section .properties .imageAlt').textContent = translations.propertiesSection.properties.imageAlt;
//        document.querySelector('.properties-section .properties .category').textContent = translations.propertiesSection.properties.category;
//        document.querySelector('.properties-section .properties .title').textContent = translations.propertiesSection.properties.title;
//        document.querySelector('.properties-section .properties .description').textContent = translations.propertiesSection.properties.description;
//        // contact-section
//        document.querySelector('.contact-section .title').textContent = translations.contactSection.title;
//        document.querySelector('.contact-section .headline').textContent = translations.contactSection.headline;
//        document.querySelector('.contact-section .form .name').textContent = translations.contactSection.form.name;
//        document.querySelector('.contact-section .form .email').textContent = translations.contactSection.form.email;
//        document.querySelector('.contact-section .form .subject').textContent = translations.contactSection.form.subject;
//        document.querySelector('.contact-section .form .message').textContent = translations.contactSection.form.message;
//        document.querySelector('.contact-section .form .submit').textContent = translations.contactSection.form.submit;
//        // footer
//        document.querySelector('.footer .copyright').textContent = translations.footer.copyright;
//        document.querySelector('.footer .design').textContent = translations.footer.design;
//
//
//    } catch (error) {
//        console.error("Error loading language content:", error);
//    }
//}
//
//// Function to handle language switching
//function switchLanguage(language) {
//    const currentUrl = new URL(window.location.href);
//    currentUrl.searchParams.set('lang', language); // Update the lang parameter
//    history.pushState({}, '', currentUrl); // Update the URL without reloading the page
//
//    // Reload translations for the selected language
//    loadLanguageContent(language);
//}
//
//document.addEventListener('DOMContentLoaded', () => {
//    const language = getLanguage();
//    loadLanguageContent(language);
//});
//document.querySelectorAll('.social-links a[data-lang]').forEach(link => {
//    link.addEventListener('click', (e) => {
//        e.preventDefault(); // Prevent the default link behavior
//
//        // Get the language from the clicked element
//        const selectedLanguage = e.currentTarget.getAttribute('data-lang');
//
//        if (selectedLanguage) {
//            switchLanguage(selectedLanguage); // Switch the language
//        } else {
//            console.error("Language not defined in data-lang attribute!");
//        }
//    });
//});
//// Attach click handlers to language switch links
//
//
//// Load the language based on the URL parameter
//const language = getLanguage();
//loadLanguageContent(language);

// Function to get the language parameter from the URL
function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'bg'; // Default to 'bg' if no parameter is present
}

// Function to load and apply translations
async function loadLanguageContent(language) {
    try {
        // Attempt to fetch the language file
        let translations = {};
        const response = await fetch(`${language}.json`);

        if (response.ok) {
            translations = await response.json();
        } else {
            console.warn(`Language file '${language}.json' not found. Falling back to default translations.`);
        }

        // Merge fetched translations with default translations
        const finalTranslations = { ...defaultTranslations, ...translations };

        // Helper function to set text content
        const setText = (selector, text) => {
            const element = document.querySelector(selector);
            if (element) element.textContent = text || ''; // Default to empty string if text is undefined
        };

        // Apply translations
        setText('.meta-title', finalTranslations.title);
        setText('.meta-description', finalTranslations.meta?.ogDescription);

        setText('.nav .home', finalTranslations.nav?.home);
        setText('.nav [href="/properties.html"]', finalTranslations.nav?.apartments);
        setText('.nav [href="/property-details.html"]', finalTranslations.nav?.details);
        setText('.nav [href="/contact.html"]', finalTranslations.nav?.contact);

        setText('.sub-header .email', finalTranslations.subHeader?.email);
        setText('.sub-header .address', finalTranslations.subHeader?.address);

        setText('.main-banner .category', finalTranslations.mainBanner?.[0]?.category);
        setText('.main-banner .headline', finalTranslations.mainBanner?.[0]?.headline);

        setText('.featured-section .title', finalTranslations.featuredSection?.title);
        setText('.featured-section .headline', finalTranslations.featuredSection?.headline);

        setText('.properties-section .title', finalTranslations.propertiesSection?.title);
        setText('.properties-section .headline', finalTranslations.propertiesSection?.headline);

        setText('.contact-section .title', finalTranslations.contactSection?.title);
        setText('.contact-section .headline', finalTranslations.contactSection?.headline);

        setText('.footer .copyright', finalTranslations.footer?.copyright);
        setText('.footer .design', finalTranslations.footer?.design);

    } catch (error) {
        console.error("Error loading language content:", error);
        console.warn("Using default translations due to an error.");

        // If an error occurs, apply only default translations
        applyDefaultTranslations();
    }
}

// Apply default translations if needed
function applyDefaultTranslations() {
    const setText = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = text || '';
    };

    setText('.meta-title', defaultTranslations.title);
    setText('.meta-description', defaultTranslations.meta?.ogDescription);

    setText('.nav .home', defaultTranslations.nav?.home);
    setText('.nav [href="/properties.html"]', defaultTranslations.nav?.apartments);
    setText('.nav [href="/property-details.html"]', defaultTranslations.nav?.details);
    setText('.nav [href="/contact.html"]', defaultTranslations.nav?.contact);

    setText('.sub-header .email', defaultTranslations.subHeader?.email);
    setText('.sub-header .address', defaultTranslations.subHeader?.address);

    setText('.main-banner .category', defaultTranslations.mainBanner?.[0]?.category);
    setText('.main-banner .headline', defaultTranslations.mainBanner?.[0]?.headline);

    setText('.featured-section .title', defaultTranslations.featuredSection?.title);
    setText('.featured-section .headline', defaultTranslations.featuredSection?.headline);

    setText('.properties-section .title', defaultTranslations.propertiesSection?.title);
    setText('.properties-section .headline', defaultTranslations.propertiesSection?.headline);

    setText('.contact-section .title', defaultTranslations.contactSection?.title);
    setText('.contact-section .headline', defaultTranslations.contactSection?.headline);

    setText('.footer .copyright', defaultTranslations.footer?.copyright);
    setText('.footer .design', defaultTranslations.footer?.design);
} catch (error) {
        console.error("Error loading language content:", error);
    }
}

// Function to handle language switching
function switchLanguage(language) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lang', language); // Update the lang parameter
    history.pushState({}, '', currentUrl); // Update the URL without reloading the page

    // Reload translations for the selected language
    loadLanguageContent(language);
}

// Attach event listeners to language switcher buttons
document.querySelectorAll('.social-links a[data-lang]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link behavior

        const selectedLanguage = e.currentTarget.getAttribute('data-lang');
        if (selectedLanguage) {
            switchLanguage(selectedLanguage); // Switch the language
        } else {
            console.error("Language not defined in data-lang attribute!");
        }
    });
});

// Load language on page load
document.addEventListener('DOMContentLoaded', () => {
    const language = getLanguage();
    loadLanguageContent(language);
});
