function openHome() {
  window.location.href = "index.html";
}

let quizData = [
{
  q: "Solve: 2x + 3 = 11",
  options: ["x = 3","x = 4","x = 5","x = 6"],
  answer: "x = 4"
},
{
  q: "Find HCF of 12 and 18",
  options: ["3","6","9","12"],
  answer: "6"
},
{
  q: "Find LCM of 4 and 6",
  options: ["6","8","10","12"],
  answer: "12"
},
{
  q: "Value of √144?",
  options: ["10","11","12","13"],
  answer: "12"
},
{
  q: "Solve: x² = 25",
  options: ["x = 5","x = −5","x = ±5","x = 0"],
  answer: "x = ±5"
},
{
  q: "Distance formula is?",
  options: ["√(x²+y²)","√[(x₂−x₁)²+(y₂−y₁)²]","(x₂−x₁)/(y₂−y₁)","x₁y₁+x₂y₂"],
  answer: "√[(x₂−x₁)²+(y₂−y₁)²]"
},
{
  q: "Sum of angles of a triangle?",
  options: ["90°","180°","270°","360°"],
  answer: "180°"
},
{
  q: "If sin A = 1/2, then A = ?",
  options: ["30°","45°","60°","90°"],
  answer: "30°"
},
{
  q: "Area of circle formula?",
  options: ["2πr","πr²","πd","r²"],
  answer: "πr²"
},
{
  q: "If a = 2, find a² + 2a",
  options: ["6","8","10","12"],
  answer: "8"
}

];

let wrongAnswers = [];

let currentQuestion = 0;
let score = 0;

let questionEl = document.getElementById("question");
let optionsEl = document.getElementById("options");
let nextBtn = document.getElementById("nextBtn");
let skipBtn = document.getElementById("skipBtn");
let questionCount = document.getElementById("questionCount");
let skipCount = 0;
const SKIP_LIMIT = 2;

function loadQuestion() {
  let q = quizData[currentQuestion];
  questionCount.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;
  questionEl.innerText = q.q;

  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    let label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${opt}"> ${opt}`;
    optionsEl.appendChild(label);
  });

  nextBtn.disabled = true;

  let optionInputs = document.querySelectorAll('input[name="option"]');
  optionInputs.forEach(input => {
    input.addEventListener("change", () => {
      nextBtn.disabled = false;
    });
  });
}

function nextQuestion() {
  let selected = document.querySelector('input[name="option"]:checked');

  if (selected) {
    if (selected.value === quizData[currentQuestion].answer) {
      score++;
    } else {
      wrongAnswers.push({
        question: quizData[currentQuestion].q,
        correct: quizData[currentQuestion].answer,
        selected: selected.value
      });
    }

    skipCount = 0;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function skipQuestion() {
  if (skipCount >= SKIP_LIMIT) {
    alert("Skip limit khatam 😜 Ab answer dena padega");
    return;
  }

  skipCount++;

  wrongAnswers.push({
    question: quizData[currentQuestion].q,
    correct: quizData[currentQuestion].answer,
    selected: "Skipped"
  });

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function showWrongAnswers() {
  let html = `
    <button class="btn back-btn" onclick="showResultScreen()">← Back</button>
    <h3>Wrong Questions</h3>
  `;

  if (wrongAnswers.length === 0) {
    optionsEl.innerHTML = `
      <button class="btn back-btn" onclick="showResultScreen()">← Back</button>
      <p>Perfect score 🔥 No wrong answers!</p>
    `;
    return;
  }

  wrongAnswers.forEach((item, index) => {
    html += `
      <p><b>Q${index + 1}:</b> ${item.question}</p>
      <p>❌ Your Answer: ${item.selected}</p>
      <p>✅ Correct Answer: ${item.correct}</p>
      <hr>
    `;
  });

  optionsEl.innerHTML = html;
}

function finishQuiz() {
  showResultScreen();
  nextBtn.style.display = "none";
  skipBtn.style.display = "none";
}

function showResultScreen() {
  questionEl.innerText = "Quiz Finished 🎉";
  optionsEl.innerHTML = `
    <p>Your Score: ${score} / ${quizData.length}</p>
    <button class="btn" onclick="restartQuiz()">RESTART GAME</button>
    <button class="btn" onclick="showWrongAnswers()">WRONG ANSWERS</button>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  wrongAnswers = [];

  nextBtn.style.display = "inline-block";
  skipBtn.style.display = "inline-block";
  loadQuestion();
}

loadQuestion();