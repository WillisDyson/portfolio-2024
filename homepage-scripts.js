const skillCards = document.querySelector(".skills__wrap");
const allSkillCards = document.querySelectorAll(".skill-card");
const careerGrid = document.querySelector(".career-grid");
const workGrid = document.querySelector(".work-grid");
const allWorkItems = document.querySelectorAll(".work-item");
const socialGrid = document.querySelector(".socials-grid");
const allSocialItems = document.querySelectorAll(".social-item");
const certsGrid = document.querySelector(".certifs__inner-wrap");
const allCerts = document.querySelectorAll(".certif");


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

const certsAnimCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("is intersecting");
            animateCerts();
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
const certsObserver = new IntersectionObserver(certsAnimCallback, skillsOpts);
const careerObserver = new IntersectionObserver(careerAnimCallback, careerOpts);
const workObserver = new IntersectionObserver(workAnimCallback, careerOpts);
const socialObserver = new IntersectionObserver(socialAnimCallback, skillsOpts);

skillObserver.observe(skillCards);
certsObserver.observe(certsGrid);
careerObserver.observe(careerGrid);
workObserver.observe(workGrid);
socialObserver.observe(socialGrid);

function animateCards() {
    for (let i = 0; i < allSkillCards.length; i++) {
        allSkillCards[i].classList.add("skill-card--animate");
    }
}

function animateCerts() {
    console.log("animateCerts function running");
    for (let i = 0; i < allCerts.length; i++) {
        allCerts[i].classList.add("certif--animate");
        console.log("looping and adding classes");
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
                    }
                } else {
                    let indexToRemove = visibleSections.indexOf(sectionName);
                    if (indexToRemove !== -1) {
                        visibleSections.splice(indexToRemove, 1);
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
        console.log("observer set up for: " + sections[i]);
    }

    document.addEventListener("scroll", setNavHighlights);

    function setNavHighlights() {


        if (visibleSections.length === 3) {
            lastVisibleSection = visibleSections[visibleSections.length - 2];
        } else {
            lastVisibleSection = visibleSections[visibleSections.length - 1];
        }

        console.log(visibleSections);


        if (!navLinks[lastVisibleSection].classList.contains("nav__item--active")) {
            for (let i = 0; i < navLinks.length; i++) {
                navLinks[i].classList.remove("nav__item--active");
            }
            navLinks[lastVisibleSection].classList.add("nav__item--active");
        }
    }
});