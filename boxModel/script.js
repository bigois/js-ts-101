// This function retrieves the padding-bottom value of the <body> element from its computed CSS styles
const getBodyPaddingFromCSS = () => {
    const bodyStyles = window.getComputedStyle(document.body);
    const paddingBottom = Number.parseFloat(bodyStyles.getPropertyValue("padding-bottom"));

    return paddingBottom;
}

// This function shows only the <p> elements that are fully visible within the viewport
const showOnlyVisibleElements = () => {
    const pElements = document.querySelectorAll("p");
    const maxWindowHeight = window.innerHeight - getBodyPaddingFromCSS();

    // Reset the display property of all <p> elements to "block" before checking their visibility
    pElements.forEach((pElement) => {
        pElement.style.display = "block";
    });

    // Loop through each <p> element
    pElements.forEach((pElement) => {
        // Get the coordinates of the <p> element relative to the viewport
        const elementCoordenates = pElement.getBoundingClientRect();

        // Check if the bottom of the element is greater than the maximum window height
        if (elementCoordenates.bottom > maxWindowHeight) {
            pElement.style.display = "none";
        } else {
            pElement.style.display = "block";
        }
    });
}

showOnlyVisibleElements();

// Add an event listener to the window resize event to call the function whenever the window is resized
window.addEventListener("resize", showOnlyVisibleElements);
