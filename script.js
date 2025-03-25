const loginContainer = document.querySelector('.login-container');
const quizContainer = document.querySelector('.quiz-container');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const startQuizButton = document.getElementById('start-quiz');

const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["background-color", "font-size", "color", "text-align"],
        answer: "color"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<hyperlink>", "<url>"],
        answer: "<a>"
    },
    {
        question: "What is the purpose of the 'id' attribute in HTML?",
        options: ["To define the page title", "To style the element", "To uniquely identify an element", "To create a link"],
        answer: "To uniquely identify an element"
    },
    {
        question: "Which CSS property is used for adding shadows to elements?",
        options: ["text-shadow", "box-shadow", "element-shadow", "shadow"],
        answer: "box-shadow"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

const timerEl = document.getElementById('time');
const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const resultEl = document.querySelector('.result');
const scoreEl = document.getElementById('score');
const restartBtn = document.querySelector('.restart-btn');

startQuizButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const email = emailInput.value;

    if (username.trim() === '' || email.trim() === '') {
        alert('Please enter your username and email.');
        return;
    }

    loginContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
});

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }

    clearInterval(timerInterval);
    timeLeft = 15;
    timerEl.textContent = timeLeft;
    startTimer();

    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = '';

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsEl.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;

    if(currentQuestion === quizData.length) {
        endQuiz();
    } else {
        loadQuestion();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    resultEl.style.display = 'block';
    scoreEl.textContent = score;
    restartBtn.style.display = 'block';
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 15;
    timerEl.textContent = timeLeft;
    questionEl.style.display = 'block';
    optionsEl.style.display = 'block';
    resultEl.style.display = 'none';
    restartBtn.style.display = 'none';
    loadQuestion();
});