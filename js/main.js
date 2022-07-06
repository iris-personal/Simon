/*----- constants -----*/
const COLOR_LOOKUP = {
    1: 'mediumorchid',
    2: 'slateblue',
    3: 'mediumaquamarine',
    4: 'palegreen',
    null: 'grey'
};

const audio1 = new Audio('./audio/audio1.wav');
const audio2 = new Audio('./audio/audio2.wav');
const audio3 = new Audio('./audio/audio3.wav');
const audio4 = new Audio('./audio/audio4.wav');

const AUDIO_LOOKUP = {
    1: `${audio1}`,
    2: `${audio2}`,
    3: `${audio3}`,
    4: `${audio4}`,
} 

// array of objects tracking the sequence created by getting random color and audio 
const gameSequence = [
    {color: 'mediumOrchid', audio: audio1 },    
    {color: 'slateblue', audio: audio2 },    
    {color: 'mediumaquamarine', audio: audio3 },    
    {color: 'palegreen', audio: audio4 },    
];

/*----- app's state (variables) -----*/
let board; // array of 4 elements
let gameStatus; // null -> game in progress, 'L' is loser
let ignoreClick; // ignore clicks while progression plays
let timing; //
let winningSequence; 
let round;
let playerInput;
let iterator;

/*----- cached element references -----*/
const blockEls = [...document.querySelectorAll('#board > div')];

const block1El = document.getElementById('0');
const block2El = document.getElementById('1');
const block3El = document.getElementById('2');
const block4El = document.getElementById('3');

const msgEl = document.getElementById('msg');

const replayBtn = document.querySelector('button');

const mainEl = document.querySelector('main');

/*----- event listeners -----*/
replayBtn.addEventListener('click', handleChoice);
document.getElementById('board').addEventListener('click', handlePlayerInput);

/*----- functions -----*/
init();


function init() {
    board = [
        null, null, null, null
    ];
    gameStatus = null;
    ignoreClick = false;
    winningSequence = [];
    round = 0;
    generateWinningSequence();
    playerInput = [];
    iterator = 0;
    render();
}


function render() {
    blockEls.forEach(function(blockEl, idx) {
        blockEl.style.backgroundColor = COLOR_LOOKUP[board[idx]];
    });
    renderMessage();
    renderWinningPattern();
    replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
}


function renderMessage() {
    if (gameStatus === null) {
        msgEl.innerHTML = 'Simon says, "follow my lead"!';
      } else  {
        msgEl.innerHTML = 'Too bad... you could NOT keep up!';
      }
}


function renderWinningPattern(i) {
    if (i < winningSequence.length) {
        document.querySelector('div').style.backgroundColor = gameSequence[winningSequence[i]].color;
        gameSequence[winningSequence[i]].audio.play();
    }
    setTimeout(() => {
        i++;
        renderWinningPattern(i);
    }, 3000);
}

function playWinningSequence() {
    blockEls[winningSequence[iterator]].style.backgroundColor = gameSequence[winningSequence[iterator]].color;
    gameSequence[winningSequence[iterator]].audio.play();
    iterator++;
    console.log(iterator);
    console.log(winningSequence.length);
    if (iterator >= winningSequence.length) {
        blockEls[winningSequence[iterator - 1]].style.backgroundColor = 'grey';
        return;
    };
    setTimeout(function() {
        blockEls[winningSequence[iterator - 1]].style.backgroundColor = 'grey';
        test();
    }, 1500);
    
}

function handleChoice(evt) {
    //guards
    if (evt.target !== replayBtn || ignoreClick) return;
    ignoreClick = true;
    gameStatus = null;
    render();
}


function generateWinningSequence (cb) {
    round++;
    winningSequence.push(Math.floor(Math.random() * gameSequence.length));
    renderWinningPattern();
    console.log(winningSequence);
}


function handlePlayerInput(event) {
    playerInput.push(parseInt(event.target.id));
    
    // TODO define an event.target.id variable
    if (event.target.tagName === 'DIV') {
        event.target.style.backgroundColor = gameSequence[event.target.id].color;
        gameSequence[event.target.id].audio.play();
        //console.log(event);
        setTimeout(function() {
            event.target.style.backgroundColor = 'grey';
        }, 1500);
    } 
   if (playerInput.length === winningSequence.length) {
        console.log(playerInput);
        compareSequence(event.target.id);
        generateWinningSequence();
        round++;
        playerInput = [];
   }
}


function compareSequence(num) {
    playerInput.forEach(function(arrayEl, idx) {
        if (arrayEl !== winningSequence[idx]) {
            console.log('loser');
            gameStatus = 'L';
            renderMessage; 
            render(replayBtn);
            ignoreClick = false;
            winningSequence = [];
            return;
        } else {
            gameStatus = null;
            console.log('winner');
        }
    });
}