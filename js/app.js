'use strict';

var userObjArray = [];
var userQuery = document.getElementById('userQuestion').value;
var questionCounter = 9;

function User(name) {
  this.name = name;
  this.score = 0;
  this.questions = [];
  userObjArray.push(this);
}

function choiceGenerator() {
  var hateBallPositive = [];
  var hateBallNegative =[];
  var hateBallNeutral = [];
  var hateBallChoices = [hateBallPositive,hateBallNeutral,hateBallNegative];
  var choiceArray = hateBallChoices[Math.floor(Math.random() * hateBallChoices.length)];
  var choiceSelect = [Math.floor(Math.random() * choiceArray.length)];
  return choiceArray[choiceSelect];
}

let handleQuery = function (event) {
  event.preventDefault();
  let formEl = event.target;
  if (questionCounter > 8) {
    let newUser = new User(formEl.userQuestion.value);
    console.log(newUser);
  }
};

// function renderResponse(response) {
// todo
// }

// function renderResultsList() {
// todo
// }

document.getElementById('submit').addEventListener('click', handleQuery);
