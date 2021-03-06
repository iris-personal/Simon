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

// array of objects tracking the sequence created by getting random color and audio 
const gameSequence = [
    {color: 'mediumOrchid', audio: audio1 },    
    {color: 'slateblue', audio: audio2 },    
    {color: 'mediumaquamarine', audio: audio3 },    
    {color: 'palegreen', audio: audio4 },    
];

const LIT_TIME = 800;

const GAP_TIME = 500;

/*----- app's state (variables) -----*/
let board; // array of 4 elements
let gameStatus; // null -> game in progress, 'L' is loser
let ignoreClick; // ignore clicks while progression plays
let timing; 
let winningSequence; // empty array for winning sequence
let round;
let playerInput; // empty array for player clicks
let clickCounter;

/*----- cached element references -----*/
// board
const blockEls = [...document.querySelectorAll('#board > div')];

// message
const msgEl = document.getElementById('msg');

// buttons
const startBtn = document.getElementById('start');
const replayBtn = document.getElementById('reset');


/*----- event listeners -----*/
startBtn.addEventListener('click', handleStartGame);
replayBtn.addEventListener('click', handleReplay);
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
    startBtn.style.visibility = 'visible';
    playerInput = [];
    clickCounter = 0;
    render();
}

function render() {
    blockEls.forEach(function(blockEl, idx) {
        blockEl.style.backgroundColor = COLOR_LOOKUP[board[idx]];
    });
    renderMessage();
    replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
}

function renderMessage() {
    if (gameStatus === null) {
        msgEl.innerHTML = 'Simon says, "follow my lead"!';
      } else  {
        msgEl.innerHTML = 'Too bad... you could NOT keep up!';
      }
}

function playWinningSequence() {
    ignoreClick = true;
    let keyIdx = 0;
    const timerId = setInterval(function() {
        const keyEl = blockEls[winningSequence[keyIdx]];
        keyEl.style.backgroundColor = gameSequence[winningSequence[keyIdx]].color;
        gameSequence[winningSequence[keyIdx]].audio.play();
        setTimeout(function() {
            keyEl.style.backgroundColor = 'grey';
        }, LIT_TIME);
        keyIdx++;
        if (keyIdx === winningSequence.length) {
            clearInterval(timerId);
            setTimeout(function() {
                ignoreClick = false;
            }, LIT_TIME);
        }
    }, (LIT_TIME + GAP_TIME));
}


function handleStartGame(evt) {
    generateWinningSequence();
    startBtn.style.visibility =  'hidden';
    playWinningSequence();
}


function handleReplay(evt) {
    init();
}


function generateWinningSequence (cb) {
    round++;
    winningSequence.push(Math.floor(Math.random() * gameSequence.length));
    console.log(winningSequence);
}


function handlePlayerInput(event) {
    if (ignoreClick) return;
    playerInput.push(parseInt(event.target.id));
    compareSequence(event.target.id);
    clickCounter++;
    if (event.target.tagName === 'DIV') {
        event.target.style.backgroundColor = gameSequence[event.target.id].color;
        gameSequence[event.target.id].audio.play();
        setTimeout(function() {
            event.target.style.backgroundColor = 'grey';
        }, LIT_TIME);
    } 
    if (clickCounter === winningSequence.length) {
        clickCounter = 0;
        playerInput = [];
        generateWinningSequence();
        playWinningSequence();
    }
}


function compareSequence(num) {
    if (playerInput[clickCounter] === winningSequence[clickCounter]) {
        console.log('match');
        gameStatus = null;
    } else {
        console.log('loser');  
        gameStatus = 'L';
        renderMessage; 
        render(replayBtn);
        ignoreClick = false;
        winningSequence = [];
        return;
    }
}
