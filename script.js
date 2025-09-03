document.addEventListener('DOMContentLoaded', () => {
    const dobInput = document.getElementById('dob');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // --- THEME LOGIC ---
    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        themeToggle.checked = theme === 'dark';
        localStorage.setItem('theme', theme);
    };

    themeToggle.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    // --- FLATPICKR INITIALIZATION ---
    flatpickr(dobInput, {
        dateFormat: "F j, Y",
        maxDate: "today",
        onChange: function(selectedDates, dateStr, instance) {
            calculateTimeLeft();
        }
    });


    // --- COUNTDOWN LOGIC ---
    let countdownInterval;

    function calculateTimeLeft() {
        const dobValue = dobInput.value;
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

        if (!dobValue) {
            resultMessageElement.textContent = 'Please enter your Date of Birth.';
            quoteElement.textContent = '';
            quoteElement.style.opacity = 0;
            countdownContainer.style.display = 'none';
            return;
        }

        const dob = new Date(dobValue);
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
    document.getElementById('countdown').style.display = 'none';

    // --- SHARE LOGIC ---
    const shareButton = document.getElementById('share-button');
    const shareMenu = document.getElementById('share-menu');
    const downloadBtn = document.getElementById('download-btn');
    const tweetBtn = document.getElementById('tweet-btn');
    const linkedinBtn = document.getElementById('linkedin-btn');
    const container = document.querySelector('.container');

    const downloadScreenshot = () => {
        return html2canvas(container, {
            backgroundColor: getComputedStyle(document.body).backgroundColor,
            onclone: (doc) => {
                doc.getElementById('share-button').style.visibility = 'hidden';
                doc.getElementById('share-menu').style.visibility = 'hidden';
            }
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'time-until-25.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    shareButton.addEventListener('click', (e) => {
        e.stopPropagation();
        shareMenu.classList.toggle('hidden');
    });

    downloadBtn.addEventListener('click', () => {
        downloadScreenshot();
        shareMenu.classList.add('hidden');
    });

    const appUrl = "https://days-until-25.vercel.app/";
    const shareText = "Check out my countdown to 25! #DaysUntil25";

    tweetBtn.addEventListener('click', () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(twitterUrl, '_blank');
        shareMenu.classList.add('hidden');
    });

    linkedinBtn.addEventListener('click', () => {
        const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(appUrl)}&title=${encodeURIComponent(shareText)}`;
        window.open(linkedinUrl, '_blank');
        shareMenu.classList.add('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!shareMenu.contains(e.target) && !shareButton.contains(e.target)) {
            shareMenu.classList.add('hidden');
        }
    });
});