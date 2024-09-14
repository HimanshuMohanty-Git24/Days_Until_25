function calculateTimeLeft() {
    const dobInput = document.getElementById('dob').value;
    const resultElement = document.getElementById('result');
    const quoteElement = document.getElementById('quote');

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

    if (!dobInput) {
        resultElement.textContent = 'Please enter your Date of Birth.';
        quoteElement.textContent = '';
        return;
    }

    const dob = new Date(dobInput);
    const currentDate = new Date();

    // Calculate the date when the user will turn 25
    const twentyFifthBirthday = new Date(dob.getFullYear() + 25, dob.getMonth(), dob.getDate());

    // If the user is already 25 or older
    if (currentDate >= twentyFifthBirthday) {
        resultElement.textContent = 'You are already 25 or older!';
        quoteElement.textContent = '';
        return;
    }

    function updateCountdown() {
        const now = new Date();
        const timeDifference = twentyFifthBirthday.getTime() - now.getTime();

        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

        resultElement.textContent = `You have ${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes, and ${secondsLeft} seconds left until you turn 25.`;

        if (timeDifference > 0) {
            setTimeout(updateCountdown, 1000);
        } else {
            resultElement.textContent = 'Congratulations! You are now 25 years old!';
            quoteElement.textContent = '';
        }
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = `"${randomQuote}"`;

    updateCountdown();
}