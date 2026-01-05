function openHome() {
  window.location.href = "index.html";
}

let quizData = [
{
  q: "Smallest unit of life is?",
  options: ["Atom","Cell","Tissue","Organ"],
  answer: "Cell"
},
{
  q: "Chemical formula of water?",
  options: ["CO₂","H₂O","O₂","H₂"],
  answer: "H₂O"
},
{
  q: "Which gas is essential for respiration?",
  options: ["Nitrogen","Hydrogen","Oxygen","Carbon dioxide"],
  answer: "Oxygen"
},
{
  q: "Speed of light is approximately?",
  options: ["3×10⁸ m/s","3×10⁶ m/s","3×10⁵ m/s","3×10⁴ m/s"],
  answer: "3×10⁸ m/s"
},
{
  q: "pH value of pure water is?",
  options: ["5","6","7","8"],
  answer: "7"
},
{
  q: "Which organ purifies blood in humans?",
  options: ["Heart","Liver","Kidney","Lungs"],
  answer: "Kidney"
},
{
  q: "Force = ?",
  options: ["Mass × Velocity","Mass × Acceleration","Velocity ÷ Time","Work ÷ Time"],
  answer: "Mass × Acceleration"
},
{
  q: "Which vitamin is produced in sunlight?",
  options: ["Vitamin A","Vitamin B","Vitamin C","Vitamin D"],
  answer: "Vitamin D"
},
{
  q: "Boiling point of water is?",
  options: ["90°C","95°C","100°C","110°C"],
  answer: "100°C"
},
{
  q: "Which metal is liquid at room temperature?",
  options: ["Iron","Mercury","Aluminium","Copper"],
  answer: "Mercury"
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