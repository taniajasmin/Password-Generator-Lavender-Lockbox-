const nouns = ["cat", "dog", "car", "tree", "moon", "sun", "star", "book", "rain", "wind", "cloud", "river"];
const verbs = ["jumps", "runs", "drives", "grows", "shines", "falls", "spins", "glows", "dances", "sings"];
const adjectives = ["quick", "lazy", "red", "tall", "bright", "cool", "wild", "calm", "happy", "loud"];
const symbols = "!@#$%^&*";
const numbers = "0123456789";

document.addEventListener('DOMContentLoaded', () => {
    const passwordField = document.getElementById('password');
    const lavenderSpecialButton = document.getElementById('lavenderSpecial');
    const generateButton = document.getElementById('generate');
    const copyButton = document.getElementById('copy');
    const historyList = document.getElementById('historyList');

    const options = {
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        numbers: document.getElementById('numbers'),
        symbols: document.getElementById('symbols')
    };

    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*'
    };

    lavenderSpecialButton.addEventListener('click', () => {
        const password = generateLavenderSpecialPassword();
        passwordField.value = password;
        updateHistory(password);
    });

    generateButton.addEventListener('click', () => {
        const length = parseInt(document.getElementById('length').value);
        let charPool = '';

        for (const [key, checkbox] of Object.entries(options)) {
            if (checkbox.checked) {
                charPool += charSets[key];
            }
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            password += charPool[randomIndex];
        }

        passwordField.value = password;
        updateHistory(password);
    });

    copyButton.addEventListener('click', () => {
        passwordField.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    });

    function generateLavenderSpecialPassword() {
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const verb = verbs[Math.floor(Math.random() * verbs.length)];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

        // Add a random number or symbol
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

        // Choose camel case or underscore
        const useCamelCase = true; 

        let password = useCamelCase
            ? `${capitalize(adjective)}${capitalize(noun)}${capitalize(verb)}`
            : `${adjective}_${noun}_${verb}`;

        // Adding random number or symbol 
        password += Math.random() > 0.5 ? randomSymbol : randomNumber;

        // password length is between 8-12 characters
        if (password.length < 8) {
            password += randomSymbol + randomNumber;
        } else if (password.length > 12) {
            password = password.slice(0, 12);
        }

        return password;
    }

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function updateHistory(password) {
        const listItem = document.createElement('li');
        listItem.textContent = password;
        historyList.prepend(listItem);

        if (historyList.children.length > 5) {
            historyList.removeChild(historyList.lastChild);
        }
    }
});
