let level;
let currentQuestion = 0;
let score = 0;
let timer;
let correctSound = document.getElementById('correct-sound');
let incorrectSound = document.getElementById('incorrect-sound');
let backgroundMusic = document.getElementById('background-audio');


function startGame(selectedLevel) {
    level = selectedLevel;
    currentQuestion = 0;
    score = 0;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('end-screen').style.display = 'none';
    nextQuestion();
}




function nextQuestion() {
    currentQuestion++;
    document.getElementById('question-number').textContent = `Question ${currentQuestion}`;
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
   
    // Ensure num1 is greater than or equal to num2 for subtraction
    if (operator === '-') {
        num1 = Math.max(num1, num2);
    }
   
    let questionText = `${num1} ${operator} ${num2}`;
    document.getElementById('question').textContent = questionText;
   
    let correctAnswer = eval(questionText);
    let answers = generateAnswers(correctAnswer);
   
    document.querySelectorAll('.answer-btn').forEach((btn, index) => {
        btn.textContent = answers[index];
        btn.style.backgroundColor = '#4caf50';
    });
   
    document.getElementById('score').style.display = 'none';
   
    let timeLeft;
    if (level === 1) {
        timeLeft = 'Unlimited';
    } else {
        timeLeft = level === 2 ? 20 : 10;
    }
   
    document.getElementById('timer').textContent = `Time Left: ${timeLeft} seconds`;




    if (level !== 1 && currentQuestion < 10) {
        timer = setInterval(function() {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            } else {
                document.getElementById('timer').textContent = `Time Left: ${timeLeft} seconds`;
            }
        }, 1000);
    } else if (currentQuestion === 10) {
        timer = setInterval(function() {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            } else {
                document.getElementById('timer').textContent = `Time Left: ${timeLeft} seconds`;
            }
        }, 1000);
    }
}


function playBackgroundMusic() {
    backgroundMusic.loop = true; // Loop the background music
    backgroundMusic.play();
}


function generateAnswers(correctAnswer) {
    let answers = [];
    let correctIndex = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; i++) {
        if (i === correctIndex) {
            answers.push(correctAnswer);
        } else {
            let incorrectAnswer;
            do {
                incorrectAnswer = generateRandomNonNegative();
            } while (incorrectAnswer === correctAnswer || incorrectAnswer < 0 || answers.includes(incorrectAnswer));
            answers.push(incorrectAnswer);
        }
    }
    return answers;
}




function generateRandomNonNegative() {
    return Math.floor(Math.random() * 100);
}




function checkAnswer(index) {
    clearInterval(timer);
    let userAnswer = document.querySelectorAll('.answer-btn')[index].textContent;
    let correctAnswer = eval(document.getElementById('question').textContent);
    if (parseFloat(userAnswer) === correctAnswer && correctAnswer >= 0) {
        score++;
        correctSound.play(); // Play correct sound
    } else {
        incorrectSound.play(); // Play incorrect sound
    }
    if (currentQuestion < 10) {
        nextQuestion();
    } else {
        endGame();
    }
}




function endGame() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('final-score').textContent = `Final Score: ${score}`;
    document.getElementById('end-screen').style.display = 'block';
}




function playAgain() {
    document.getElementById('final-score').textContent = '';
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}