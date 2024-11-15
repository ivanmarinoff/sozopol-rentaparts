function isMobileDevice() {
    return window.matchMedia("(max-width: 768px)").matches;
}

// Check if the device type has already been determined in this session
const deviceType = sessionStorage.getItem('deviceType');

if (!deviceType) {
    // If not yet determined, evaluate and store the result
    const isMobile = isMobileDevice();
    sessionStorage.setItem('deviceType', isMobile ? 'mobile' : 'desktop');

    // Redirect based on device type
    if (isMobile) {
        window.location.href = '/lang'; // Mobile-specific page
    } else {
        window.location.href = '/bg'; // Desktop-specific page
    } else {
        window.location.href = '/en';
    }

} else {
    // If device type is already stored, do nothing or use it for other logic
    console.log(`Device type already determined: ${deviceType}`);
}




const st = {};

st.flap = document.querySelector('#flap');
st.toggle = document.querySelector('.toggle');

st.choice1 = document.querySelector('#choice1');
st.choice2 = document.querySelector('#choice2');

st.flap.addEventListener('transitionend', () => {

    if (st.choice1.checked) {
        st.toggle.style.transform = 'rotateY(-15deg)';
        setTimeout(() => st.toggle.style.transform = '', 400);
    } else {
        st.toggle.style.transform = 'rotateY(15deg)';
        setTimeout(() => st.toggle.style.transform = '', 400);
    }

})

st.clickHandler = (e) => {

    if (e.target.tagName === 'LABEL') {
        setTimeout(() => {
            st.flap.children[0].textContent = e.target.textContent;
        }, 250);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    st.flap.children[0].textContent = st.choice2.nextElementSibling.textContent;
});

document.addEventListener('click', (e) => st.clickHandler(e));