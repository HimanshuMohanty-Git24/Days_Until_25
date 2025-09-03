document.getElementById('dob').addEventListener('change', calculateTimeLeft);

let countdownInterval;

function calculateTimeLeft() {
    const dobInput = document.getElementById('dob').value;
    const resultMessageElement = document.getElementById('result-message');
    const quoteElement = document.getElementById('quote');
    const countdownContainer = document.getElementById('countdown');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

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

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    if (!dobInput) {
        resultMessageElement.textContent = 'Please enter your Date of Birth.';
        quoteElement.textContent = '';
        quoteElement.style.opacity = 0;
        countdownContainer.style.display = 'none';
        return;
    }

    const dob = new Date(dobInput);
    const twentyFifthBirthday = new Date(dob.getFullYear() + 25, dob.getMonth(), dob.getDate());
    const now = new Date();

    if (now >= twentyFifthBirthday) {
        resultMessageElement.textContent = 'You are already 25 or older!';
        quoteElement.textContent = '';
        quoteElement.style.opacity = 0;
        countdownContainer.style.display = 'none';
        return;
    }

    resultMessageElement.textContent = '';
    countdownContainer.style.display = 'flex';

    function updateCountdown() {
        const now = new Date();
        const timeDifference = twentyFifthBirthday.getTime() - now.getTime();

        if (timeDifference <= 0) {
            resultMessageElement.textContent = 'Congratulations! You are now 25 years old!';
            quoteElement.textContent = '';
            quoteElement.style.opacity = 0;
            countdownContainer.style.display = 'none';
            clearInterval(countdownInterval);
            return;
        }

        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

        daysEl.textContent = daysLeft;
        hoursEl.textContent = hoursLeft;
        minutesEl.textContent = minutesLeft;
        secondsEl.textContent = secondsLeft;
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = `"${randomQuote}"`;
    quoteElement.style.opacity = 1;

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Initial state
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('countdown').style.display = 'none';
});