import {EmailGetter} from './getEmails.js';
// This function will be called when the Load Summaries button is clicked
function loadSummaries() {
  console.log('summaries...');
}

// This function simulates fetching email summaries, replace with your actual
// data fetching logic function fetchEmailSummaries() {}

// This function handles the display of email summaries on the page
// function displayEmailSummaries(summaries) {}

// Event listener for DOMContentLoaded to ensure the DOM is fully loaded before
// trying to access elements
// document.addEventListener('DOMContentLoaded', (event) => {
//   var emailGetter = new EmailGetter();
//   // Get the button by its ID and add an event listener
//   var loadButton = document.getElementById('loadButton');
//   if (loadButton) {
//     loadButton.addEventListener('click', function() {
//       chrome.storage.local.get('token', function(result) {
//         emailGetter.getEmailList()
//       });
//     });

//   } else {
//     console.error('loadButton not found')
//   }
//   var nextEmailButton = document.getElementById('nextEmail');
//   if (nextEmailButton) {
//     nextEmailButton.addEventListener('click', function() {
//       emailGetter.getNextEmail()
//     });
//   }
// });

// The above is just testing for now
// Make a new button just for populating all email summaries

/* Carousel JS (Find a way to integrate into load button above)*/
const carousel = document.getElementById('carousel');
let currentIndex = 0;

/*Next Email Function*/
function slideNext(emaildata) {

  currentIndex++;
  addSlide(emaildata);
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

  const offset = -currentIndex * 100.57; //This is weird as fuck gotta change later, left movement too big right move ment too small
  carousel.style.transform = `translateX(${offset}%)`;
}

// Function to add a new slide
function addSlide(emaildata) {

  const slide = document.createElement('div');
  slide.classList.add('slide');
  slide.textContent = 'New Email Slide ' + (currentIndex + 1) + emaildata;
  
  carousel.appendChild(slide);
}

// Get Email Summaries function
document.addEventListener('DOMContentLoaded', (event) => {

  //Email Getter object
  var emailGetter = new EmailGetter();
  
  // Get the button by its ID and add an event listener
  // Initial Email Summary getter button
  var loadButton = document.getElementById('loadButton');
  if (loadButton) {
    loadButton.addEventListener('click', function() {
      chrome.storage.local.get('token', function(result) {
        emailGetter.getEmailList()
      });
    });
  }

  else {
    console.error('loadButton not found')
  }

  /*Initial Email Summary Slide*/
  addSlide(emailGetter.getNextEmail());

  //Next Button/Email Code
  var nextButton = document.getElementById('next-button');
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      emaildata = emailGetter.getNextEmail()

      slideNext(emaildata)
    });
  }

  //Previous Button/Email Code
  var prevButton = document.getElementById('prev-button');
  if (prevButton){
    prevButton.addEventListener('click', function(){
      
    slidePrev()  

    });
  }
});