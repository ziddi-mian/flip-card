const questionsSheetId = "1pTPByWzfPFGtIk5ydoiC9ldOUsHe9SdIgVrQ26MIW0E"; // Replace with your Google Sheet ID
const questionsRange = "DataBase!A2:B"; // Replace with the appropriate sheet name and range

let currentQuestionIndex = 0;
let cardFlipped = false;
let questions = [];

function flipCard() {
  const flipCardInner = document.querySelector('.flip-card-inner');
  if (cardFlipped) {
    flipCardInner.style.transform = 'rotateY(0deg)';
  } else {
    flipCardInner.style.transform = 'rotateY(180deg)';
  }
  cardFlipped = !cardFlipped;
}

function showQuestion() {
  const cardElement = document.querySelector('.flip-card');
  const questionElement = document.getElementById("question");
  questionElement.textContent = questions[currentQuestionIndex].question;

  const answerElement = document.getElementById("answer");
  answerElement.textContent = questions[currentQuestionIndex].answer;

  const randomColor = generateRandomColor();
  
  // Set the background color of the card
  cardElement.style.backgroundColor = randomColor;
  
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
  }
  showQuestion();
}

function showPreviousQuestion() {
  currentQuestionIndex--;
  if (currentQuestionIndex < 0) {
    currentQuestionIndex = questions.length - 1;
  }
  showQuestion();
}

function fetchQuestionsFromSheet() {
  const apiKey = "AIzaSyAp53piXXFDurUYPO1jfSwwcwK24TW2710"; // Replace with your Google Sheets API key

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${questionsSheetId}/values/${questionsRange}?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract questions and answers from the API response
      questions = data.values.map(row => ({
        question: row[0],
        answer: row[1]
      }));

      if (questions.length > 0) {
        showQuestion();
      } else {
        // Handle case when no questions are available
      }
    })
    .catch(error => {
      // Handle error if API request fails
      console.error("Error fetching questions from Google Sheet:", error);
    });
}


function generateRandomColor() {
    const coloArray = ["#d96105","#030201", "#dca44c","#ac2e39","#b15308", "#4b242c", "#2980b9", "#569b78"]
    const randomIndex = Math.floor(Math.random() * coloArray.length);
    return coloArray[randomIndex];
  }
  

fetchQuestionsFromSheet();
