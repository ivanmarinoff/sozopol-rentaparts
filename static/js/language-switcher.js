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
// Get the current language from the URL

function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'bg'; // Default to 'bg';
}

// Load and apply translations
async function loadLanguageContent(language) {
    if (language === 'en') {
        try {
            const response = await fetch(`/static/lang/${language}.json`);
            const translations = response.ok ? await response.json() : {};
            // const translations = await response.json();
            // Helper to update text content
            const setText = (selector, text) => {
                const element = document.querySelector(selector);
                if (element) element.textContent = text || '';
            };
            setText('title', translations.title);

            document.querySelector('meta[property="og:title"]')?.setAttribute('content', translations.meta?.ogTitle);
            document.querySelector('meta[property="og:description"]')?.setAttribute('content', translations.meta?.ogDescription);
            document.querySelector('meta[property="og:image"]')?.setAttribute('content', translations.meta?.ogImage);

            setText('.logo h1', translations.mainNav?.logoText);
            setText('.nav [href="/"]', translations.nav?.home);
            setText('.nav [href="/properties.html"]', translations.nav?.apartments);
            setText('.nav [href="/property-details.html"]', translations.nav?.details);
            setText('.nav [href="/contact.html"]', translations.nav?.contact);

            // Main Banner
            setText('.main-banner .item', translations.mainBanner?.item);
            setText('.main-banner .headline', translations.mainBanner?.headline);

            // Featured Section
            setText('.featured-section h6', translations.featuredSection?.title);
            setText('.featured-section h2', translations.featuredSection?.headline);

            const accordionItems = document.querySelectorAll('.featured-section .accordion-item');
            if (accordionItems.length > 0 && translations.featuredSection.accordion) {
                accordionItems.forEach((item, index) => {
                    const accordionTitle = item.querySelector('.accordion-header .accordion-button');
                    const accordionContent = item.querySelector('.accordion-body');

                    setText(accordionTitle, translations.featuredSection.accordion[index]?.title);
                    setText(accordionContent, translations.featuredSection.accordion[index]?.content);
                });
            }

            const infoItems = document.querySelectorAll('.featured-section .info-table ul li');
            if (infoItems.length > 0 && translations.featuredSection.info) {
                infoItems.forEach((item, index) => {
                    const title = item.querySelector('h4');
                    setText(title, translations.featuredSection.info[index]?.title);
                    setText(title?.querySelector('span'), translations.featuredSection.info[index]?.subtitle);
                });
            }

            // Properties Section
            setText('.properties-section h6', translations.propertiesSection?.title);
            setText('.properties-section h2', translations.propertiesSection?.headline);

            const propertyItems = document.querySelectorAll('.properties-section .item');
            if (propertyItems.length > 0 && translations.propertiesSection.properties) {
                propertyItems.forEach((item, index) => {
                    const category = item.querySelector('.category');
                    const title = item.querySelector('h4 a');
                    const description = item.querySelector('ul em');

                    setText(category, translations.propertiesSection.properties[index]?.category);
                    setText(title, translations.propertiesSection.properties[index]?.title);
                    setText(description, translations.propertiesSection.properties[index]?.description);
                });
            }

            // Contact Section
            setText('.contact-section h6', translations.contactSection?.title);
            setText('.contact-section h2', translations.contactSection?.headline);

            const mapPhone = document.querySelector('.contact-content .item.phone h6');
            const mapEmail = document.querySelector('.contact-content .item.email h6');

            if (mapPhone) {
                setText(mapPhone, translations.contactSection.map?.phone);
                setText(mapPhone?.querySelector('span'), translations.contactSection.map?.phoneLabel);
            }
            if (mapEmail) {
                setText(mapEmail, translations.contactSection.map?.email);
                setText(mapEmail?.querySelector('span'), translations.contactSection.map?.emailLabel);
            }

            const contactForm = translations.contactSection.form;
            if (contactForm) {
                setText('#contact-form label[for="name"]', contactForm.nameLabel);
                document.querySelector('#contact-form #name')?.setAttribute('placeholder', contactForm.namePlaceholder);

                setText('#contact-form label[for="email"]', contactForm.emailLabel);
                document.querySelector('#contact-form #email')?.setAttribute('placeholder', contactForm.emailPlaceholder);

                setText('#contact-form label[for="subject"]', contactForm.subjectLabel);
                document.querySelector('#contact-form #subject')?.setAttribute('placeholder', contactForm.subjectPlaceholder);

                setText('#contact-form label[for="message"]', contactForm.messageLabel);
                document.querySelector('#contact-form #message')?.setAttribute('placeholder', contactForm.messagePlaceholder);

                setText('#contact-form button', contactForm.buttonText);
            }

            // Footer
            setText('.footer .copyright', translations.footer?.copyright);
            setText('.footer .design', translations.footer?.designBy);


        } catch (error) {
            console.error("Error loading translations:", error);
        }
    }
}


// Change language and reload page
function switchLanguage(language) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lang', language);
    window.location.href = currentUrl.toString();
}

// Add event listeners for language switcher
document.addEventListener('DOMContentLoaded', () => {
    const language = getLanguage();
    loadLanguageContent(language);

    document.querySelectorAll('.social-links a[data-lang]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLanguage = e.currentTarget.getAttribute('data-lang');
            switchLanguage(selectedLanguage);
        });
    });
});

