'use strict';
let anagramArray = ['i', 'e', 'g', 'h', 't'];
const userObjArray = JSON.parse(localStorage.getItem('endState'));
let userQuery = document.getElementById('anagramQuery');



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
  pEl.textContent = anagramArray.join('');
} renderResultsList();

//this anagramQuery handles
let anagramQuery = function (event) {
  event.preventDefault();
  let condition = userQuery.value;
  if (condition === userObjArray[0].key) {
    alert('You got it');
  } else {
    //code here for failure
  }

};

document.getElementById('anagramSubmit').addEventListener('click', anagramQuery);
