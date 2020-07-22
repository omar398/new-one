let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let submitButton = document.querySelector('.submit-button');
let quizArea = document.querySelector(".quiz-area");
let answersArea= document.querySelector(".answers-area");

let currentIndex = 0;
let rightAnswers = 0;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      createBullets(qCount);

      addQuestionData(questionsObject[currentIndex], qCount);

      handleBullets();
 
      submitButton.onclick = () =>{ 
        currentIndex++;
        console.log(currentIndex);
      } 
      }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullet.className = "on";
    }
    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullet);
  }
}
function addQuestionData(obj, count){
if(currentIndex < count){

 let question = document.createElement('h2')
question.appendChild(document.createTextNode(obj.title));
quizArea.appendChild(question);

for(i=1 ; i<=4 ; i++){
  let mainDiv = document.createElement("div");

  mainDiv.className = "answer";

  let radioInput = document.createElement('input');
  radioInput.name = "question";
  radioInput.type = "radio";
  radioInput.id = `answer_${i}`;
  radioInput.dataset.answer = obj[`answer_${i}`];

  if (i === 1) {
    radioInput.checked = true;
  }

  let theLabel = document.createElement('label');
  theLabel.appendChild(document.createTextNode(obj[`answer_${i}`]));
  mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      answersArea.appendChild(mainDiv);

}
}
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}