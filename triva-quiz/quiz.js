const options = document.getElementsByClassName("options")[0];
const ops = [...options.children];
let count = 0;
let score = 0;
let x;

fetch("https://the-trivia-api.com/v2/questions", {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    OnMount(data);
    x = data;
  })
  .catch((error) => console.log(error));

const nextBtn = document.getElementById("nextBtn");
const div = document.getElementById("questions");
const category = document.getElementById("categories")

nextBtn.addEventListener("click", function () {
  count++;
  calculateScore(x);
  OnMount(x);
});
let index = 0;

function OnMount(data) {
    let answers = data[count].incorrectAnswers;
    let randomNumber = Math.floor(Math.random() * 4)
    answers.splice(randomNumber,0,data[count].correctAnswer);
    category.textContent = data[count].category
    div.textContent = `${++index}.  ${data[count].question.text}`;

    ops[0].textContent = answers[0];
    ops[1].textContent = answers[1];
    ops[2].textContent = answers[2];
    ops[3].textContent = answers[3];
}

ops.forEach((item) => {
  item.addEventListener("click", function (event) {
    let selectedOption = event.target.textContent;
    calculateScore(selectedOption);
  });
});

const body = document.body;

function calculateScore(selectedOption) {
  if (count > 9) {
    let popUp = document.getElementById("popup");
    popUp.classList.add("open_popUp");
  let scores =  document.getElementById("score");
   scores.textContent = "CONGRATULATION!!! \n Your Final Score is: " + score + "/" + "10";

  let restartBtn = document.getElementById("restart");
  restartBtn.style.visibility = "visible";
  }
  if (selectedOption == x[count].correctAnswer) {
    score += 1;
  }
}

function closePopUp(){
  window.location = href="../index.html"
}

function restart(){
    window.location.reload()
}