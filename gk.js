function openHome() {
  window.location.href = "index.html";
}

let quizData = [
{
  q: "Which Article of Indian Constitution deals with Right to Equality?",
  options: ["Article 12","Article 14","Article 19","Article 21"],
  answer: "Article 14"
},
{
  q: "The Tropic of Cancer passes through how many Indian states?",
  options: ["6","7","8","9"],
  answer: "8"
},
{
  q: "Who is known as the father of Indian nuclear program?",
  options: ["A. P. J. Abdul Kalam","Homi J. Bhabha","Vikram Sarabhai","C. V. Raman"],
  answer: "Homi J. Bhabha"
},
{
  q: "Which river is known as the ‘Sorrow of Bihar’?",
  options: ["Ganga","Kosi","Ghaghara","Son"],
  answer: "Kosi"
},
{
  q: "The headquarters of UNESCO is located at?",
  options: ["New York","Geneva","Paris","London"],
  answer: "Paris"
},
{
  q: "Who was the first Indian to win a Nobel Prize?",
  options: ["C. V. Raman","Mother Teresa","Rabindranath Tagore","Hargobind Khorana"],
  answer: "Rabindranath Tagore"
},
{
  q: "Which schedule of Indian Constitution deals with division of powers?",
  options: ["7th Schedule","8th Schedule","9th Schedule","10th Schedule"],
  answer: "7th Schedule"
},
{
  q: "What is the SI unit of electric resistance?",
  options: ["Ampere","Volt","Ohm","Watt"],
  answer: "Ohm"
},
{
  q: "Which country has the longest coastline in the world?",
  options: ["Russia","Australia","Canada","USA"],
  answer: "Canada"
},
{
  q: "Who appoints the Chief Election Commissioner of India?",
  options: ["Prime Minister","President","Parliament","Supreme Court"],
  answer: "President"
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
      <p class="one"><b>Q${index + 1}:</b> ${item.question}</p>
      <p class="two">❌ Your Answer: ${item.selected}</p>
      <p class="three">✅ Correct Answer: ${item.correct}</p>
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