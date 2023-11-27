

/**
 * Responsive Navigation Menu with Keyboard Accessibility
 *
 * This JavaScript code handles the functionality of a responsive navigation menu.
 * It supports toggling the menu on button click, opening/closing on Enter/Escape keys,
 * and keyboard navigation within the menu using arrow keys. The code also ensures
 * proper accessibility with ARIA attributes and focuses on the first element when
 * the menu is opened.
 */


// Get the button and menu elements from the DOM
const button = document.getElementById("nav-menu");
const menu = document.querySelector(".menu");

// Add a click event listener to the button
button.addEventListener("click", (event) => {
    // Toggle the menu when the button is clicked
    toggleMenu();

    // // Additional logic (if any) - for example, close any open menu (This alert variable is defined somewhere else)
    alert.style.display = "none";
});

// Add a keydown event listener to the entire document
document.addEventListener("keydown", (event) => {
    // Check if the 'Escape' key is pressed and the menu is open, then close the menu
    if (event.key === "Escape" && menu.style.display === "block") {
        closeMenu();
    }
    // Check if the 'Enter' key is pressed on the button and the menu is closed, then open the menu
    else if (event.key === "Enter" && document.activeElement === button && menu.style.display !== "block") {
        openMenu();
        alert.style.display = "none";
    }
    // Check if the menu is open and the arrow keys are pressed, then navigate the menu
    else if (menu.style.display === "block" && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        navigateMenu(event);
    }
});

// Function to toggle the menu between open and closed states
function toggleMenu() {
    if (menu.style.display === "block") {
        closeMenu();
    } else {
        openMenu();
    }
}

// Function to open the menu
function openMenu() {
    // Set the menu to be visible
    menu.style.display = "block";
    // Update the button's aria-expanded attribute to indicate an open menu
    button.setAttribute("aria-expanded", "true");

    // Focus on the first focusable element within the menu
    const firstFocusableElement = menu.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
}

// Function to close the menu
function closeMenu() {
    // Set the menu to be hidden
    menu.style.display = "none";
    // Update the button's aria-expanded attribute to indicate a closed menu
    button.setAttribute("aria-expanded", "false");
}

// Function to navigate the menu using arrow keys
function navigateMenu(event) {
    // Get all focusable elements within the menu
    const focusableElements = menu.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    // Get the currently focused element
    const focusedElement = document.activeElement;

    // Find the index of the focused element within the array of focusable elements
    let index = Array.from(focusableElements).indexOf(focusedElement);

    // If the focused element is found in the array, adjust the index based on the arrow key pressed
    if (index !== -1) {
        if (event.key === "ArrowUp" && index > 0) {
            index--;
        } else if (event.key === "ArrowDown" && index < focusableElements.length - 1) {
            index++;
        }
    }

    // Focus on the element at the updated index
    focusableElements[index].focus();
}







/**
 * Notification Menu
 *
 * This JavaScript code manages the behavior of a notification alert system.
 * It allows toggling the alert's visibility on notification click, and
 * supports keyboard interactions for opening/closing the alert using the
 * Enter key and Escape key. The code ensures proper accessibility by updating
 * ARIA attributes accordingly.
 */



// Get the notification and alert elements from the DOM
const notify = document.getElementById("notification");
const alert = document.querySelector(".alert");

// Add a click event listener to the notification
notify.addEventListener("click", (event) => {
  // Toggle the alert when the notification is clicked
  toggleAlert();

  // Additional logic (if any) - for example, close any open menu
  menu.style.display = "none";
});

// Add a keydown event listener to the entire document
document.addEventListener("keydown", (event) => {
  // Check if the 'Escape' key is pressed and the alert is open, then close the alert
  if (event.key === "Escape" && alert.style.display === "block") {
    closeAlert();
  }
  // Check if the 'Enter' key is pressed on the notification and the alert is closed, then open the alert
  else if (event.key === "Enter" && document.activeElement === notify && alert.style.display !== "block") {
    openAlert();
    menu.style.display = "none";
  }
});

// Function to toggle the alert between open and closed states
function toggleAlert() {
  if (alert.style.display === "block") {
    closeAlert();
  } else {
    openAlert();
  }
}

