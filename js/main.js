/*----- constants -----*/
// TODO: update color pallette
const COLOR_LOOKUP = {
    1: 'red',
    2: 'yellow',
    3: 'blue',
    4: 'green',
    null: 'grey'
}

const AUDIO_LOOKUP = {
    1: `${audio1}`,
    2: `${audio2}`,
    3: `${audio3}`,
    4: `${audio4}`,
} 

// TODO: find audio files
const audio1 = new Audio('');
const audio2 = new Audio('');
const audio3 = new Audio('');
const audio4 = new Audio('');

/*----- app's state (variables) -----*/
let board; // array of 4 elements 
let loser; // boolean
let gameStatus; // null -> game in progress
let ignoreClick; // ignore clicks while progression plays
let timing; //

/*----- cached element references -----*/
const blockEls = [...document.querySelectorAll('#board > div')];
const msgEl = document.querySelector('h2');
const replayBtn = document.querySelector('button');

/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    board = [
        null, null, null, null
    ];
    loser = false;
    gameStatus = null;
    ignoreClick = false;
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
        msgEl.innerHTML = 'Simon says follow my lead';
      } else  {
        msgEl.textContent = 'Too bad... you could NOT keep up!';
      }
}