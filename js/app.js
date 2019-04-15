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
  // todo

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
