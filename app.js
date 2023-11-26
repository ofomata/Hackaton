const button = document.getElementById("nav-menu");
const menu = document.querySelector(".menu");

button.addEventListener("click", (event) => {
    toggleMenu();

    alert.style.display = "none";
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.style.display === "block") {
        closeMenu();
    } else if (event.key === "Enter" && document.activeElement === button && menu.style.display !== "block") {
        openMenu();
    } else if (menu.style.display === "block" && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        navigateMenu(event);
    }
});

function toggleMenu() {
    if (menu.style.display === "block") {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    menu.style.display = "block";
    button.setAttribute("aria-expanded", "true");

    const firstFocusableElement = menu.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
}

function closeMenu() {
    menu.style.display = "none";
    button.setAttribute("aria-expanded", "false");
}

function navigateMenu(event) {
    const focusableElements = menu.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const focusedElement = document.activeElement;

    let index = Array.from(focusableElements).indexOf(focusedElement);

    if (index !== -1) {
        if (event.key === "ArrowUp" && index > 0) {
            index--;
        } else if (event.key === "ArrowDown" && index < focusableElements.length - 1) {
            index++;
        }
    }

    focusableElements[index].focus();
}





const notify = document.getElementById("notification");
const alert = document.querySelector(".alert");

notify.addEventListener("click", (event) => {
  toggleAlert();

  // Additional logic (if any)
  menu.style.display = "none";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && alert.style.display === "block") {
    closeAlert();
  } else if (event.key === "Enter" && document.activeElement === notify && alert.style.display !== "block") {
    openAlert();
  }
});

function toggleAlert() {
  if (alert.style.display === "block") {
    closeAlert();
  } else {
    openAlert();
  }
}

function openAlert() {
  alert.style.display = "block";
  notify.setAttribute("aria-expanded", "true");
}

function closeAlert() {
  alert.style.display = "none";
  notify.setAttribute("aria-expanded", "false");
}





function toggleSVG(buttonId) {
    const svgContainer = document.querySelector('.actions:nth-child(' + buttonId + ') .svg-container');
    const initialSvg = svgContainer.querySelector('.initial-svg');

        // Toggle the checked state
    const isChecked = svgContainer.getAttribute('aria-checked') === 'true';
    svgContainer.setAttribute('aria-checked', isChecked ? 'false' : 'true');

    // Update the aria-label based on the checked state
    svgContainer.setAttribute('aria-label', isChecked ? 'Check Progress Incomplete' : 'Check Progress Complete');

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





document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        // Find the focused element
        const focusedElement = document.activeElement;

        // Check if the focused element is a button with the class "toggleButton"
        if (focusedElement && focusedElement.classList.contains("toggleButton")) {
            // Trigger a click event on the focused button
            focusedElement.click();
        }
    }
});







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





function initializeSectionButton(buttonId, sectionSelector, actionSelector) {
    const triggerButton = document.getElementById(buttonId);
    const { section, action } = getSectionAndAction(sectionSelector, actionSelector);

    triggerButton.addEventListener("click", () => {
        toggleSection(section, action);
    });
}

function toggleSection(section, action) {
    closeAllSections();

    if (section.style.display !== "flex") {
        section.style.display = "flex";
        action.style.background = "#F7F7F7";
    }
}

function closeAllSections() {
    sections.forEach(({ sectionSelector, actionSelector }) => {
        const { section, action } = getSectionAndAction(sectionSelector, actionSelector);

        section.style.display = "none";
        action.style.background = "";
    });
}

const sections = [
    { buttonId: "open", sectionSelector: ".section1", actionSelector: ".actions" },
    { buttonId: "open1", sectionSelector: ".section2", actionSelector: ".actions2" },
    { buttonId: "open2", sectionSelector: ".section3", actionSelector: ".actions3" },
    { buttonId: "open3", sectionSelector: ".section4", actionSelector: ".actions4" },
    { buttonId: "open4", sectionSelector: ".section5", actionSelector: ".actions5" },
];

function getSectionAndAction(sectionSelector, actionSelector) {
    const section = document.querySelector(sectionSelector);
    const action = document.querySelector(actionSelector);
    return { section, action };
}

sections.forEach(({ buttonId, sectionSelector, actionSelector }) => {
    initializeSectionButton(buttonId, sectionSelector, actionSelector);
});


//To remove the trial caallout

const close = document.querySelector(".close");
const hero = document.querySelector(".hero");

close.addEventListener("click", (event) => {
    removeHero();
});

close.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        removeHero();
    }
});

function removeHero() {
    hero.remove();
}



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

dropDown.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        section.style.display = "none";
        dropDown.style.display = "none";
        bringUp.style.display = "block";
    }
});

bringUp.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        section.style.display = "block";
        dropDown.style.display = "block";
        bringUp.style.display = "none";
    }
});





function setupSectionButton(buttonId, targetSectionSelector, targetActionSelector) {
    const button = document.getElementById(buttonId);
    const targetSection = document.querySelector(targetSectionSelector);
    const targetAction = document.querySelector(targetActionSelector);

    button.addEventListener("click", () => {
        toggleSection(targetSection, targetAction);
    });
}

setupSectionButton("storeSection", ".section2", ".actions2");
setupSectionButton("productSection", ".section3", ".actions3");
setupSectionButton("domainSection", ".section4", ".actions4");
setupSectionButton("nameSection", ".section5", ".actions5");
setupSectionButton("paymentSection", ".section1", ".actions1");




function app() {

}












