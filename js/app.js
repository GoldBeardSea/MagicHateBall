'use strict';

var userObjArray = [];
var userQuery = document.getElementById('userQuestion');
var questionCounter = 8;
userObjArray =

function User(name) {
  this.name = name;
  this.score = 0;
  this.questions = [];
  userObjArray.push(this);
};



function choiceGenerator() {
  var hateBallPositive = [];
  var hateBallNegative =[];
  var hateBallNeutral = [];
  var hateBallChoices = [hateBallPositive,hateBallNeutral,hateBallNegative];
  var choiceArray = hateBallChoices[Math.floor(Math.random() * hateBallChoices.length)];
  var choiceSelect = [Math.floor(Math.random() * choiceArray.length)];
  response.push(choiceArray[choiceSelect]);
  return choiceArray[choiceSelect];

}

function handleQuery (event) {
  // todo
}

function renderResponse(response) {
  // todo
}

function renderResultsList() {
  // todo
}

document.getElementById('submit').addEventListener('click', handleQuery);
