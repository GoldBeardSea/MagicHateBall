'use strict';

const userObjArray = JSON.parse(localStorage.getItem('endState'));
let userQuery = document.getElementById('anagramQuery');
var anagramGratzBox = document.getElementById('anagramGratzBox');
var anagramForm = document.getElementById('anagramForm');

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
function renderResultsList() {
  console.log(userObjArray);
  let ulEl = document.getElementById('renderHate');
  for (let i in userObjArray[0].questions) {
    let liEl = document.createElement('li');
    liEl.textContent = userObjArray[0].questions[i];
    ulEl.appendChild(liEl);
  }
  let pEl = document.getElementById('anagramResult');
  var scrambledKey = scrambleWord(userObjArray[0].key);
  pEl.textContent = scrambledKey;
}

//this anagramQuery handles
let anagramQuery = function (event) {
  event.preventDefault();

  var anagramGratzText = document.getElementById('anagramGratzText');
  var tryAgainButton = document.getElementById('tryAgain');

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

renderResultsList();
document.getElementById('anagramSubmit').addEventListener('click', anagramQuery);
document.getElementById('playAgain').addEventListener('click', playAgain);
