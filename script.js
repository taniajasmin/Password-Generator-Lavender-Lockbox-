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
    // New element for base word input
    const baseWordInput = document.getElementById('baseWord');
    const enhanceButton = document.getElementById('enhance');

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

        if (charPool === '') {
            alert('Please select at least one character set.');
            return;
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

    // New event listener for the enhance button
    enhanceButton.addEventListener('click', () => {
        const baseWord = baseWordInput.value.trim();
        if (baseWord === '') {
            alert('Please enter a word or sentence to enhance.');
            return;
        }
        const password = generateEnhancedPassword(baseWord);
        passwordField.value = password;
        updateHistory(password);
    });

    function generateLavenderSpecialPassword() {
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const verb = verbs[Math.floor(Math.random() * verbs.length)];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

        const useCamelCase = true; 

        let password = useCamelCase
            ? `${capitalize(adjective)}${capitalize(noun)}${capitalize(verb)}`
            : `${adjective}_${noun}_${verb}`;

        password += Math.random() > 0.5 ? randomSymbol : randomNumber;

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

    // New function to generate enhanced password from user input
    function generateEnhancedPassword(baseWord) {
        // Combine multiple enhancement strategies
        const strategies = [
            advancedPasswordTransform,
            contextualEnhance,
            wordBasedEnhancement
        ];

        // Randomly choose a strategy
        const selectedStrategy = strategies[Math.floor(Math.random() * strategies.length)];
        
        return selectedStrategy(baseWord);
    }

    // Helper function for advanced password transformation
    function advancedPasswordTransform(baseWord) {
        const transform = {
            substitutions: {
                'a': ['@', '4'],
                'e': ['3', '€'],
                'i': ['1', '!'],
                'o': ['0', '()'],
                's': ['$', '5']
            },
            specialRules: [
                (word) => {
                    const symbols = ['!', '@', '#', '$', '%', '^', '&'];
                    return word + symbols[Math.floor(Math.random() * symbols.length)];
                },
                (word) => {
                    const splitPoint = Math.floor(word.length / 2);
                    return word.slice(0, splitPoint).split('').reverse().join('') + 
                           word.slice(splitPoint);
                }
            ]
        };

        let enhancedWord = baseWord.split('').map(char => {
            if (transform.substitutions[char.toLowerCase()]) {
                const options = transform.substitutions[char.toLowerCase()];
                return options[Math.floor(Math.random() * options.length)];
            }
            return char;
        }).join('');

        const specialRule = transform.specialRules[Math.floor(Math.random() * transform.specialRules.length)];
        enhancedWord = specialRule(enhancedWord);

        return enhancedWord;
    }

    // Helper function for contextual enhancement
    function contextualEnhance(baseWord) {
        const strategies = [
            (word) => {
                const middleIndex = Math.floor(word.length / 2);
                return word.slice(0, middleIndex) + 
                       Math.floor(Math.random() * 100) + 
                       word.slice(middleIndex);
            },
            (word) => {
                const symbols = ['!', '@', '#', '$', '%'];
                return symbols[Math.floor(Math.random() * symbols.length)] + 
                       word + 
                       symbols[Math.floor(Math.random() * symbols.length)];
            },
            (word) => {
                return word.split('').map((char, index) => 
                    index % 2 === 0 ? char.toUpperCase() : char
                ).join('') + Math.floor(Math.random() * 10);
            }
        ];

        const chosenStrategy = strategies[Math.floor(Math.random() * strategies.length)];
        return chosenStrategy(baseWord);
    }

    // Helper function for word-based enhancement
    function wordBasedEnhancement(baseWord) {
        const wordEnhancements = {
            prefixSymbols: ['!', '@', '#', '$', '%'],
            suffixNumbers: ['123', '456', '789', '012'],
            complexRules: [
                (word) => word.split('').map(c => c.toUpperCase()).join(''),
                (word) => word.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c).join(''),
                (word) => word.split('').reverse().join('')
            ]
        };

        const prefix = wordEnhancements.prefixSymbols[Math.floor(Math.random() * wordEnhancements.prefixSymbols.length)];
        const suffix = wordEnhancements.suffixNumbers[Math.floor(Math.random() * wordEnhancements.suffixNumbers.length)];
        const complexRule = wordEnhancements.complexRules[Math.floor(Math.random() * wordEnhancements.complexRules.length)];

        let enhancedWord = prefix + complexRule(baseWord) + suffix;

        return enhancedWord;
    }
});