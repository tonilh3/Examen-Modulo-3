const questions = [
  {
    text: "¿Capital de Francia?",
    options: ["Madrid", "París", "Roma", "Berlín"],
    correct: 1
  },
  {
    text: "¿Lenguaje usado para la web?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correct: 2
  },
  {
    text: "¿Planeta rojo?",
    options: ["Venus", "Marte", "Júpiter", "Saturno"],
    correct: 1
  },
  {
    text: "¿Año llegada del hombre a la Luna?",
    options: ["1965", "1969", "1972", "1959"],
    correct: 1
  },
  {
    text: "¿Sistema operativo de Google?",
    options: ["Windows", "iOS", "Android", "Linux"],
    correct: 2
  },
  {
    text: "¿Animal más rápido?",
    options: ["León", "Guepardo", "Águila", "Tigre"],
    correct: 1
  },
  {
    text: "¿Resultado 5 x 6?",
    options: ["11", "30", "56", "25"],
    correct: 1
  },
  {
    text: "¿Autor de Don Quijote?",
    options: ["Lorca", "Cervantes", "Quevedo", "Góngora"],
    correct: 1
  },
  {
    text: "¿Continente más grande?",
    options: ["África", "Europa", "Asia", "América"],
    correct: 2
  },
  {
    text: "¿HTML es…?",
    options: ["Lenguaje de programación", "Base de datos", "Lenguaje de marcado", "Sistema operativo"],
    correct: 2
  }
];

let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const resultScreen = document.getElementById("result-screen");

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  feedbackEl.textContent = "";

  const q = questions[currentQuestion];
  questionEl.textContent = q.text;
  progressText.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.onclick = () => checkAnswer(btn, index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(button, index) {
  if (answered) return;
  answered = true;

  const correctIndex = questions[currentQuestion].correct;
  const buttons = document.querySelectorAll(".option");

  if (index === correctIndex) {
    button.classList.add("correct");
    feedbackEl.textContent = "¡Correcto!";
    correctAnswers++;
  } else {
    button.classList.add("incorrect");
    buttons[correctIndex].classList.add("correct");
    feedbackEl.textContent = "Incorrecto";
    incorrectAnswers++;
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

function showResults() {
  document.querySelector(".quiz-container").children[1].classList.add("hidden");
  questionEl.classList.add("hidden");
  optionsEl.classList.add("hidden");
  feedbackEl.classList.add("hidden");
  nextBtn.classList.add("hidden");

  resultScreen.classList.remove("hidden");

  const percentage = (correctAnswers / questions.length) * 100;

  document.getElementById("score-text").textContent =
    `${correctAnswers} de ${questions.length} respuestas correctas`;

  document.getElementById("percentage-text").textContent =
    `Porcentaje de acierto: ${percentage.toFixed(0)}%`;

  let message = "";
  if (correctAnswers <= 4) {
    message = "Necesitas repasar más";
  } else if (correctAnswers <= 7) {
    message = "¡Bien hecho! Vas por buen camino";
  } else {
    message = "¡Excelente! Dominas el tema";
  }

  document.getElementById("final-message").textContent = message;
}

document.getElementById("restart-btn").onclick = () => {
  currentQuestion = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  location.reload();
};

loadQuestion();
