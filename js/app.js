'use strict';

var userObjArray = [];
var userQuery = document.getElementById('userQuestion');
var eightBall = document.getElementById('eightball'); //added for animation for eight ball
var questionCounter = 9;
var thisRoundMagicWord;


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
    renderResultsList();
  }
  // added for eight ball animation
  if(userSubmission !== 'undefined'){
    eightBall.classList.add('apply-shake');
  }

  percentageCalclulator(userSubmission);
  userQueryHandler(); // reset the animation
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

// Game Logic:

function percentageCalclulator (questionString){

  var matchingLetters = 0;
  var currentScore = 0;

  if (thisRoundMagicWord === null){
    randomMagicWord();
  }

  for (var i = 0; i < questionString.length; i++){
    for (var j = 0; j < thisRoundMagicWord.length; j++){
      if(questionString[i] === thisRoundMagicWord[j]){
        var capLetter = questionString.charAt(i).toUpperCase();
        questionString = questionString.slice(0, i) + capLetter + questionString.slice(i+1, questionString.length);
        matchingLetters++;
      }
    }
  }

  currentScore = Math.round((matchingLetters / questionString.length) * 100);

  if (userObjArray[0].score === 0){
    userObjArray[0].score = currentScore;
  } else {
    userObjArray[0].score = Math.round((userObjArray[0].score + currentScore) / 2);
  }
}

function randomMagicWord() {
  var magicWords = ['eight', 'hate','irate','angry','pear', 'spite','insult','injury'];

  console.log(`Magic words length: ${magicWords.length}`);
  thisRoundMagicWord = magicWords[Math.floor(Math.random() * magicWords.length)];

  console.log(`thisRoundMagicWord: ${thisRoundMagicWord}`);
}
// function to reset the animation
let userQueryHandler = function(event){
  event.preventDefault();
  eightBall.classList.remove('apply-shake');
};
//Execute on Load:
randomMagicWord();
// function renderResultsList() {
//   let ulEl = document.getElementById('renderHate');
//   for (let i in userObjArray[0].questions) {
//     let liEl = document.createElement('li');
//     liEl.textContent = userObjArray[0].questions[i];
//     ulEl.appendChild(liEl);
//   }
// }
document.getElementById('submit').addEventListener('click', handleQuery);
userQuery.addEventListener('change', userQueryHandler);
