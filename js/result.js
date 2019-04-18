'use strict';

const userObjArray = JSON.parse(localStorage.getItem('endState'));
let userQuery = document.getElementById('anagramQuery');
var anagramGratzBox = document.getElementById('anagramGratzBox');
var anagramGratzText = document.getElementById('anagramGratzText');
var anagramForm = document.getElementById('anagramForm');
var tryAgainButton = document.getElementById('tryAgain');

var anagramCounter = 3;

function scrambleWord(word){
  var unscrambled = word.split('');
  do{
    for(var i = word.length - 1; i > 0; i--){
      var scramble = Math.floor(Math.random() * (i + 1));
      var temp = unscrambled[i];
      unscrambled[i] = unscrambled[scramble];
      unscrambled[scramble] = temp;
    }
    var scrambled = unscrambled.join('');
  } while(word === scrambled);
  return scrambled;
}

// this amends the list
function renderAnagram() {
  console.log(userObjArray);
  let hintEl = document.getElementById('anagramHint');
  let hint = document.createElement('p');
  hint.textContent = 'Hey clueless, this is an anagram. Its based on my magic word. Guess me.';
  hintEl.appendChild(hint);
  let pEl = document.getElementById('anagramResult');
  var scrambledKey = scrambleWord(userObjArray[0].key);
  pEl.textContent = scrambledKey;
  
}

//this anagramQuery handles
let anagramQuery = function (event) {
  event.preventDefault();

  let userGuess = userQuery.value;
  let correctAnswer = userObjArray[0].key;

  userGuess = userGuess.toLowerCase();

  if (userGuess === correctAnswer) {
    anagramGratzBox.style.display = 'block';
    anagramForm.style.display = 'none';
    anagramGratzText.textContent = 'Huh. You got it right.';
    anagramGratzBox.style.backgroundColor = '#1ca73a';
    tryAgainButton.style.display = 'none';
    anagramCounter--;
  } else {
    anagramGratzBox.style.display = 'block';
    anagramForm.style.display = 'none';
    anagramGratzText.textContent = 'Ha! Wrong.';
    anagramGratzBox.style.backgroundColor = '#d42a2a';
    anagramCounter--;

    //Show button or sorry depending on counter
    if (anagramCounter === 0 || anagramCounter < 0 ){
      anagramGratzText.textContent += ' No More Attempts';
      tryAgainButton.style.display = 'none';
    } else {
      anagramGratzText.textContent += ` ${anagramCounter} attempts remaining`;
    }
  }
};

//Called directly by Try Again button
function tryAnagramAgain() {
  anagramGratzBox.style.display = 'none';
  anagramForm.style.display = 'block';
}

let playAgain = function(event){
  event.preventDefault();
  localStorage.clear();
  window.location.replace('index.html');
};

let didNotAskQuestions = function(){
  if(!localStorage.getItem('endState')){
    anagramGratzBox.style.display = 'block';
    anagramForm.style.display = 'none';
    anagramGratzText.textContent = 'You did not ask any questions. Please go back and play the game.';
    tryAgainButton.style.display = 'none';
  }
};

function giveHint() {
  let hintEl = document.getElementById('hintParagraph');
  let hintParagraphEl = document.createElement('p');
  hintParagraphEl.textContent = 'Since apparently you can\'t figure it out, I guess I\'ll have to help you. Look at your questions. See something different? Look to that for inspiration. And don\'t waste my time asking for more help.';
  hintEl.appendChild(hintParagraphEl);
  let ulEl = document.getElementById('renderHate');
  for (let i in userObjArray[0].questions) {
    let liEl = document.createElement('li');
    liEl.textContent = userObjArray[0].questions[i];
    ulEl.appendChild(liEl);
  }
  document.getElementById('hint').removeEventListener('click', giveHint);
}

didNotAskQuestions();
renderAnagram();

document.getElementById('anagramSubmit').addEventListener('click', anagramQuery);
document.getElementById('playAgain').addEventListener('click', playAgain);
document.getElementById('hint').addEventListener('click', giveHint);
