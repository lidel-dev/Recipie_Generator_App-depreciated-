// IMPORTS
import { askQuestion } from './askQuestion.js'
import { updateHistory } from './updateHistory.js'

// SEES WHAT MEAL YOU GOT LAST GAME, IF NONE, THEN DISPLAY NOTHING
updateHistory()

// EVENT LISTENER TO START THE GAME
let initialButton = document.getElementById("initial-button")
initialButton.addEventListener("click", jsGame)

// GLOBAL DOM VARIABLES
let gameSection = document.getElementById("game-content-section")
let incorrectAnswerElement = document.getElementById("incorrect-score")
let correctAnswerElement = document.getElementById("correct-score")
let endGameSectionElm = document.getElementById("end-game-section")
let scoreElement = document.getElementById("score-span")
let retryButtonElement = document.getElementById("retry-button")

// EXPORTS FOR ASK QUESTIONS MODULE AND THIS ONE
export let questionsLeft = 8
export let incorrectAnswers = 0
export let correctAnswers = 0

// RELOAD PAGE HELPER FUNCTION
function reloadPage() { location.reload() } // reloads page when called

// FUNCTIONS FOR DETERMINING CORRECT AND INCORRECT ANSWERS
export function incorrectAnswer() { // function if answer selected is incorrect
    questionsLeft -= 1
    incorrectAnswers += 1
    askQuestion()
}

export function correctAnswer() { // function if answer selected is correct
    questionsLeft -= 1
    correctAnswers += 1
    askQuestion()
}

// MAIN JS GAME FUNCTION
function jsGame() {
    document.getElementById("initial-screen-section").style.display = "none" // removes initial screen
    gameSection.style.display = "flex" // displays game screen
    askQuestion() // starts asking questions(see askquestion in other file for details)
}

// the API
async function showRecipe() {
    let mealCategory
    let randomMealId
    const mealTitleElement = document.getElementById("random-recipe-title")
    const mealIngredientsElement = document.getElementById("random-recipe-ingredients")
    const recipeInstructionElement = document.getElementById("random-recipe-instruction")
    const recipeMeasurementsElement = document.getElementById('random-recipe-measurements')

    // TODO: instead of using .createElement(), we should just have the elements already defined in the html
    let recipeName = document.createElement("h4")
    let ingredientsElement = document.createElement("h4")
    let recipeBulk = document.createElement("h5")
    let measurementsElement = document.createElement("h6")
    let meal

    // NESTED TERNARY DETERMINING WHICH CATEGORY THE MEAL WILL COME FROM
    correctAnswers === 8
    ? mealCategory = 'Seafood'
        : (correctAnswers === 7 || correctAnswers === 6)
        ? mealCategory = 'Dessert'
            : (correctAnswers === 5 || correctAnswers === 4)
            ? mealCategory = 'Pork'
                : (correctAnswers === 3 || correctAnswers === 2)
                ? mealCategory = 'Vegetarian'
    : mealCategory = 'Breakfast'
    
    // FETCH REQUESTS FOR GETTING A RANDOM MEAL BASED ON PREVIOUS SCORE ABOVE WITH THE MEAL CATEGORY VARIABLE
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`) // gets the meals from the category determined above
    .then(response => response.json())
    .then(async (data) => {
        randomMealId = data.meals[Math.floor(Math.random() * data.meals.length)].idMeal // gets a random meal from that category

        await fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMealId}`) // uses the random meal id to get that meal from the API
        .then(response => response.json())
        .then(data => {
            meal = data.meals[0]
            let ingredients = []
            let measurementsArr = []

            for(const key in meal) { // for loops that grab the ingredients and measurements of the meal to display
                for(let i = 1; i <= 20; i++) {
                    if(key === `strIngredient${i}` && meal[key] != "" && meal[key] != null && meal[key] != " ") {
                        ingredients.push(" " + meal[key])
                    }else if(key === `strMeasure${i}` && meal[key] != "" && meal[key] != null && meal[key] != " "){
                        measurementsArr.push(" " + meal[key])
                    }
                }
            }

            recipeName.innerHTML = data.meals[0].strMeal
            ingredientsElement.innerHTML = ingredients 
            measurementsElement.innerHTML = data.meals[0].strMeasure1
            recipeBulk.innerHTML = data.meals[0].strInstructions

            mealTitleElement.append(recipeName)
            recipeMeasurementsElement.append(measurementsArr)
            mealIngredientsElement.append(ingredients)
            recipeInstructionElement.append(recipeBulk)

        })
    })
    
    fetch(`/images?search=${meal.strMeal}`)
    .then(response => response.json())
    .then(result => {
        document.getElementById('foodImg').src = result.images_results[0].thumbnail
    })
    
    // updates local storage with the new meal
    updateHistory(meal.strMeal)
}

// END GAME FUNCTION
export function endGame() {
    showRecipe()
    retryButtonElement.addEventListener("click", reloadPage) // reloads the page when button is clicked
    endGameSectionElm.style.display = "flex" // displays end game section
    gameSection.style.display = "none" // hides main game section
    scoreElement.style.display = "flex" // displays score element
    correctAnswerElement.innerHTML = "correct answers: " + correctAnswers // correct answers element
    incorrectAnswerElement.innerHTML = "incorrect answers: " + incorrectAnswers // incorrect answers element
}