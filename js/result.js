'use strict';


if(localStorage.getItem('endstate') === null){
  alert('Really, trying to see results without playing the game. Why are you wasting my time? Get out of here.');
  window.location.href = 'index.html';
}

const userObjArray = JSON.parse(localStorage.getItem('endState'));
let userQuery = document.getElementById('anagramQuery');

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
  let condition = userQuery.value;
  condition = condition.toLowerCase();
  if (condition === userObjArray[0].key) {
    alert('You got it');
  } else {
    alert('You suck I can\'t even look at you right now!');
  }
};

let playAgain = function(event){
  event.preventDefault();
  localStorage.clear();
  window.location.replace('index.html');
};

renderResultsList();
document.getElementById('anagramSubmit').addEventListener('click', anagramQuery);
document.getElementById('playAgain').addEventListener('click', playAgain);
