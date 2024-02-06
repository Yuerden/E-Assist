console.log('This is a popup!');

// Ensure the DOM is fully loaded before trying to access the element
window.addEventListener('DOMContentLoaded', (event) => {
    // Now we can safely get the button by its ID
    var redirectButton = document.getElementById('redirectButton');
    // Always check if the element exists before adding an event listener
    if (redirectButton) {
        redirectButton.addEventListener('click', function() {
            // Assuming mainpage.html is at the root of your extension directory
            chrome.tabs.create({ url: 'mainpage.html' }); // This will open mainpage.html in a new tab
        });
    } else {
        console.error('redirectButton not found');
    }
});
