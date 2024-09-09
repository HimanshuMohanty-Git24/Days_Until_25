function calculateTimeLeft() {
    const ageInput = document.getElementById('age').value;
    const resultElement = document.getElementById('result');
    const quoteElement = document.getElementById('quote');

    // Array of motivational quotes
    const quotes = [
        "Believe you can and you're halfway there.",
        "The future depends on what you do today.",
        "Don't watch the clock; do what it does. Keep going.",
        "The only way to do great work is to love what you do.",
        "Your time is limited, don't waste it living someone else's life.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Don't be afraid to give up the good to go for the great.",
        "The harder you work for something, the greater you'll feel when you achieve it."
    ];

    // Check if the input is valid
    if (ageInput === '' || ageInput < 0 || ageInput > 25) {
        resultElement.textContent = 'Please enter a valid age between 0 and 25.';
        quoteElement.textContent = ''; // Clear any previous quote
        return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const targetAge = 25;
    const yearsLeft = targetAge - ageInput;

    // If the user is already 25 or older
    if (yearsLeft <= 0) {
        resultElement.textContent = 'You are already 25 or older!';
        quoteElement.textContent = ''; // Clear any previous quote
        return;
    }

    // Calculate the future date when the user will turn 25
    const futureDate = new Date(currentYear + yearsLeft, currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
    
    function updateCountdown() {
        const now = new Date();
        const timeDifference = futureDate.getTime() - now.getTime();

        // Calculate days, hours, minutes, and seconds
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Display the result
        resultElement.textContent = `You have ${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes, and ${secondsLeft} seconds left until you turn 25.`;

        // Update the countdown every second
        if (timeDifference > 0) {
            setTimeout(updateCountdown, 1000);
        } else {
            resultElement.textContent = 'Congratulations! You are now 25 years old!';
            quoteElement.textContent = ''; // Clear the quote as they reach 25
        }
    }

    // Display a random motivational quote only once per click
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = `"${randomQuote}"`;

    // Start the countdown
    updateCountdown();
}