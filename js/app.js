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
  if(userObjArray[0].score >= 80){
    //positive
    var positiveArray = [
      'That is… a good question',
      'I hate to admit it, but the odds are good.',
      'If I have to say yes, then yes.',
      'You’ve caught me on a good day, so yes.',
      'Hmmm… why not?',
      'If that turns out to be yes, I owe you a drink',
      'Well, well, the odds are ever in your favor.',
      'I guess so.',
      'Sure, why you asking me that for?',
      'Sure, whatever, just stop shaking the ball.'
    ];
    var chosenPositiveArray = [Math.floor(Math.random() * positiveArray.length)];
    console.log('positive answer');
    return positiveArray[chosenPositiveArray] + ' ' + questionCounter;
  }else if(userObjArray[0].score >= 40){
    //neutral
    var neutralArray = [
      'This question makes me uncomfortable',
      'Why do you want to know?',
      'Huh. I have no answer for that.',
      'Let me think about that',
      'I want to say maybe, but i don’t know',
      'Ask me that another day',
      'I’m going to let you slide with that one',
      'I’m not going to tell your Mom you asked that. ',
      'Let’s change the subject, please.',
      'Whew….I thought you were going to ask me something else.'
    ];
    var chosenNeutralArray = [Math.floor(Math.random() * neutralArray.length)];
    console.log('neutral answer');
    return neutralArray[chosenNeutralArray] + ' ' + questionCounter;
  }else if(userObjArray[0].score >= 0){
    //negative
    var negativeArray = [
      'Did you really ask that?',
      'I am judging you so hard right now.',
      'Are you trying to make me angry right now?',
      'Did I ever tell you I don’t like you?',
      'Why are you being such a moron right now?',
      'SMH……. WHAT!!!!!!',
      'Please tell me, why??',
      'Leave me alone!',
      'One more question like that i’m ending this game.',
      'I can’t with you right now. I just can’t.'
    ];
    var chosenNegativeArray = [Math.floor(Math.random() * negativeArray.length)];
    console.log('negative answer');
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
    percentageCalclulator(userSubmission);
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
  console.log(`user score is: ${userObjArray[0].score}`);
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
