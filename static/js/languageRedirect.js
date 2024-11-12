// Set the language preference
function setLanguage(language) {
    localStorage.setItem('language', language);
}

// Redirect based on the stored language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const currentPath = window.location.pathname;

    if (savedLanguage === 'bg' && !currentPath.startsWith('/bg')) {
        window.location.href = '/bg';
    } else if (savedLanguage === 'en' && !currentPath.startsWith('/en')) {
        window.location.href = '/en';
    }
});
