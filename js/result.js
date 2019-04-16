'use strict';
let anagramArray = ['i', 'e', 'g', 'h', 't'];
let userObjArray = JSON.parse(localStorage.getItem('endState'));
let userQuery = document.getElementById('anagramQuery');




function renderResultsList() {
  console.log(userObjArray);
  let ulEl = document.getElementById('renderHate');
  for (let i in userObjArray[0].questions) {
    let liEl = document.createElement('li');
    liEl.textContent = userObjArray[0].questions[i];
    ulEl.appendChild(liEl);
  }
  let pEl = document.getElementById('anagramResult');
  pEl.textContent = anagramArray.join('');
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
