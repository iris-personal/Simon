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


/*----- event listeners -----*/


/*----- functions -----*/