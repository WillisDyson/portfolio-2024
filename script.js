document.addEventListener("DOMContentLoaded", makeElemsVisible);
const mainElems = document.body.children;

function makeElemsVisible() {


    for (let i = 0; i < mainElems.length; i++) {
        mainElems[i].classList.remove("hidden");
    }
}

let currentScrollPos = window.scrollY;
let newScrollPos;
let scrollTypeIs = "manual";
let visibleSections = [];
let timeoutIsActive = false;
let scrollTimeout;
let lastVisibleSection;
const navBar = document.querySelector(".nav");
const navLinks = document.querySelectorAll('.nav__item');
const sections = document.querySelectorAll('.section');
const allMoreInfoBtns = document.querySelectorAll(".career-info__more-info");
const allMoreInfoText = document.querySelectorAll(".career-info__more-info-text");
const navOpenBtn = document.querySelector(".nav__hamburger");
const navCloseBtn = document.querySelector(".nav__close");
const mobNavMenu = document.querySelector(".nav__wrap");

for (let i = 0; i < allMoreInfoBtns.length; i++) {
    allMoreInfoBtns[i].addEventListener("click", handleMoreInfoClick);
    allMoreInfoBtns[i].addEventListener("keyup", handleMoreInfoClick);
}

function initDropdowns() {
    for (let i = 0; i < allMoreInfoBtns.length; i++) {
        allMoreInfoText[i].classList.remove("career-info__more-info-text--hidden");
        allMoreInfoText[i].style.maxHeight = "unset";
        let thisElemHeight = allMoreInfoText[i].offsetHeight;
        allMoreInfoText[i].setAttribute("data-max-height", thisElemHeight);
        let newMaxHeight = allMoreInfoText[i].getAttribute("data-max-height");
        allMoreInfoText[i].style.maxHeight = newMaxHeight + "px";
        allMoreInfoText[i].classList.add("career-info__more-info-text--hidden");
    }
}

let previousWidth = window.innerWidth;

document.addEventListener("DOMContentLoaded", initDropdowns);
window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;

    /* Accordion max-heights will only be recalculated if thw width of the page is resized, not the height. */
    if (currentWidth !== previousWidth) {
        initDropdowns();
    }
    previousWidth = currentWidth;
});

function handleMoreInfoClick(e) {
    if (e.type === "keyup" && e.keyCode === 13 || e.type === "click") {
        const moreInfoText = this.parentElement.querySelector(".career-info__more-info-text");
        moreInfoText.classList.toggle("career-info__more-info-text--hidden");
        const isExpanded = moreInfoText.classList.contains("career-info__more-info-text--hidden") ? "false" : "true";
        this.setAttribute("aria-expanded", isExpanded);
    }
}

document.addEventListener("scroll", (e) => {
    toggleNav();
});

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", () => {
        clearTimeout(scrollTimeout);
        timeoutIsActive = false;
        scrollTypeIs = "auto";
        toggleNav();
    });
}

function handleAutoScroll() {
    scrollTypeIs = "manual";
    timeoutIsActive = false;
}

function toggleNav() {
    newScrollPos = window.scrollY;

    if (mobNavMenu.classList.contains("nav__wrap--retracted")) {
        if (scrollTypeIs === "manual") {
            if (newScrollPos >= 1000) {
                if (newScrollPos > currentScrollPos) {
                    document.querySelector(".nav").classList.add("nav__hidden");
                } else {
                    document.querySelector(".nav").classList.remove("nav__hidden");
                }
            } else {
                document.querySelector(".nav").classList.remove("nav__hidden");
            }

        } else if (scrollTypeIs !== "manual") {

            if (!timeoutIsActive) {
                timeoutIsActive = true;
                scrollTimeout = setTimeout(handleAutoScroll, "2000");
            }

        }
    }

    currentScrollPos = newScrollPos;
}


navOpenBtn.addEventListener("click", toggleMobNavMenu);
navCloseBtn.addEventListener("click", toggleMobNavMenu);

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", toggleMobNavMenu);
}

function toggleMobNavMenu() {
    document.body.classList.toggle("prevent-scrolling");
    mobNavMenu.classList.toggle("nav__wrap--retracted");
    document.querySelector(".nav").classList.remove("nav__hidden");
}


