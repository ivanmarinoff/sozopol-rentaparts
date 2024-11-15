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
    }

} else {
    // If device type is already stored, do nothing or use it for other logic
    console.log(`Device type already determined: ${deviceType}`);
}




const st = {};

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Safely query and store elements
    st.flap = document.querySelector('#flap');
    st.toggle = document.querySelector('.toggle');
    st.choice1 = document.querySelector('#choice1');
    st.choice2 = document.querySelector('#choice2');

    // Check if the required elements exist before proceeding
    if (!st.flap || !st.toggle || !st.choice1 || !st.choice2) {
//        console.error('Error: Required elements are missing from the DOM.');
        return; // Stop execution if elements are missing
    }

    // Add event listener for flap transition
    st.flap.addEventListener('transitionend', () => {
    // Flip the toggle regardless of the current choice
    if (st.choice1.checked) {
        st.toggle.style.transform = 'rotateY(15deg)'; // Clockwise rotation
    } else {
        st.toggle.style.transform = 'rotateY(-15deg)'; // Counterclockwise rotation
    }

    // Reset the transformation after 400ms
    setTimeout(() => {
        st.toggle.style.transform = '';
    }, 400);
});

// Add a click listener to toggle the choice regardless of the current state
st.toggle.addEventListener('click', () => {
    if (st.choice1.checked) {
        // Switch to choice2
        st.choice2.checked = true;
        st.flap.children[0].textContent = st.choice2.nextElementSibling.textContent;
    } else {
        // Switch to choice1
        st.choice1.checked = true;
        st.flap.children[0].textContent = st.choice1.nextElementSibling.textContent;
    }

    // Manually trigger the transitionend logic for the flip
//    st.flap.dispatchEvent(new Event('transitionend'));
});


    // Handle clicks on labels
    st.clickHandler = (e) => {
        if (e.target.tagName === 'LABEL') {
            setTimeout(() => {
                st.flap.children[0].textContent = e.target.textContent;
            }, 250);

            // Trigger the corresponding radio button
            const associatedInput = document.querySelector(`#${e.target.htmlFor}`);
            if (associatedInput) {
                associatedInput.checked = true;
            }
        }
    };

    // Initialize flap text content to choice2's label text
    st.flap.children[0].textContent = st.choice2.nextElementSibling.textContent;

    // Add a global click event listener
    document.addEventListener('click', (e) => st.clickHandler(e));
});
