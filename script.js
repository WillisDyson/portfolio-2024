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
console.log(skillCards);

const options = {
    root: null,
    rootMargin: '1px',
    threshold: 0.3,
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCards();
        }
    });
};

// Create an Intersection Observer instance with the callback and options
const observer = new IntersectionObserver(callback, options);

// Start observing the target element
observer.observe(skillCards);

const allSkillCards = document.querySelectorAll(".skill-card__wrap");

function animateCards() {
    for (let i = 0; i < allSkillCards.length; i++) {
        allSkillCards[i].classList.add("skill-card__wrap--animate");
    }
}