// Function to open the alert
function openAlert() {
  // Set the alert to be visible
  alert.style.display = "block";
  // Update the notification's aria-expanded attribute to indicate an open alert
  notify.setAttribute("aria-expanded", "true");
}

// Function to close the alert
function closeAlert() {
  // Set the alert to be hidden
  alert.style.display = "none";
  // Update the notification's aria-expanded attribute to indicate a closed alert
  notify.setAttribute("aria-expanded", "false");
}





/**
 * SVG Toggle Functionality For SetUp CheckBox/Completion
 *
 * This JavaScript function, toggleSVG, manages the dynamic behavior of SVG containers
 * in response to button interactions. It toggles the visual and accessibility states
 * of an SVG element based on a provided button ID (expected to be a number). The function
 * handles the changes in the 'aria-checked' attribute, 'aria-label', and visual appearance,
 * providing a smooth transition between different states on each invocation.
 *
 * @param {number} buttonId - The ID of the button triggering the SVG toggle.
 */



function toggleSVG(buttonId) {
    // Find the SVG container based on the buttonId
    const svgContainer = document.querySelector('.actions:nth-child(' + buttonId + ') .svg-container');
    
    // Find the initial SVG element within the container
    const initialSvg = svgContainer.querySelector('.initial-svg');

    // Toggle the checked state
    const isChecked = svgContainer.getAttribute('aria-checked') === 'true';
    svgContainer.setAttribute('aria-checked', isChecked ? 'false' : 'true');

    // Update the aria-label based on the checked state
    svgContainer.setAttribute('aria-label', isChecked ? 'Check Progress Incomplete' : 'Check Progress Complete');

    // Handle visual representation changes based on the clicked state
    if (svgContainer.classList.contains('clicked')) {
        // Reset the clicked state
        svgContainer.classList.remove('clicked');
    } else {
        // Set the active state for visual transition
        svgContainer.classList.add('active');
        
        // Hide the initial SVG on the first click
        initialSvg.style.display = 'none';

        // Listen for the end of the animation to reset the state
        svgContainer.addEventListener('animationend', function () {
            // Remove the active state and set the clicked state
            svgContainer.classList.remove('active');
            svgContainer.classList.add('clicked');
            
            // Show the initial SVG on the second click
            initialSvg.style.display = '';

        }, { once: true });
    }
}





/**
 * Progress Bar Functionality When A Checkbox is Toggled
 *
 * This JavaScript code manages a progress tracking system using toggle buttons.
 * It initializes DOM elements, tracks button clicks to update progress, and
 * displays the progress visually in a progress bar. The completion text is
 * also updated accordingly. Progress and button actions are stored locally
 * using localStorage, and progress is reset on each page load.
 */



// Execute the code once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const progressBar = document.getElementById("progressBar");
    const updateCount = document.getElementById("updateCount");
    const toggleButtons = document.querySelectorAll(".toggleButton");

    // Initialize variables to track progress and button actions
    let progress = 0;
    let buttonActions = [];

    // Attach click event listeners to each toggle button
    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Identify the index of the clicked button in the NodeList
            const buttonIndex = Array.from(toggleButtons).indexOf(button);

            // Check if the same button is clicked again
            if (buttonActions[buttonIndex]) {
                // Decrease the progress by the stored action
                progress -= buttonActions[buttonIndex];

                // Ensure the progress does not go below 0
                if (progress < 0) {
                    progress = 0;
                }

                // Reset the stored action for this button
                buttonActions[buttonIndex] = 0;
            } else {
                // Different button clicked, continue from the current progress
                // Increment the progress by 20
                progress += 20;

                // Ensure the progress does not exceed 100
                if (progress > 100) {
                    progress = 0; // Reset to 0 if it reaches 100
                }

                // Save the action for this button
                buttonActions[buttonIndex] = 20;
            }

            // Update the progress bar and completion text
            updateProgressBar();
            updateCompletionText();
        });
    });

    // Clear stored progress on every page load
    localStorage.removeItem("buttonActions");

    // Function to update the width of the progress bar and save button actions to local storage
    function updateProgressBar() {
        progressBar.style.width = `${progress}%`;
        localStorage.setItem("buttonActions", JSON.stringify(buttonActions));
    }

    // Function to update the completion text based on the current progress
    function updateCompletionText() {
        const completionFraction = progress / 20; // Assuming each button increments by 20
        updateCount.textContent = `${completionFraction} / 5 completed`;
    }
});




