// mainpageScripts.js

import {EmailGetter} from './getEmails.js';

/* MAIN */
//Button event listener main function
document.addEventListener('DOMContentLoaded', (event) => {
    
  //EmailGetter Object that utilizes functions in getEmails.js
  var emailGetter = new EmailGetter();
  var sameEmail = false;
    
    //Load Button logic for loading and getting the next email
    var getEmail = document.getElementById('getEmail');
    if (getEmail) {
      getEmail.addEventListener('click', function() {
        sameEmail = false;
        addSlideWithSpinner();
        slideCurrent();
        emailGetter.getNextEmail().then(emailData => {
            updateSlideContent(emailData.body);
        });

      });
    } 
    else {
      console.error('getEmail not found')
    }
    
    //Next Email Button Logic for getting the summary of the current email
    var getEmailSummary = document.getElementById('summarize');
    if (getEmailSummary) {
      getEmailSummary.addEventListener('click', function() {
        !sameEmail ? addSlideWithSpinner() : carousel.getElementsByClassName('slide')[carousel.getElementsByClassName('slide').length - 1].innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>';
        slideCurrent();
        emailGetter.summarizeEmail().then(summary => {
            updateSlideContent(summary);
        });
        sameEmail=true;
      });
    }

    //Next Slide Button Logic to generate and animate to next slide
    var nextSlideButton = document.getElementById('nextSlide');
    if (nextSlideButton) {
      nextSlideButton.addEventListener('click', function() {
        //LOGIC HERE
        slideNext();
      });
    }

    //Previous Slide Button Logic to animate to previous slide
    var prevSlideButton = document.getElementById('prevSlide');
    if (prevSlideButton) {
      prevSlideButton.addEventListener('click', function() {
        //LOGIC HERE
        slidePrev();
      });
    }
});

/* Carousel JS (Find a way to integrate into load button above)*/
const carousel = document.getElementById('carousel');
let currentIndex = 0;

/*Next Slide Function*/
function slideNext() {
  currentIndex += 1;
  updateSlide();
}

/*Previous Email Function*/
function slidePrev() {
  currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
  updateSlide();
}

function slideCurrent() {
  currentIndex = carousel.children.length-1;
  updateSlide(); 
}

/*moves/updates carousel*/
function updateSlide() {
  const offset = -currentIndex * 100.57; //This is weird as fuck gotta change later, left movement too big right move ment too small
  carousel.style.transform = `translateX(${offset}%)`;
}

/* HELPERS */

// Function to parse text based on a token and store in a list
function parseText(text) {
  // Split the text based on the token (SPLIT BROKEN FOR SOME REASON, MAYBE CHANGE DATA TYPE TO STRING)
  const segments = text.split("\n");

  // Remove any empty segments
  const parsedSegments = segments.filter(segment => segment.trim() !== '');

  return parsedSegments;
}

// Johns new shit
function addSlideWithSpinner() {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>'; // Add your spinner here
    carousel.appendChild(slide);
    updateSlide(); // Move to the new slide with the spinner
}
// Function to update the content of the latest slide
function updateSlideContent(content) {
    const slides = carousel.getElementsByClassName('slide');
    const latestSlide = slides[slides.length - 1]; // Get the last slide
    if (latestSlide) {
        latestSlide.innerHTML = ''; // Clear the spinner
        latestSlide.textContent = content; // Add the new content
    }
}
