'use strict';
let userObjArray = JSON.parse(localStorage.getItem('endState'));
let userQuery = document.getElementById('anagramQuery');

function scrambleWord(word){
  var unscrambled = word.split('');
  for(var i = word.length - 1; i > 0; i--){
    var scramble = Math.floor(Math.random() * (i + 1));
    var temp = unscrambled[i];
    unscrambled[i] = unscrambled[scramble];
    unscrambled[scramble] = temp;
  }
  var scrambled = unscrambled.join('');
  return scrambled;
}



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
} renderResultsList();

let anagramQuery = function (event) {
  event.preventDefault();
  let condition = userQuery.value;
  console.log(condition + ' ' + userObjArray[0].keyWord);
  if (condition === userObjArray[0].keyWord) {
    alert('You got it');
  }

};

document.getElementById('anagramSubmit').addEventListener('click', anagramQuery);
