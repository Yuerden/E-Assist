// // mainpageScripts.js

// import {EmailGetter} from './getEmails.js';

// /* MAIN */
// //Button event listener main function
// document.addEventListener('DOMContentLoaded', (event) => {
    
//   //EmailGetter Object that utilizes functions in getEmails.js
//   var emailGetter = new EmailGetter();
    
//     //Load Button logic for loading and getting the next email
//     var getEmail = document.getElementById('getEmail');
//     if (getEmail) {
//       getEmail.addEventListener('click', function() {
//         addSlideWithSpinner();
//         emailGetter.getNextEmail().then(emailData => {
//             updateSlideContent(emailData.body);
//         }); // Make sure getNextEmail() is correctly returning email data

//       });
//     } 
//     else {
//       console.error('getEmail not found')
//     }
    
//     //Next Email Button Logic for getting the summary of the current email
//     var getEmailSummary = document.getElementById('summarize');
//     if (getEmailSummary) {
//       getEmailSummary.addEventListener('click', function() {
//         addSlideWithSpinner();
//         emailGetter.summarizeEmail().then(summary => {
//             updateSlideContent(summary);
//         }); // Same here for fetching next email
//       });
//     }

//     //Next Slide Button Logic to generate and animate to next slide
//     var nextSlideButton = document.getElementById('nextSlide');
//     if (nextSlideButton) {
//       nextSlideButton.addEventListener('click', function() {
//         //LOGIC HERE
//         slideNext();
//       });
//     }

//     //Previous Slide Button Logic to animate to previous slide
//     var prevSlideButton = document.getElementById('prevSlide');
//     if (prevSlideButton) {
//       prevSlideButton.addEventListener('click', function() {
//         //LOGIC HERE
//         slidePrev();
//       });
//     }
// });

// /* Carousel JS (Find a way to integrate into load button above)*/
// const carousel = document.getElementById('carousel');
// let currentIndex = 0;

// /*Next Slide Function*/
// function slideNext(emaildata) {
//   currentIndex += 1;
//   updateSlide();
// }

// /*Previous Email Function*/
// function slidePrev() {
//   currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
//   updateSlide();
// }

// /*moves/updates carousel*/
// function updateSlide() {
//   const offset = -currentIndex * 100.57; //This is weird as fuck gotta change later, left movement too big right move ment too small
//   carousel.style.transform = `translateX(${offset}%)`;
// }

// /* HELPERS */

// // Function to parse text based on a token and store in a list
// function parseText(text) {
//   // Split the text based on the token (SPLIT BROKEN FOR SOME REASON, MAYBE CHANGE DATA TYPE TO STRING)
//   const segments = text.split("\n");

//   // Remove any empty segments
//   const parsedSegments = segments.filter(segment => segment.trim() !== '');

//   return parsedSegments;
// }

// // FIX SPLIT SCREEN BY FIXING AND IMPLEMENTING MY OLD ADDSLIDE()
// let check = 0
// // Johns new shit
// function addSlideWithSpinner() {
//     const slide = document.createElement('div');

//     if(check == 0){
//       slide.classList.add('slide');
//       check++;
//     }
//     else{
//       slide.classList.add('slide_summary');
//       check--;
//     }
//     slide.innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>'; // Add your spinner here
//     carousel.appendChild(slide);
//     updateSlide(); // Move to the new slide with the spinner
// }
// // Function to update the content of the latest slide
// function updateSlideContent(content) {
//     const slides = carousel.getElementsByClassName('slide');
//     const latestSlide = slides[slides.length - 1]; // Get the last slide
//     if (latestSlide) {
//         latestSlide.innerHTML = ''; // Clear the spinner
//         latestSlide.textContent = content; // Add the new content
//     }
// }






















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
        !sameEmail ? addSlideWithSpinner_Summary() : carousel.getElementsByClassName('slide_summary')[carousel.getElementsByClassName('slide_summary').length - 1].innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>';
        slideCurrent();
        emailGetter.summarizeEmail().then(summary => {
          summaryParse(summary);
          
        });
        sameEmail=true;
      });
    }

    //Next Slide Button Logic to generate and animate to next slide
    var nextSlideButton = document.getElementById('nextSlide');
    if (nextSlideButton) {
      nextSlideButton.addEventListener('click', function() {
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


<<<<<<< Updated upstream
  addSlide(emailData.body, 1);
  const slides = carousel.getElementsByClassName('slide');

  const latestSlide = slides[slides.length - 1]; // Get the last slide
  if (latestSlide) {
      latestSlide.innerHTML = ''; // Clear the spinner
      latestSlide.textContent = content; // Add the new content
  }
  
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
=======
/* HELPERS */
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
// Function to add a new slide (ADD DAIKI's CODE TO SPLIT SLIDES IN HALF)
function addSlide(emaildata, checker) {

  //If Email Data then add text to slide 1 in pair
  if (checker == 1) {
    const slide1 = document.createElement('div');
    slide1.classList.add('slide');
    slide1.textContent = emaildata;

    // slide1.innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>'; // Add your spinner here
    carousel.appendChild(slide1);
    updateSlide();
  }

  //If Summary Data then add text to slide 2 in pair
  else{
    const slide2 = document.createElement('div');
    slide2.classList.add('slide_summary');

    // Add each point from list of data to text
    for (let i = 0; i < emaildata.length; i++){
      slide2.textContent += emaildata[i] + "\n";
    }

    // slide2.innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>'; // Add your spinner here
    carousel.appendChild(slide2);
    updateSlide();
  }
=======
// New Add Slide Function (Includes spinner)
function addSlideWithSpinner() {
  const slide = document.createElement('div');
  slide.classList.add('slide');
  slide.innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>'; // Add your spinner here
  carousel.appendChild(slide);
  updateSlide(); // Move to the new slide with the spinner
}
function addSlideWithSpinner_Summary() {
  const slide = document.createElement('div');
  slide.classList.add('slide_summary');
  slide.innerHTML = '<div id="slideSpinner" class="loading-spinner"></div>'; // Add your spinner here
  carousel.appendChild(slide);
  updateSlide(); // Move to the new slide with the spinner
>>>>>>> Stashed changes
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
function updateSlideContent_summary(content) {
  const slides = carousel.getElementsByClassName('slide_summary');
  const latestSlide = slides[slides.length - 1]; // Get the last slide
  if (latestSlide) {
      latestSlide.innerHTML = ''; // Clear the spinner
      latestSlide.textContent = content; // Add the new content
  }
}

// Function to parse text based on a token and store in a list
function parseText(text) {
  // Split the text based on the token (SPLIT BROKEN FOR SOME REASON, MAYBE CHANGE DATA TYPE TO STRING)
  const segments = text.split("\n");

  // Remove any empty segments
  const parsedSegments = segments.filter(segment => segment.trim() !== '');

  return parsedSegments;
<<<<<<< Updated upstream
}
=======
}

// Function for parsing summary
function summaryParse(summary){
  
  // Parse the text to make a list of points
  var list = parseText(summary);
  console.log(list);

  //EVENTUALLY ADD WHATEVER STYLING WE WANT FOR THE PARSED SUMMARY HERE

  // Add new lines
  for (var i = 0; i < list.length; i++) {
    // Add a new line to the end of each string
    list[i] += "\n";
  }


  // Combine final summary
  var final_summary = ""
  for (var i = 0; i < list.length; i++) {
    final_summary += list[i];
  }

  console.log("Updated List:\n", list);
  console.log("Updated Summary:\n", final_summary);
  //Send finished summary text to updateSlideContent
  updateSlideContent_summary(final_summary);
}

>>>>>>> Stashed changes