/**
 * Enter Key Interaction for CheckBox Toggle Buttons and Progress Bar
 *
 * This JavaScript code enhances user experience by allowing the use of the "Enter" key
 * to trigger a click event on focused buttons with the class "toggleButton". It listens
 * for keydown events on the document and simulates a button click when the "Enter" key is pressed.
 */


// Listen for keydown events on the entire document
document.addEventListener("keydown", function (event) {
    // Check if the pressed key is the "Enter" key
    if (event.key === "Enter") {
        // Find the currently focused element in the DOM
        const focusedElement = document.activeElement;

        // Check if the focused element exists and is a button with the class "toggleButton"
        if (focusedElement && focusedElement.classList.contains("toggleButton")) {
            // Trigger a click event on the focused button, effectively simulating a button press
            focusedElement.click();
        }
    }
});




/**
 * This Handles the Individual SetUp Sections
 *
 * This JavaScript code manages a set of buttons that toggle the visibility of
 * corresponding sections and perform associated actions. It includes functions
 * to initialize button behavior, toggle sections, close all sections, and retrieve
 * section and action elements based on selectors. The code is organized to enhance
 * modularity and ease of maintenance for handling multiple sections.
 * 
 * 
 * 
 *
 * This function initializes a button with a given ID to toggle the visibility
 * of a specific section and perform associated actions.
 * @param {string} buttonId - The ID of the button triggering the section toggle.
 * @param {string} sectionSelector - The selector for the section to toggle.
 * @param {string} actionSelector - The selector for the associated action element.
 */

function initializeSectionButton(buttonId, sectionSelector, actionSelector) {
    // Get the button, section, and action elements
    const triggerButton = document.getElementById(buttonId);
    const { section, action } = getSectionAndAction(sectionSelector, actionSelector);

    // Add a click event listener to the button to toggle the section
    triggerButton.addEventListener("click", () => {
        toggleSection(section, action);
    });
}

/**
 * Toggle Section
 *
 * This function hides all sections, then displays the specified section and
 * performs associated actions.
 *
 * @param {HTMLElement} section - The section element to toggle.
 * @param {HTMLElement} action - The associated action element.
 */

function toggleSection(section, action) {
    // Close all sections before opening the specified one
    closeAllSections();

    // Display the specified section and perform associated actions
    if (section.style.display !== "flex") {
        section.style.display = "flex";
        action.style.background = "#F7F7F7";
    }
}

/**
 * Close All Sections
 *
 * This function hides all sections and resets associated actions.
 */

function closeAllSections() {
    // Iterate through each section and close it
    sections.forEach(({ sectionSelector, actionSelector }) => {
        const { section, action } = getSectionAndAction(sectionSelector, actionSelector);

        section.style.display = "none";
        action.style.background = "";
    });
}

// Array containing section details (button ID, section selector, action selector)
const sections = [
    { buttonId: "open", sectionSelector: ".section1", actionSelector: ".actions" },
    { buttonId: "open1", sectionSelector: ".section2", actionSelector: ".actions2" },
    { buttonId: "open2", sectionSelector: ".section3", actionSelector: ".actions3" },
    { buttonId: "open3", sectionSelector: ".section4", actionSelector: ".actions4" },
    { buttonId: "open4", sectionSelector: ".section5", actionSelector: ".actions5" },
];

/**
 * Get Section and Action Elements
 *
 * This function retrieves the section and action elements based on their selectors.
 * @returns {Object} An object containing the section and action elements.
 */

function getSectionAndAction(sectionSelector, actionSelector) {
    const section = document.querySelector(sectionSelector);
    const action = document.querySelector(actionSelector);
    return { section, action };
}

// Initialize each section button with associated sections and actions
sections.forEach(({ buttonId, sectionSelector, actionSelector }) => {
    initializeSectionButton(buttonId, sectionSelector, actionSelector);
});

// Open the first section by default
const firstSection = document.querySelector(".section1");
const firstAction = document.querySelector(".actions");
toggleSection(firstSection, firstAction);




