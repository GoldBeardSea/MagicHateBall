'use strict';
let anagramArray = [];
let userObjArray = JSON.parse(localStorage.getItem('endState'));
let keyWord = userObjArray[0].keyWord;

function renderResultsList() {
  console.log(userObjArray);
  let ulEl = document.getElementById('renderHate');
  for (let i in userObjArray[0].questions) {
    let liEl = document.createElement('li');
    liEl.textContent = userObjArray[0].questions[i];
    ulEl.appendChild(liEl);
  }
} renderResultsList();



// document.getElementById('anagramSubmit').addEventListener('click', anagramQuery);
