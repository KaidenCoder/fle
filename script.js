const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//List of words for game
const words = [
    'Let marriage be held in honor among all and let the marriage bed be undefiled for God will judge the sexually immoral and adulterous',
    'The husband should give to his wife her conjugal rights and likewise the wife to her husband',
    'For the wife does not have authority over her own body but the husband does likewise the husband does not have authority over his own body but the wife does',
    'Do not deprive one another, except perhaps by agreement for a limited time, that you may devote yourselves to prayer',
    'But then come together again, so that Satan may not tempt you because of your lack of self-control',
    'Flee from sexual immorality. Every other sin a person commits is outside the body, but the sexually immoral person sins against his own body',
    'Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh',
    'But because of the temptation to sexual immorality, each man should have his own wife and each woman her own husband',
    'Let your fountain be blessed and rejoice in the wife of your youth a lovely deer a graceful doe Let her breasts fill you at all times with delight be intoxicated always in her love',
    'For this is the will of God, your sanctification that you abstain from sexual immorality',
    'that each one of you know how to control his own body in holiness and honor, not in the passion of lust like the Gentiles who do not know God',
    'But I say to you that everyone who looks at a woman with lustful intent has already committed adultery with her in his heart',
    'Or do you not know that your body is a temple of the Holy Spirit within you, whom you have from God',
    'You are not your own for you were bought with a price so glorify God in your body',
    'Put to death therefore what is earthly in you sexual immorality impurity passion evil desire and covetousness which is idolatry',
    'You shall not commit adultery',
    'Food is meant for the stomach and the stomach for food and God will destroy both one and the other',
    'The body is not meant for sexual immorality but for the Lord and the Lord for the body',
    'Or do you not know that the unrighteous will not inherit the kingdom of God',
    'Do not be deceived neither the sexually immoral nor idolaters nor adulterers nor men who practice homosexuality nor thieves nor the greedy nor drunkards nor revilers nor swindlers will inherit the kingdom of God',
    'He who commits adultery lacks sense he who does it destroys himself',
    'Let us walk properly as in the daytime not in orgies and drunkenness not in sexual immorality and sensuality not in quarreling and jealousy',
    'But put on the Lord Jesus Christ and make no provision for the flesh to gratify its desires',
    'But sexual immorality and all impurity or covetousness must not even be named among you as is proper among saints',
    'Now the works of the flesh are evident sexual immorality impurity sensuality idolatry sorcery enmity strife jealousy fits of anger rivalries dissensions divisions envy drunkenness orgies and things like these',
    'I warn you, as I warned you before that those who do such things will not inherit the kingdom of God',
    'So flee youthful passions and pursue righteousness faith love and peace along with those who call on the Lord from a pure heart'
];

// Init word
let randomWord;

// Init score
let score = 15;

// Init time
let time = 60;

// Set difficulty
let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'easy';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'easy';

// Focus on text on start
text.focus()

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generates random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update Score
function updateScore() {

    score--;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval)
        //end game

        gameOver()
        // coronaDestroyed()

    }

    if (score === 0) {
        time++;
    }


}

// Game Over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <h2>Your remaining items are ${score}</h2>
        <button onclick="location.reload()">Play Again</button>
    `;

    endgameEl.style.display = 'flex';
}

function coronaDestroyed() {

    endgameEl.innerHTML = `
        <h1>Hoorah!</h1>
        <h2>You have completed Words</h2>
        <button onclick="location.reload()">Play Again</button>
    `;


    endgameEl.style.display = 'flex';
}




addWordToDOM();

// Event listeners


// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();


        // Clear
        e.target.value = '';
        if (difficulty === 'hard') {

            time += 30;
        } else if (difficulty === 'medium') {

            time += 40;
        } else {

            time += 50;
        }
        updateTime()
    }

    if (score === 0) {

        coronaDestroyed()
    }
})

// Settings btn click
settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'))

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
})

