document.addEventListener("DOMContentLoaded", makeElemsVisible);
const mainElems = document.body.children;

function makeElemsVisible() {
    console.log("loaded");


    for (let i = 0; i < mainElems.length; i++) {
        mainElems[i].classList.remove("hidden");
    }
}

const navBar = document.querySelector(".nav");
let currentScrollPos = window.scrollY;
let newScrollPos;

document.addEventListener("scroll", toggleNav);

function toggleNav() {
    newScrollPos = window.scrollY;

    if (newScrollPos >= 1000) {
        if (newScrollPos > currentScrollPos) {
            document.querySelector(".nav").classList.add("nav__hidden");
        } else {
            document.querySelector(".nav").classList.remove("nav__hidden");
        }
    } else {
        document.querySelector(".nav").classList.remove("nav__hidden");
    }

    currentScrollPos = newScrollPos;
}


const skillCards = document.querySelector(".skill-cards");
const allSkillCards = document.querySelectorAll(".skill-card__wrap");
const careerGrid = document.querySelector(".career-grid");
const allCareerItems = careerGrid.children;
const workGrid = document.querySelector(".work-grid");
const allWorkItems = document.querySelectorAll(".work-item");
const socialGrid = document.querySelector(".socials-grid");
const allSocialItems = document.querySelectorAll(".social-item");


const skillsOpts = {
    root: null,
    rootMargin: '1px',
    threshold: 0.3,
};

const careerOpts = {
    root: null,
    rootMargin: '1px',
    threshold: 0.1,
};

const cardsAnimCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCards();
        }
    });
};

const careerAnimCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                animateCareerGrid();
            }
                , 200);
        }
    });
};

const workAnimCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateWorkGrid();
        }
    });
};

const socialAnimCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSocialGrid();
        }
    });
};

const skillObserver = new IntersectionObserver(cardsAnimCallback, skillsOpts);
const careerObserver = new IntersectionObserver(careerAnimCallback, careerOpts);
const workObserver = new IntersectionObserver(workAnimCallback, careerOpts);
const socialObserver = new IntersectionObserver(socialAnimCallback, skillsOpts);

skillObserver.observe(skillCards);
careerObserver.observe(careerGrid);
workObserver.observe(workGrid);
socialObserver.observe(socialGrid);

function animateCards() {
    for (let i = 0; i < allSkillCards.length; i++) {
        allSkillCards[i].classList.add("skill-card__wrap--animate");
    }
}

function animateCareerGrid() {
    for (let i = 0; i < careerGrid.children.length; i++) {
        careerGrid.children[i].classList.add("career-grid--animate");
    }
}

function animateWorkGrid() {
    for (let i = 0; i < allWorkItems.length; i++) {
        allWorkItems[i].classList.add("work-item--animate");
    }
}

function animateSocialGrid() {
    for (let i = 0; i < allSocialItems.length; i++) {
        allSocialItems[i].classList.add("social-item--animate");
    }
}








let navLinks = document.querySelectorAll('.nav__item');
let sections = document.querySelectorAll('.section');
let visibleSections = [];


const sectionOpts = {
    root: null,
    rootMargin: '1px',
    threshold: 0,
};

document.addEventListener("DOMContentLoaded", (event) => {
    const sectionOpts = {
        root: null,
        rootMargin: '1px',
        threshold: 0.2,
    };

    let visibleSections = [];

    function createSectionCallback(sectionName) {
        return function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!visibleSections.includes(sectionName)) {
                        visibleSections.push(sectionName);
                        console.log(sectionName + " is visible");
                    }
                } else {
                    let indexToRemove = visibleSections.indexOf(sectionName);
                    if (indexToRemove !== -1) {
                        visibleSections.splice(indexToRemove, 1);
                        console.log(sectionName + " is no longer visible");
                    }
                }

                // Sort the array in numerical order
                visibleSections.sort((a, b) => a - b);
            });
        };
    }

    const sectionCallbacks = {};

    for (let i = 0; i < sections.length; i++) {
        const sectionName = i;
        const sectionObserver = new IntersectionObserver(createSectionCallback(sectionName), sectionOpts);
        sectionCallbacks[sectionName] = createSectionCallback(sectionName);
        sectionObserver.observe(sections[i]);
    }

    document.addEventListener("scroll", setNavHighlights);

    function setNavHighlights() {
        let lastVisibleSection = visibleSections[visibleSections.length - 1];

        if (!navLinks[lastVisibleSection].classList.contains("nav__item--active")) {
            for (let i = 0; i < navLinks.length; i++) {
                navLinks[i].classList.remove("nav__item--active");
            }
            navLinks[lastVisibleSection].classList.add("nav__item--active");
        }

        console.log(visibleSections);
    }
});





