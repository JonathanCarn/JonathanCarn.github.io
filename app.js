document.addEventListener('DOMContentLoaded', function() {
    const happinessInput = document.getElementById('happiness');
    const submitButton = document.getElementById('submit');
    const readingsList = document.getElementById('readings');

    // Load saved readings from localStorage
    let happinessReadings = JSON.parse(localStorage.getItem('happinessReadings')) || [];

    // Function to update the list of last 10 readings
    function updateReadingsList() {
        readingsList.innerHTML = '';
        happinessReadings.slice(-10).reverse().forEach(reading => {
            const li = document.createElement('li');
            li.textContent = `Happiness level: ${reading}`;
            readingsList.appendChild(li);
        });
    }

    // Function to save a new reading
    function saveHappinessReading(value) {
        happinessReadings.push(value);
        localStorage.setItem('happinessReadings', JSON.stringify(happinessReadings));
        updateReadingsList();
    }

    // Handle submit button click
    submitButton.addEventListener('click', function() {
        const happinessValue = parseInt(happinessInput.value);
        if (happinessValue >= 1 && happinessValue <= 10) {
            saveHappinessReading(happinessValue);
            happinessInput.value = '';  // Clear input after submission
        } else {
            alert('Please enter a value between 1 and 10.');
        }
    });

    // Update the readings list on page load
    updateReadingsList();
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registered', reg))
        .catch(err => console.log('Service Worker registration failed', err));
    });
}
