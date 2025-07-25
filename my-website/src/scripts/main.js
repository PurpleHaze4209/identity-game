const questions = [
  "What is your favorite color?",
  "What is your favorite hobby?",
  "What is your dream job?",
  "What is your favorite food?",
  "What is your favorite animal?",
  "What is your favorite movie genre?",
  "What is your favorite season?",
  "What is your favorite type of music?",
  "What is your favorite place to visit?",
  "What is your biggest goal?"
];

let currentQuestion = 0;
const answers = [];

const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');

function showQuestion(index) {
  questionContainer.textContent = questions[index];
  answerContainer.innerHTML = `<input type="text" id="answer-input" placeholder="Type your answer..." autofocus />`;
  nextBtn.classList.remove('hidden');
  resultDiv.classList.add('hidden');
}

function showResult() {
  questionContainer.textContent = '';
  answerContainer.innerHTML = '';
  nextBtn.classList.add('hidden');
  // Placeholder for AI logic
  resultDiv.textContent = "Analyzing your answers...\nYou are a mysterious cosmic traveler!";
  resultDiv.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  const input = document.getElementById('answer-input');
  if (!input.value.trim()) return;
  answers.push(input.value.trim());
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
});

// Start the game
showQuestion(currentQuestion);