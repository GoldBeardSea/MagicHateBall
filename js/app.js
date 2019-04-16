'use strict';

var userObjArray = [];
var userQuery = document.getElementById('userQuestion');
var questionCounter = 9;


function User(name) {
  this.name = name;
  this.score = 0;
  this.questions = [];
  this.key = 'eight';
  userObjArray.push(this);
}

function choiceGenerator() {
  var hateBallPositive = ['Good'];
  var hateBallNegative =['Negative'];
  var hateBallNeutral = ['Neutral'];
  var hateBallChoices = [hateBallPositive,hateBallNeutral,hateBallNegative];
  var choiceArray = hateBallChoices[Math.floor(Math.random() * hateBallChoices.length)];
  var choiceSelect = [Math.floor(Math.random() * choiceArray.length)];
  return choiceArray[choiceSelect] + ' ' + questionCounter;
}

let handleQuery = function (event) {
  event.preventDefault();
  let userSubmission = userQuery.value;
  if (questionCounter > 8) {
    new User(userSubmission);
    questionCounter--;
  } else {
    questionCounter--;
    userObjArray[0].questions.push(userSubmission);
    renderResponse();
  }
  if (questionCounter === 0) {
    localStorage.setItem('endState', JSON.stringify(userObjArray));
    questionCounter = 9;
    window.location.href = 'results.html';
  }

};

function renderResponse() {
  let responseContent = document.getElementById('hateballResponse');
  responseContent.textContent = choiceGenerator();
}

document.getElementById('submit').addEventListener('click', handleQuery);
