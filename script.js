document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const responseDiv = document.getElementById('response');

    // Check if the browser supports Speech Recognition and Speech Synthesis
    if (!('webkitSpeechRecognition' in window) || !('speechSynthesis' in window)) {
        responseDiv.textContent = 'Sorry, your browser does not support Speech Recognition or Speech Synthesis.';
        startBtn.disabled = true;
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const synth = window.speechSynthesis;
    let femaleVoice = null;

    // Load voices and select a female voice
    const loadVoices = () => {
        const voices = synth.getVoices();
        femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female'));
        if (!femaleVoice) {
            femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('en'));
        }
    };

    synth.onvoiceschanged = loadVoices;
    loadVoices();

    function speak(text) {
        if (femaleVoice) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = femaleVoice;
            synth.speak(utterance);
        } else {
            responseDiv.textContent = text;
        }
    }

    recognition.onstart = () => {
        responseDiv.textContent = 'Listening...';
    };

    recognition.onspeechend = () => {
        responseDiv.textContent = 'Stopped listening.';
        recognition.stop();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        responseDiv.textContent = `You said: ${transcript}`;
        handleCommand(transcript);
    };

    function handleCommand(command) {
        if (command.includes('hello')) {
            speak('Hello!i am Angel your assistant and  How can I assist you today?');
        } else if (command.includes('good morning')) {
            speak('hello good morning have a great day !');
        } else if (command.includes('open google')) {
            window.open('https://www.google.com', '_blank');
            speak('Opening Google...');
        } else if (command.includes('open youtube')) {
            window.open('https://www.youtube.com', '_blank');
            speak('Opening YouTube...');
        } else if (command.includes('open facebook')) {
            window.open('https://www.facebook.com', '_blank');
            speak('Opening Facebook...');
        } else if (command.includes('open wikipedia')) {
            window.open('https://www.wikipedia.org', '_blank');
            speak('Opening Wikipedia...');
        } else if (command.includes('time')) {
            const now = new Date();
            const time = now.toLocaleTimeString();
            speak(`The current time is ${time}.`);
        } else if (command.includes('date')) {
            const now = new Date();
            const date = now.toLocaleDateString();
            speak(`Today's date is ${date}.`);
        } else if (command.includes('weather')) {
            window.open('https://weather.com', '_blank');
            speak('Opening weather website for updates...');
        }else if (command.includes('songs')) {
            window.open('https://www.spotify.com/', '_blank');
            speak('Opening spotify for playing songs...');
        } else if (command.includes('say me a joke')) {
            speak('Why don’t scientists trust atoms? Because they make up everything!');
        } else if (command.includes('news')) {
            window.open('https://www.bbc.com/news', '_blank');
            speak('Opening news website for the latest updates...');
        } else if (command.includes('sports')) {
            window.open('https://www.espn.com', '_blank');
            speak('Opening sports website for scores and updates...');
        } else if (command.includes('music')) {
            speak('You can use music streaming services like Spotify or Apple Music to play music.');
        } else if (command.includes('calculator')) {
            window.open('https://www.google.com/search?q=calculator', '_blank');
            speak('Opening calculator...');
        } else if (command.includes('open map')) {
            window.open('https://www.google.com/maps', '_blank');
            speak('Opening Google Maps...');
        } else if (command.includes('translate')) {
            window.open('https://translate.google.com', '_blank');
            speak('Opening Google Translate...');
        } else if (command.includes('calendar')) {
            window.open('https://calendar.google.com', '_blank');
            speak('Opening Google Calendar...');
        } else if (command.includes('reminder')) {
            speak('You can set reminders using apps like Google Keep or Todoist.');
        } else if (command.includes('timer')) {
            speak('You can set timers using your phone’s built-in timer or apps like Timer+.');
        } else if (command.includes('alarm')) {
            speak('You can set alarms using your phone’s built-in alarm clock or apps like Alarmy.');
        } else if (command.includes('find')) {
            speak('You can use Google Search to find what you’re looking for.');
        } else if (command.includes('stocks')) {
            window.open('https://www.nasdaq.com', '_blank');
            speak('Opening NASDAQ for stock prices...');
        } else if (command.includes('flight')) {
            window.open('https://www.flightaware.com', '_blank');
            speak('Opening FlightAware for flight information...');
        } else if (command.includes('restaurant')) {
            window.open('https://www.yelp.com', '_blank');
            speak('Opening Yelp to find restaurants near you...');
        } else if (command.includes('movie')) {
            window.open('https://www.imdb.com', '_blank');
            speak('Opening IMDb for movie information...');
        } else if (command.includes('recipe')) {
            window.open('https://www.allrecipes.com', '_blank');
            speak('Opening AllRecipes for recipes...');
        } else if (command.includes('shopping')) {
            window.open('https://www.amazon.com', '_blank');
            speak('Opening Amazon for shopping...');
        } else if (command.includes('tips')) {
            speak('Here is a tip: Stay organized and manage your time effectively!');
        } else if (command.includes('quote')) {
            speak('“The only limit to our realization of tomorrow is our doubts of today.” – Franklin D. Roosevelt');
        } else if (command.includes('fact')) {
            speak('Did you know? Honey never spoils.');
        } else if (command.includes('games')) {
            speak('You can play games on websites like Miniclip or Pogo.');
        } else if (command.includes('fun')) {
            speak('Let’s have some fun! What would you like to do?');
        } else if (command.includes('facts')) {
            speak('Did you know? Octopuses have three hearts.');
        } else if (command.includes('history')) {
            window.open('https://www.history.com', '_blank');
            speak('Opening History.com for historical information...');
        } else if (command.includes('travel')) {
            window.open('https://www.expedia.com', '_blank');
            speak('Opening Expedia for travel planning...');
        } else if (command.includes('location')) {
            speak('You can use Google Maps to find specific locations.');
        } else if (command.includes('address')) {
            speak('You can use Google Maps to find address information.');
        } else if (command.includes('education')) {
            speak('Explore online learning platforms like Coursera or Khan Academy for educational resources.');
        } else if (command.includes('courses')) {
            speak('Browse online learning platforms like Udemy or LinkedIn Learning for various courses.');
        } else if (command.includes('tutorial')) {
            speak('You can find tutorials on platforms like YouTube or tutorialspoint.');
        } else if (command.includes('shopping list')) {
            speak('Create and manage shopping lists using apps like Google Keep or AnyList.');
        } else if (command.includes('to-do list')) {
            speak('Create and manage to-do lists using apps like Todoist or Microsoft To Do.');
        } else if (command.includes('notes')) {
            speak('Take notes using apps like Evernote or Microsoft OneNote.');
        } else if (command.includes('edit')) {
            speak('Edit documents using software like Microsoft Word or Google Docs.');
        } else if (command.includes('save')) {
            speak('Save files using your computer’s file management tools or cloud storage services.');
        } else if (command.includes('remind me')) {
            speak('Set reminders using apps like Google Keep or Microsoft To Do.');
        } else {
            speak('Sorry, I did not understand that command. Can you please try again?');
        }
    }

    startBtn.addEventListener('click', () => {
        recognition.start();
    });
});
