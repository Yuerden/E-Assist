// mainpageScripts.js

import {EmailGetter} from './getEmails.js';

// Function to display the current email (Also clears the summary)
function displayEmailBody(emailData) {
  // Assuming emailData contains the body of the email
  //displaySummary(""); //Wipes current summary

  addSlide(emailData.body, 1);
}

//Function to display the summary of the current email
function displaySummary(summary) {
  // Assuming emailData contains the body of the email

  //Add to slide
  addSlide(summary, 0);

}

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
    slide2.textContent = emaildata;
    carousel.appendChild(slide2);
  }
}


