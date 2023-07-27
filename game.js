const questions = document.querySelector("#question");
const choices = Array.from (document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#preogressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const choiceContainer= document.querySelector("#choice-container");

let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter= 0
let availableQuestions = []

const quizQuestions = [
    {
        question: "How do you change directories in your terminal?",
        choices: ["code . ","cd"],
        answer: 2,
    },
    {
        question: "How do you add changes to Github?",
        choices: [" Using git add -A"," Using git push"],
        answer: 1,
    },
    {
        question: "How to add a paragraph in html?",
        choices:["With <p>","with </p>"],
        answer: 1,
    },
    {
        question: "What does line-height do in CSS?",
        choices:["Sets the line to be displayed through text","Sets the distance between lines of text"],
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

function startGame  () {
    questionCounter = 0
    score = 0
    availableQuestions = [...quizQuestions]
    getNewQuestion()
}

function getNewQuestion () {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem(`mostRecentScore`, score)

        return window.location.assign(`/end.html`)
    }

    questionCounter++

    const questionsIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    questions.innerText = currentQuestion.question

    currentQuestion.choices.forEach(choice => {
        console.log (choice)
        let button= document.createElement("button");
        button.innerHTML=choice
        choiceContainer.append(button)
        // const number = choice.dataset[`number`]
        // choice.innerText = currentQuestion[`choice`+ number]
    })

    availableQuestions.splice(questionsIndex, 1)
    
    acceptingAnswers = true 
}

choices.forEach(choice => {
    choice.addEventListener(`click`, e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset [`number`]

        let classToApply = selectedAnswer == currentQuestion.answer ? `correct`:
        'incorrect='

        if(classToApply === `correct`) {
            incrementScore(SCORE_POINTS) 
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

        
    })
})

startGame()

