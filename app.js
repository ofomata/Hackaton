const button = document.getElementById("nav-menu");
const menu = document.querySelector(".menu");

// Toggle menu visibility when button is clicked
button.addEventListener("click", (event) => {
    toggleMenu();
    event.stopPropagation(); // Prevent the click event from reaching the document
});

// Close the menu when a click is detected outside the menu
document.addEventListener("click", () => {
    if (menu.style.display === "block") {
        menu.style.display = "none";
    }
});

// Function to toggle menu visibility
function toggleMenu() {
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}



function toggleSVG(buttonId) {
    const svgContainer = document.querySelector('.actions:nth-child(' + buttonId + ') .svg-container');
    const initialSvg = svgContainer.querySelector('.initial-svg');

    if (svgContainer.classList.contains('clicked')) {
        svgContainer.classList.remove('clicked');
    } else {
        svgContainer.classList.add('active');
        initialSvg.style.display = 'none'; // Set display to 'none' on the first click
        svgContainer.addEventListener('animationend', function () {
            svgContainer.classList.remove('active');
            svgContainer.classList.add('clicked');
            initialSvg.style.display = ''; // Remove the display property on the second click
        }, { once: true });
    }
}

const notify = document.getElementById("notification");
const alert = document.querySelector(".alert");

// Toggle alert visibility when notify is clicked
notify.addEventListener("click", (event) => {
    toggleAlert();
    event.stopPropagation(); // Prevent the click event from reaching the document
});

// Close the alert when a click is detected outside the alert
document.addEventListener("click", () => {
    if (alert.style.display === "block") {
        alert.style.display = "none";
    }
});

// Function to toggle alert visibility
function toggleAlert() {
    if (alert.style.display === "block") {
        alert.style.display = "none";
    } else {
        alert.style.display = "block";
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.getElementById("progressBar");
    const updateText = document.getElementById("updateText");
    const toggleButtons = document.querySelectorAll(".toggleButton");

    let progress = 0;
    let buttonActions = [];

    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
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

    function updateProgressBar() {
        progressBar.style.width = `${progress}%`;
        // Save button actions to local storage
        localStorage.setItem("buttonActions", JSON.stringify(buttonActions));
    }

    function updateCompletionText() {
        const completionFraction = progress / 20; // Assuming each button increments by 20
        updateText.textContent = `${completionFraction} / 5 completed`;
    }
});





function toggleSection(section, action) {
    if (section.style.display === "flex") {
        // Section is already open, do nothing
        return;
    }

    // Close all sections
    closeAllSections();

    // Open the clicked section
    section.style.display = "flex";
    action.style.background = "#F7F7F7";
}

function closeAllSections() {
    const allSections = [details, detail, info, details4, details5];
    const allActions = [changeColor, changeColors, colors, changeColor4, changeColor5];

    for (let i = 0; i < allSections.length; i++) {
        allSections[i].style.display = "none";
        allActions[i].style.background = "";
    }
}

const openSetUp = document.getElementById("open");
const details = document.querySelector(".section1");
const changeColor = document.querySelector(".actions");

openSetUp.addEventListener("click", (event) => {
    toggleSection(details, changeColor);
});

const openSet = document.getElementById("open1");
const detail = document.querySelector(".section2");
const changeColors = document.querySelector(".actions2");

openSet.addEventListener("click", (event) => {
    toggleSection(detail, changeColors);
});

const openBtn = document.getElementById("open2");
const info = document.querySelector(".section3");
const colors = document.querySelector(".actions3");

openBtn.addEventListener("click", (event) => {
    toggleSection(info, colors);
});

const openSetUp4 = document.getElementById("open3");
const details4 = document.querySelector(".section4");
const changeColor4 = document.querySelector(".actions4");

openSetUp4.addEventListener("click", (event) => {
    toggleSection(details4, changeColor4);
});

const openSetUp5 = document.getElementById("open4");
const details5 = document.querySelector(".section5");
const changeColor5 = document.querySelector(".actions5");

openSetUp5.addEventListener("click", (event) => {
    toggleSection(details5, changeColor5);
});


//To remove the trial caallout

const close = document.querySelector(".close");
const hero = document.querySelector(".hero");

close.addEventListener("click", (event) => {
    hero.remove();
});


//To close and open the card

const dropDown = document.querySelector(".dropdown");
const bringUp = document.querySelector(".dropdown1");
const section = document.querySelector(".wrapper");

dropDown.addEventListener("click", (event) => {
    section.style.display = "none";
    dropDown.style.display = "none"
    bringUp.style.display = "block"
});

bringUp.addEventListener("click", (event) => {
    section.style.display = "block";
    dropDown.style.display = "block"
    bringUp.style.display = "none"
});




