/**
 * Continue From Above When a SetUp is Checked, Move to the Next Section
 *
 * This JavaScript code facilitates the setup of buttons to toggle the visibility
 * of specific sections and their associated actions. Each button is configured with
 * its ID and corresponding target section and action, enhancing modularity and ease
 * of maintenance for handling various sections within a web page.
 * 
 * 
 * 
 * This function sets up a button with a given ID to toggle the visibility
 * of a specified section and associated action.
 * @param {string} buttonId - The ID of the button triggering the section toggle.
 * @param {string} targetSectionSelector - The selector for the target section to toggle.
 * @param {string} targetActionSelector - The selector for the target action associated with the section.
 */

function setupSectionButton(buttonId, targetSectionSelector, targetActionSelector) {
    // Get the button, target section, and target action elements
    const button = document.getElementById(buttonId);
    const targetSection = document.querySelector(targetSectionSelector);
    const targetAction = document.querySelector(targetActionSelector);

    // Add a click event listener to the button to toggle the target section
    button.addEventListener("click", () => {
        toggleSection(targetSection, targetAction);
    });
}

// Setup section buttons with their corresponding target sections and actions
setupSectionButton("storeSection", ".section2", ".actions2");
setupSectionButton("productSection", ".section3", ".actions3");
setupSectionButton("domainSection", ".section4", ".actions4");
setupSectionButton("nameSection", ".section5", ".actions5");
setupSectionButton("paymentSection", ".section1", ".actions1");






/**
 * To remove the trial caallout
 *
 * This JavaScript code handles the functionality to remove a main-hero element from the DOM.
 * It utilizes a close button with both click and keyboard interaction (Enter key) to
 * trigger the removal action. The code enhances accessibility and provides a clean and
 * modular approach to removing the main-hero element.
 */

// Get the close button and main-hero element from the DOM
const close = document.querySelector(".close");
const trialCallOut = document.querySelector(".main-hero");

// Add a click event listener to the close button
close.addEventListener("click", (event) => {
    // Call the function to remove the main-hero element
    removetrialCallOut();
});

// Add a keydown event listener to the close button
close.addEventListener("keydown", (event) => {
    // Check if the pressed key is the "Enter" key
    if (event.key === "Enter") {
        // Call the function to remove the main-hero element
        removetrialCallOut();
    }
});

// Function to remove the main-hero element from the DOM
function removetrialCallOut() {
    trialCallOut.remove();
}




/**
 * Functionality to Open and Close the Card When Toggled
 *
 * This JavaScript code manages the interaction between two dropdown elements and a section.
 * It toggles the visibility of the section and dropdowns based on click and Enter key events.
 * The code provides a user-friendly way to switch between dropdown options and display content.
 */



// Get DOM elements for dropdown interaction
const dropDown = document.querySelector(".dropdown");
const bringUp = document.querySelector(".dropdown1");
const section = document.querySelector(".wrapper");

// Add a click event listener to the dropdown
dropDown.addEventListener("click", (event) => {
    // Hide the section, dropdown, and display the alternative dropdown
    section.style.display = "none";
    dropDown.style.display = "none";
    bringUp.style.display = "block";
});

// Add a click event listener to the alternative dropdown
bringUp.addEventListener("click", (event) => {
    // Show the section, dropdown, and hide the alternative dropdown
    section.style.display = "block";
    dropDown.style.display = "block";
    bringUp.style.display = "none";
});

// Add a keydown event listener to the original dropdown
dropDown.addEventListener("keydown", (event) => {
    // Check if the pressed key is the "Enter" key
    if (event.key === "Enter") {
        // Hide the section, dropdown, and display the alternative dropdown
        section.style.display = "none";
        dropDown.style.display = "none";
        bringUp.style.display = "block";
    }
});

// Add a keydown event listener to the alternative dropdown
bringUp.addEventListener("keydown", (event) => {
    // Check if the pressed key is the "Enter" key
    if (event.key === "Enter") {
        // Show the section, dropdown, and hide the alternative dropdown
        section.style.display = "block";
        dropDown.style.display = "block";
        bringUp.style.display = "none";
    }
});






