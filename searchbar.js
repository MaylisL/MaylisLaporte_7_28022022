// algorithm with method for

// using listOfRecipes
// includes name or description or ingredients
// length >2 tolowercase()
// trim() before to avoid spaces
// TO DO disable the cross in the search input with css 

// search function with .filter method, reusing displayAvailableRecipes() from the main.js
const inputSearchBar = document.querySelector('#search-input')
inputSearchBar.addEventListener('keyup', (e)=>{
    const searchValue = e.target.value.toLowerCase().trim();
    if(searchValue.length>2){
        availableListOfRecipes = [];
        for(const oneRecipe of listOfRecipes){
            if(oneRecipe.name.toLowerCase().includes(searchValue) || oneRecipe.description.toLowerCase().includes(searchValue)
            || oneRecipe.ingredients.some((oneIngredient)=> oneIngredient.name.toLowerCase().includes(searchValue))) {
                availableListOfRecipes.push(oneRecipe)
            }
        }
        removeTags(); // whenever there is a new seach starting
        displayAvailableRecipes();
    } else if (searchValue.length<1) {
        restart()
    }
})

// function which allow to start again a new search with no settings(no tags, display the full list of recipes)
function restart(){
    removeTags()
    availableListOfRecipes = [...listOfRecipes];
    displayAvailableRecipes()
}

function removeTags(){
    containerTag.innerHTML="";
    ingredientsActiveTags = [];
    appliancesActiveTags = [];
    utensilsActiveTags = [];
}
