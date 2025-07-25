// main.js - Identity Game logic
// Handles question flow, answer collection, and result display

// List of dynamic, fun, and engaging questions for the game
const questions = [
  "🌌 If you could have any superpower for a day, what would it be and how would you use it?",
  "🚀 You just won a ticket to travel anywhere in the universe. Where do you go and why?",
  "🎭 If your life was a movie, what would its title be?",
  "🦸‍♂️ Who is your real-life hero, and what makes them special to you?",
  "🎨 If you could instantly master any skill or art, what would you choose?",
  "🕹️ What game (video, board, or sport) do you think best represents your personality?",
  "🧩 What’s a quirky habit or trait that makes you unique?",
  "⏳ If you could relive one day in your life, which would it be and why?",
  "🌠 What’s your wildest dream or ambition for the future?",
  "🤖 If you could ask an all-knowing AI one question about yourself, what would you want to know?"
];

let currentQuestion = 0; // Tracks which question the user is on
const answers = [];      // Stores user answers

// Get references to DOM elements
const introScreen = document.getElementById('intro-screen');
const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const nextBtn = document.getElementById('next-btn');
const resultDiv = document.getElementById('result');

// Display the current question and input box
function showQuestion(index) {
  questionContainer.textContent = questions[index];
  questionContainer.classList.remove('hidden');
  answerContainer.innerHTML = `<input type="text" id="answer-input" placeholder="Type your answer..." autofocus />`;
  answerContainer.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
  resultDiv.classList.add('hidden');
}

// Show the result after all questions are answered
function showResult() {
  questionContainer.textContent = '';
  answerContainer.innerHTML = '';
  questionContainer.classList.add('hidden');
  answerContainer.classList.add('hidden');
  nextBtn.classList.add('hidden');
  // Placeholder for AI logic
  resultDiv.textContent = "Analyzing your answers...\nYou are a mysterious cosmic traveler!";
  resultDiv.classList.remove('hidden');
}

// Handle Next button click
nextBtn.addEventListener('click', () => {
  const input = document.getElementById('answer-input');
  if (!input.value.trim()) return; // Ignore empty answers
  answers.push(input.value.trim());
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
});

// Handle Start Game button click
if (startBtn) {
  startBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    showQuestion(currentQuestion);
  });
}
