// This function will be called when the Load Summaries button is clicked
function loadSummaries() {
  console.log('summaries...');
}

// This function simulates fetching email summaries, replace with your actual data fetching logic
// function fetchEmailSummaries() {}

// This function handles the display of email summaries on the page
// function displayEmailSummaries(summaries) {}

// Event listener for DOMContentLoaded to ensure the DOM is fully loaded before trying to access elements
document.addEventListener('DOMContentLoaded', (event) => {
  // Get the button by its ID and add an event listener
  var loadButton = document.getElementById('loadButton');
  if(loadButton) {
    loadButton.addEventListener('click', loadSummaries);
  }else{
    console.error('loadButton not found')
  }
});

/* Carousel JS (Find a way to integrate into load button above)*/
const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentIndex = 0;

function slideNext() {
  currentIndex = (currentIndex + 1) % carousel.children.length;
  updateSlide();
}

function slidePrev() {
  currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
  updateSlide();
}

function updateSlide() {
  const slideWidth = carousel.children[0].offsetWidth;
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextButton.addEventListener('click', slideNext);
prevButton.addEventListener('click', slidePrev);

