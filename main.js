// main.js - Identity Game logic
// Handles question flow, answer collection, and result display


// Pool of questions with types and options
const questionPool = [
  {
    text: "🌌 Pick a superpower:",
    type: "dropdown",
    options: ["Invisibility", "Flight", "Telepathy", "Time Travel", "Super Strength", "Shape-shifting"]
  },
  {
    text: "🚀 Where would you travel?",
    type: "dropdown",
    options: ["The Moon", "Mars", "A distant galaxy", "The bottom of the ocean", "A fantasy world", "Home"]
  },
  {
    text: "🎭 Your life is a movie! Pick a genre:",
    type: "multiple",
    options: ["Comedy", "Drama", "Action", "Sci-Fi", "Romance", "Documentary"]
  },
  {
    text: "🦸‍♂️ Who is your real-life hero?",
    type: "text"
  },
  {
    text: "🎨 Instantly master any skill:",
    type: "dropdown",
    options: ["Music", "Art", "Sports", "Coding", "Cooking", "Languages"]
  },
  {
    text: "🕹️ Which game best represents you?",
    type: "multiple",
    options: ["Chess", "Mario Kart", "Minecraft", "Among Us", "Monopoly", "Tag"]
  },
  {
    text: "🧩 What's a quirky habit you have?",
    type: "text"
  },
  {
    text: "⏳ Relive one day in your life:",
    type: "text"
  },
  {
    text: "🌠 Your wildest dream for the future:",
    type: "text"
  },
  {
    text: "🤖 Ask the AI one thing about yourself:",
    type: "text"
  },
  {
    text: "� Favorite food:",
    type: "dropdown",
    options: ["Pizza", "Sushi", "Burgers", "Salad", "Tacos", "Ice Cream"]
  },
  {
    text: "🎵 Favorite music genre:",
    type: "dropdown",
    options: ["Pop", "Rock", "Classical", "Jazz", "Hip-Hop", "EDM"]
  },
  {
    text: "🌎 Where do you feel most at home?",
    type: "dropdown",
    options: ["City", "Mountains", "Beach", "Countryside", "Online", "Anywhere"]
  },
  {
    text: "💬 How do you prefer to communicate?",
    type: "multiple",
    options: ["Text", "Voice", "Video", "In-person", "Meme", "Emoji"]
  },
  {
    text: "💖 Relationship status:",
    type: "dropdown",
    options: ["Single", "In a relationship", "It's complicated", "Married", "Prefer not to say"]
  }
];

// Pick 5 random questions for this session
function pickRandomQuestions(pool, n) {
  const shuffled = pool.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

const questions = pickRandomQuestions(questionPool, 5);


let currentQuestion = 0; // Tracks which question the user is on
const answers = [];      // Stores user answers

// Get references to DOM elements
const introScreen = document.getElementById('intro-screen');
const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');
const gameControls = document.getElementById('game-controls');
const resultDiv = document.getElementById('result');

// Display the current question and input box
function showQuestion(index) {
  const q = questions[index];
  questionContainer.textContent = q.text;
  questionContainer.classList.remove('hidden');
  answerContainer.classList.remove('hidden');
  gameControls.classList.remove('hidden');
  resultDiv.classList.add('hidden');

  // Render input based on type
  if (q.type === 'text') {
    answerContainer.innerHTML = `<input type="text" id="answer-input" placeholder="Type your answer..." autofocus />`;
  } else if (q.type === 'dropdown') {
    answerContainer.innerHTML = `<select id="answer-input">${q.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
  } else if (q.type === 'multiple') {
    answerContainer.innerHTML = q.options.map(opt => `
      <label style="margin-right:1em;">
        <input type="radio" name="answer-multi" value="${opt}"> ${opt}
      </label>
    `).join('');
  }
}

// Show the result after all questions are answered
function showResult() {
  questionContainer.textContent = '';
  answerContainer.innerHTML = '';
  questionContainer.classList.add('hidden');
  answerContainer.classList.add('hidden');
  gameControls.classList.add('hidden');

  // --- Mock AI logic for fun personality ---
  // (In a real app, you would call an API here)
  const foods = ["Pizza", "Sushi", "Burgers", "Salad", "Tacos", "Ice Cream"];
  const music = ["Pop", "Rock", "Classical", "Jazz", "Hip-Hop", "EDM"];
  const cities = ["New York", "London", "Tokyo", "Paris", "Sydney", "Cape Town", "Toronto"];
  const relationship = ["Single", "In a relationship", "It's complicated", "Married", "Prefer not to say"];
  const ages = ["teenager", "young adult", "adult", "mature adult"];
  const genders = ["male", "female", "non-binary", "other"];

  // Use answers to "guess" (random for demo)
  const guess = {
    age: ages[Math.floor(Math.random() * ages.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    location: cities[Math.floor(Math.random() * cities.length)],
    relationship: relationship[Math.floor(Math.random() * relationship.length)]
  };

  // Fun personality summary
  const summary = `🌟 <b>Personality Type:</b> <i>Galactic Dreamer</i><br>
  <b>Estimated Age:</b> ${guess.age}<br>
  <b>Likely Gender:</b> ${guess.gender}<br>
  <b>Location:</b> ${guess.location}<br>
  <b>Relationship Status:</b> ${guess.relationship}<br><br>
  <b>What we learned about you:</b><br>
  <ul>${answers.map((a, i) => `<li>Q${i+1}: ${a ? a : '<i>Skipped</i>'}</li>`).join('')}</ul>
  <p>Thanks for playing! Share your cosmic results with a friend 🚀</p>`;

  resultDiv.innerHTML = summary;
  resultDiv.classList.remove('hidden');
}


// Handle Next button click
nextBtn.addEventListener('click', () => {
  const q = questions[currentQuestion];
  let value = '';
  if (q.type === 'text') {
    value = document.getElementById('answer-input').value.trim();
  } else if (q.type === 'dropdown') {
    value = document.getElementById('answer-input').value;
  } else if (q.type === 'multiple') {
    const checked = answerContainer.querySelector('input[name="answer-multi"]:checked');
    value = checked ? checked.value : '';
  }
  answers.push(value);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
});

// Handle Skip button click
skipBtn.addEventListener('click', () => {
  answers.push(''); // Empty answer for skipped
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
