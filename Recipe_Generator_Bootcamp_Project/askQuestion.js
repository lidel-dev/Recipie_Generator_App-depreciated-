// IMPORTS
import { 
    questionsLeft, incorrectAnswer, correctAnswer, endGame
} from "./main.js"

// CORRECT ANSWER VARIABLES AND DOM VARIABLES
export let answer1 = document.getElementById("answer1")
export let answer2 = document.getElementById("answer2")
export let answer3 = document.getElementById("answer3")
export let answer4 = document.getElementById("answer4")
let questionEl = document.getElementById("game-question")
let answerArr = [answer1, answer2, answer3, answer4] // array of the answer dom elements. Used for ease of access in for loop
let answerBoolArr = [false, false, false, false] // each value is telling which answer is correct out of the four answers(its set to all false because the correct answer hasnt been picked yet. It's picked in the for loop ahead)

let questionIndex = { // object containing questions and answers for game
    questions: [ // questions array. The questions themselves don't matter, only the order. The first question lines up with the first set of answers, and so forth
        "What is the term for frying food in a little hot fat",
        "What is the main ingredient in Extra Virgin Olive Oil",
        "What is the only food that lasts forever",
        "What is the temperature danger zone",
        "Where does raw food need to be stored in relation to cooked food",
        "What color is a Fuji apple",
        "What is a common food allergen",
        "What would be considered a bussin condiment for ramen",
    ],
    
    answers: [ // the first value is always the correct one( its randomized when its asked later )
        ["saute", "fat cookin", "simmer", "pastry"],
        ["Olives", "Grapes", "Almonds", "Virgins"],
        ["Honey", "Apples", "Bread", "Milk"],
        ["40-140 F", "100-200 F", "30-80 F", "5-9 F"],
        ["Below the cooked foods", "Above the cooked foods", "inside the cooked food", "to the side of the cooked food"],
        ["Red", "Yellow", "Blue", "Green"],
        ["Shellfish", "Apples", "Onions", "Green Onions"],
        ["Egg", "Red40", "Grapes", "Toast"]
    ]
} 

// FUNCTION THAT REMOVES SPECIFIC ELEMENTS FROM AN ARRAY
function removeElmFromArr(removeElmArr, elmToRemove){
    let newArr = []
    for(let i=0; i<removeElmArr.length; i++){
        removeElmArr[i] !== elmToRemove ? newArr.push(removeElmArr[i]) : null
    }
    return newArr
}

// MAIN FUNCTION THAT GENERATES RANDOM QUESTION
export function askQuestion(){
    // CHECKS IF THERE ARE NO QUESTIONS LEFT TO ASK. IF THERE ARE NONE, STOP THE GAME
    questionsLeft === 0 ? endGame() : null
    
    // REMOVES EVENT LISTENERS SO THEY DONT OVERLAP
    for(let i=0; i<answerArr.length; i++){
        answerBoolArr[i] ? (answerArr[i].removeEventListener("click", correctAnswer), answerBoolArr[i] = false) : answerArr[i].removeEventListener("click", incorrectAnswer)
    }
    
    // SETS WHICH CURRENT ARRAYS ARE BEING USED FOR QUESTION AND ANSWER, AND REMOVES THE QUESTION FROM THE ARRAY SO IT DOESNT REPEAT
    let randArrIndex = Math.floor(Math.random() * questionIndex.questions.length) // keeps the answers linked to the corresponding question
    let currentAnswerArr = questionIndex.answers[randArrIndex] // gets some answers
    let currentQuestion = questionIndex.questions[randArrIndex] // gets corresponding question
    questionIndex.questions = removeElmFromArr(questionIndex.questions, currentQuestion) // removes question
    questionEl.innerHTML = currentQuestion // displays the current question on the page
    
    // GETS THE CORRECT ANSWER IN THE ARRAY BEFORE THE ARRAY IS RANDOMIZED(WHICH IS ALWAYS THE FIRST ELEMENT IF YOU TAKE A LOOK ABOVE)
    let correctAnswerVal = currentAnswerArr[0]
    let randAnswer // this will be used to get a random answer each iteration of the loop below

    // FOR LOOP DETERMINING IF THE ANSWER IS CORRECT OR NOT TO ADD THE CORRESPONDING EVENT LISTENER
    for(let i= 0; i<answerArr.length; i++){
        randAnswer = currentAnswerArr[Math.floor(Math.random() * currentAnswerArr.length)] // gets random answer
        currentAnswerArr = removeElmFromArr(currentAnswerArr, randAnswer) // removes the answer from the array so it doesn't repeat
        answerArr[i].innerHTML = randAnswer // sets the answer button text to the random answer

        // TERNARY THAT CHECKS IF ITS THE CORRECT ANSWER OR NOT AND ADDS THE CORRESPONDING EVENT LISTENER
        answerArr[i].innerHTML === correctAnswerVal ? (answerBoolArr[i] = true, answerArr[i].addEventListener('click', correctAnswer)) : answerArr[i].addEventListener('click', incorrectAnswer)
    }    
    // REMOVES THE ANSWERS FROM ANSWER ARRAY IN QUESTION INDEX SO THEY DONT REPEAT
    questionIndex.answers.splice(randArrIndex, 1)
}

