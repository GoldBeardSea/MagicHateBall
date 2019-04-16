'use strict';

var userObjArray = [];
var userQuery = document.getElementById('userQuestion');
var eightBall = document.getElementById('eightball'); //added for animation for eight ball
let responseContent = document.getElementById('hateballResponse');
var questionCounter = 9;
var thisRoundMagicWord;

function User(name, key) {
  this.name = name;
  this.score = 0;
  this.questions = [];
  this.key = key;
  userObjArray.push(this);
}

function choiceGenerator() {
  if(userObjArray[0].score >= 90){
    //positive
    var positiveArray = ['happy1', 'happy2', 'happy3'];
    var chosenPositiveArray = [Math.floor(Math.random() * positiveArray.length)];
    return positiveArray[chosenPositiveArray] + ' ' + questionCounter;
  }else if(userObjArray[0].score >= 70){
    //neutral
    var neutralArray = ['neutral1', 'neutral2', 'neutral3'];
    var chosenNeutralArray = [Math.floor(Math.random() * neutralArray.length)];
    return neutralArray[chosenNeutralArray] + ' ' + questionCounter;
  }else if(userObjArray[0].score >= 0){
    //negative
    var negativeArray = ['harsh1', 'harsh2', 'harsh3'];
    var chosenNegativeArray = [Math.floor(Math.random() * negativeArray.length)];
    return negativeArray[chosenNegativeArray] + ' ' + questionCounter;
  }
}

let handleQuery = function (event) {

  event.preventDefault();
  let userSubmission = userQuery.value;
  if (questionCounter > 8) {
    new User(userSubmission, thisRoundMagicWord);
    questionCounter--;
    responseContent.textContent = `Whatever, ${userSubmission}, let's get this show on the road, what are you 'questions'?`;
  } else {
    questionCounter--;
    // userObjArray[0].questions.push(userSubmission);
    renderResponse();
  }
  if (questionCounter === 0) {
    localStorage.setItem('endState', JSON.stringify(userObjArray));
    questionCounter = 9;
    window.location.href = 'results.html';
  }
  // added for eight ball animation
  if(userSubmission !== 'undefined'){
    eightBall.classList.add('apply-shake');
  }

  percentageCalclulator(userSubmission);
  userQueryHandler(); // reset the animation
};

function renderResponse() {
  responseContent.textContent = choiceGenerator();
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
  userObjArray[0].questions.push(questionString);
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

document.getElementById('submit').addEventListener('click', handleQuery);
userQuery.addEventListener('change', userQueryHandler);
