// mainpageScripts.js

import {EmailGetter} from './getEmails.js';

/* MAIN */
//Button event listener main function
document.addEventListener('DOMContentLoaded', (event) => {
    
  //EmailGetter Object that utilizes functions in getEmails.js
  var emailGetter = new EmailGetter();
    
    //Load Button logic for loading and getting the next email
    var getEmail = document.getElementById('getEmail');
    if (getEmail) {
      getEmail.addEventListener('click', function() {
        // Here you should adapt to fetch and then display
        emailGetter.getNextEmail().then(displayEmailBody); // Make sure getNextEmail() is correctly returning email data
      });
    } 
    else {
      console.error('getEmail not found')
    }
    
    //Next Email Button Logic for getting the summary of the current email
    var getEmailSummary = document.getElementById('summarize');
    if (getEmailSummary) {
      getEmailSummary.addEventListener('click', function() {
        emailGetter.summarizeEmail().then(displaySummary); // Same here for fetching next email
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

// Function to display the current email (Also clears the summary)
function displayEmailBody(emailData) {
  // Assuming emailData contains the body of the email
  //displaySummary(""); //Wipes current summary

  addSlide(emailData.body, 1);
}

//Function to display the summary of the current email
function displaySummary(summary) {
  // Assuming emailData contains the body of the email

  // Parse the text to make a list of points
  const list = parseText(summary);
  console.log(list);

  //Send list of points to addSlide
  addSlide(list, 0);

}

/* Carousel JS (Find a way to integrate into load button above)*/
const carousel = document.getElementById('carousel');
let currentIndex = 0;

/*Next Slide Function*/
function slideNext(emaildata) {
  currentIndex += 1;
  updateSlide();
}

/*Previous Email Function*/
function slidePrev() {
  currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
  updateSlide();
}

/*moves/updates carousel*/
function updateSlide() {
  const offset = -currentIndex * 100.57; //This is weird as fuck gotta change later, left movement too big right move ment too small
  carousel.style.transform = `translateX(${offset}%)`;
}

// Function to add a new slide (ADD DAIKI's CODE TO SPLIT SLIDES IN HALF)
function addSlide(emaildata, checker) {

  //If Email Data then add text to slide 1 in pair
  if (checker == 1) {
    const slide1 = document.createElement('div');
    slide1.classList.add('slide');
    slide1.textContent = emaildata;
    carousel.appendChild(slide1);
  }

  //If Summary Data then add text to slide 2 in pair
  else{
    const slide2 = document.createElement('div');
    slide2.classList.add('slide');

    // Add each point from list of data to text
    for (let i = 0; i < emaildata.length; i++){
      slide2.textContent += emaildata[i];

// // Loading Icon Spinner:
// function showSpinner(where) {
//     document.getElementById(where).style.display = 'block';
// }
// function hideSpinner(where) {
//     document.getElementById(where).style.display = 'none';
// }

// document.addEventListener('DOMContentLoaded', (event) => {
//     var emailGetter = new EmailGetter();
    
//     var loadButton = document.getElementById('loadButton');
//     if (loadButton) {
//         loadButton.addEventListener('click', function() {
//             showSpinner('loadingSpinner');
//             emailGetter.getNextEmail().then(emailData => {
//                 displayEmailBody(emailData);
//                 hideSpinner('loadingSpinner');
//             }); // Make sure getNextEmail() is correctly returning email data
//         });
//     }
//     var summarizeButton = document.getElementById('summarize');
//     if (summarizeButton) {
//         summarizeButton.addEventListener('click', function() {
//             showSpinner('summarySpinner');
//             emailGetter.summarizeEmail().then(summary => {
//                 displaySummary(summary);
//                 hideSpinner('summarySpinner');
//             }); // Update your method to properly call summarizeEmail with the necessary arguments
//         });

    }

    carousel.appendChild(slide2);
  }
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