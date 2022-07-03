/*----- constants -----*/
// TODO: update color pallette
const COLOR_LOOKUP = {
    1: 'red',
    2: 'yellow',
    3: 'blue',
    4: 'green',
    null: 'grey'
}

// TODO: find audio files & make sure work
const audio1 = new Audio('https://freesound.org/s/3515/');
const audio2 = new Audio('https://freesound.org/s/3516/');
const audio3 = new Audio('https://freesound.org/s/3517/');
const audio4 = new Audio('https://freesound.org/s/3518/');

const AUDIO_LOOKUP = {
    1: `${audio1}`,
    2: `${audio2}`,
    3: `${audio3}`,
    4: `${audio4}`,
} 

/*----- app's state (variables) -----*/
let board; // array of 4 elements
let gameStatus; // null -> game in progress, 'L' is loser
let ignoreClick; // ignore clicks while progression plays
let timing; //

/*----- cached element references -----*/
const blockEls = [...document.querySelectorAll('#board > div')];
const msgEl = document.getElementById('msg');
const replayBtn = document.querySelector('button');
const mainEl = document.querySelector('main');

/*----- event listeners -----*/
mainEl.addEventListener('click', handleChoice);

/*----- functions -----*/
init();

function init() {
    board = [
        null, null, null, null
    ];
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
        msgEl.innerHTML = 'Simon says, "follow my lead"!';
      } else  {
        msgEl.innerHTML = 'Too bad... you could NOT keep up!';
      }
}

function handleChoice(evt) {
    //guards
    if (evt.target !== replayBtn || ignoreClick) return;
    ignoreClick = true;
    gameStatus = null;
    render();
    
   //if ()
    // the gameStatus is L, then render message and allow evt target to be the button 
    gameStatus = 'L';
    ignoreClick = false;
    render();
}

function getRandomColor(cb) {
    const color = Object.keys(COLOR_LOOKUP);
    const rndIdx = Math.floor(Math.random() * color.length);
    return color[rndIdx];
}