'use strict';

var userObjArray = [];
var userQuery = document.getElementById('userQuestion');
var questionCounter = 9;


function User(name) {
  this.name = name;
  this.score = 0;
  this.questions = [];
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
    renderResultsList();
  }

};

function renderResponse() {
  let responseContent = document.getElementById('hateballResponse');
  responseContent.textContent = choiceGenerator();
}

function renderResultsList() {
  let ulEl = document.getElementById('renderHate');
  for (let i in userObjArray[0].questions) {
    let liEl = document.createElement('li');
    liEl.textContent = userObjArray[0].questions[i];
    ulEl.appendChild(liEl);
  }
}
document.getElementById('submit').addEventListener('click', handleQuery);

renderResultsList();
