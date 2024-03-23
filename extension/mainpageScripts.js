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
var inner_width = $('body').innerWidth();
$(window).resize(function() {
  inner_width = $('body').innerWidth();
});
/* Carousel JS (Find a way to integrate into load button above)*/
const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentIndex = 0;


/*Initial Email Summary Slide*/
addSlide();

/*Next Email Function*/
function slideNext() {

  currentIndex++;
  addSlide();
  updateSlide();
}

/*Previous Email Function*/
function slidePrev() {
  currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
  updateSlide();
}

/*moves/updates carousel*/
function updateSlide() {
  // const slideWidth = carousel.children[0].offsetWidth;
  // carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  const offset = -currentIndex * inner_width; //This is weird as fuck gotta change later, left movement too big right move ment too small
  carousel.style.transform = `translateX(${offset}%)`;

}

// Function to add a new slide
function addSlide() {
  const slide = document.createElement('div');
  slide.classList.add('slide');
  slide.textContent = 'New Email Slide ' + (currentIndex + 1);
  
  carousel.appendChild(slide);
}

/* When Button is clicked run function  s respectively*/
nextButton.addEventListener('click', slideNext);
prevButton.addEventListener('click', slidePrev);

