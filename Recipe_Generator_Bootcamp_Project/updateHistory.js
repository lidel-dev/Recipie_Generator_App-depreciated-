export function updateHistory(newRecipe){
    // checks if there was a value already and sets the element on the page to that if there is
    localStorage.getItem('history1') !== null ? document.getElementById('history1').innerHTML = localStorage.getItem('history1') : null

    // checks if there is a new value to be set
    newRecipe !== undefined ? localStorage.setItem('history1', newRecipe) : null
} 