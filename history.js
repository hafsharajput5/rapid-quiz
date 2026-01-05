function openHome() {
  window.location.href = "index.html";
}

let quizData = [
{
  q: "Who was the first President of India?",
  options: ["Jawaharlal Nehru","Dr. Rajendra Prasad","Sardar Patel","Dr. A. P. J. Abdul Kalam"],
  answer: "Dr. Rajendra Prasad"
},
{
  q: "Who founded the Maurya Empire?",
  options: ["Ashoka","Chandragupta Maurya","Bindusara","Harsha"],
  answer: "Chandragupta Maurya"
},
{
  q: "In which year did India get independence?",
  options: ["1945","1946","1947","1950"],
  answer: "1947"
},
{
  q: "Who was known as the Iron Man of India?",
  options: ["Mahatma Gandhi","Jawaharlal Nehru","Sardar Vallabhbhai Patel","Subhash Chandra Bose"],
  answer: "Sardar Vallabhbhai Patel"
},
{
  q: "Capital of Mughal Empire during Akbar's reign?",
  options: ["Delhi","Agra","Fatehpur Sikri","Lahore"],
  answer: "Fatehpur Sikri"
},
{
  q: "Who wrote the book ‘Arthashastra’?",
  options: ["Kalidasa","Chanakya","Tulsidas","Valmiki"],
  answer: "Chanakya"
},
{
  q: "Who started the Non-Cooperation Movement?",
  options: ["Subhash Chandra Bose","Bhagat Singh","Mahatma Gandhi","Jawaharlal Nehru"],
  answer: "Mahatma Gandhi"
},
{
  q: "Battle of Plassey was fought in?",
  options: ["1757","1764","1776","1857"],
  answer: "1757"
},
{
  q: "Who was the last Mughal emperor?",
  options: ["Aurangzeb","Bahadur Shah Zafar","Shah Jahan","Babur"],
  answer: "Bahadur Shah Zafar"
},
{
  q: "Indus Valley Civilization is also known as?",
  options: ["River Valley Civilization","Bronze Age Civilization","Harappan Civilization","Ancient Indian Civilization"],
  answer: "Harappan Civilization"
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