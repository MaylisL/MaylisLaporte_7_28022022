import {recipes} from './recipes.js'

const containerTag = document.querySelector('.selected-filters');
// array of active tags in order to keep track of active filters (for future results displayed)
let ingredientsActiveTags = [];
let appliancesActiveTags = [];
let utensilsActiveTags = [];
// all the filters in one array, then each type of filter will be in a separate array
let listOfIngredients = []
let listOfAppliances = []
let listOfUtensils = []

// class which controls the opening and closing of the filters buttons
class ControlFilters {
    constructor(){
       this.buttonIngredients = document.querySelector(".button-ingredients");
       this.buttonAppliances = document.querySelector(".button-appliances");
       this.buttonUtensils = document.querySelector(".button-utensils");
       this.containerIngredients = document.querySelector(".container-ingredients");
       this.containerAppliances = document.querySelector(".container-appliances");
       this.containerUtensils = document.querySelector(".container-utensils");
       this.dropdown =  this.dropdown.bind(this);
       this.closeDropdown = this.closeDropdown.bind(this);
       this.addButtonEventListener();
       window.addEventListener('click', this.closeDropdown);
    }
    addButtonEventListener() {
        this.buttonIngredients.addEventListener('click', this.dropdown);
        this.buttonAppliances.addEventListener('click', this.dropdown);
        this.buttonUtensils.addEventListener('click', this.dropdown);
    }
    dropdown(e){
        // identify which button to drop down
        // e.target.closest is important here to select the button element and the image and name with it
        e.stopPropagation();
        this.closeDropdown(e);// --> close others dropdowns
        if(e.target.closest('button').classList.contains('button-ingredients')){
            this.buttonIngredients.classList.add('hide');
            this.containerIngredients.classList.remove('hide');
        } else if(e.target.closest('button').classList.contains('button-appliances')){
            this.buttonAppliances.classList.add('hide');
            this.containerAppliances.classList.remove('hide');
        } else if(e.target.closest('button').classList.contains('button-utensils')){
            this.buttonUtensils.classList.add('hide');
            this.containerUtensils.classList.remove('hide');
        }  
    }
    closeDropdown(e){
        if (!e.target.classList.contains('input-button')) {
            this.buttonIngredients.classList.remove('hide');
            this.buttonUtensils.classList.remove('hide');
            this.buttonAppliances.classList.remove('hide');
            this.containerIngredients.classList.add('hide');
            this.containerUtensils.classList.add('hide');
            this.containerAppliances.classList.add('hide');
        }
    }
}
const controlFilters = new ControlFilters()


//  class for ONE recipe
class Recipe {
    constructor (name, time, description){
        this.name = name;
        this.time = time;
        this.description = description;
        this.ingredients = [];
        this.appliances = [];
        this.utensils = [];
    }
    addIngredient(ingredient){
        this.ingredients.push(ingredient)
    }
    addAppliance(appliance){
        this.appliances.push(appliance)
    }
    addUtensil(utensil){
        this.utensils.push(utensil)
    }
    // Method to create html recipe cards
    createRecipeCard(){
        const recipeCard = document.createElement('a');
        recipeCard.setAttribute('href', '#');
        
        const article = document.createElement('article');
        article.classList.add('card');
        
        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');
        
        const h2 = document.createElement('h2');
        h2.classList.add('card-title');
        h2.textContent=this.name;
        
        const icon = document.createElement('img');
        icon.classList.add('time-icon');
        icon.setAttribute('src', "/images/svg/time.svg");
        icon.setAttribute('alt', "");
        
        const cardTime = document.createElement('p');
        cardTime.classList.add('card-time','card-text');
        cardTime.textContent=this.time + ' min';
        
        const  cardDescription= document.createElement('div');
        cardDescription.classList.add('card-description');
        
        const cardIngredients = document.createElement('ul');
        cardIngredients.classList.add('card-ingredients','card-text');
        // create a list of ingredients and add it to the ul
        this.ingredients.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('card-ingredients-item');
            const span = document.createElement('span');
            span.classList.add('bold');
            span.textContent=item.name + ': ';
            li.appendChild(span);
            // if the quantity exists, display it (if doesn't exist don't display it)
            if (item.quantity) {
                const unit = item.unit == 'grammes'? 'g': item.unit.toLowerCase() == 'litres'? 'L': item.unit // const avec condition: si = grammes, remplacé par 'g' etc.. sinon garder l'unité telle quelle
                const quantity = document.createTextNode(item.quantity + unit); // ici unit est la const et non pas item.unit
                li.appendChild(quantity);
            } 
            cardIngredients.appendChild(li);
        })

        const cardInstructions = document.createElement('p');
        cardInstructions.classList.add('card-instructions','card-text');
        cardInstructions.textContent=this.description.substr(0, 195) + ' ...';

        cardDescription.appendChild(cardIngredients);
        cardDescription.appendChild(cardInstructions);

        cardInfo.appendChild(h2);
        cardInfo.appendChild(icon);
        cardInfo.appendChild(cardTime);
        
        cardBody.appendChild(cardInfo);
        cardBody.appendChild(cardDescription);

        article.appendChild(cardImage);
        article.appendChild(cardBody);
        recipeCard.appendChild(article);
        return recipeCard
    }
} // END OF THE CLASS RECIPE

class Ingredient {
    constructor (name, quantity, unit = "") {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}
class Utensil {
    constructor (name) {
        this.name = name;
    }
}

class Appliance {
    constructor (name){
        this.name = name;
    }
} 
let listOfRecipes = [];

const recipeListContainer = document.querySelector('.cards-container');
// looping through all the recipes (from recipes.js)
recipes.forEach(function(aRecipe){
    let newRecipeObject = new Recipe(aRecipe.name, aRecipe.time, aRecipe.description);

    // adding an ingredient to the recipe
    aRecipe.ingredients.forEach(function(anIngredient){
        let anIngredientObject = new Ingredient(anIngredient.ingredient, anIngredient.quantity, anIngredient.unit);
        newRecipeObject.addIngredient(anIngredientObject);
    })
    // adding appliance to the recipe
    let anApplianceObject = new Appliance(aRecipe.appliance);
    newRecipeObject.addAppliance(anApplianceObject);
    
    // adding utensil to the recipe
    aRecipe.ustensils.forEach(function(anUtensil){
        let anUtensilObject = new Utensil(anUtensil);
        newRecipeObject.addUtensil(anUtensilObject);
    })  
    // stock the recipes
    recipeListContainer.appendChild(newRecipeObject.createRecipeCard());
    listOfRecipes.push(newRecipeObject)
})
let availableListOfRecipes = [...listOfRecipes];

// Function will update the listofIngredients, listOfAppliances and listOfUtensils from the listOfRecipes provided
function getTheFilters(listOfRecipes) {
    // firstly emptying the previous arrays so we can push available values
    listOfIngredients = []
    listOfAppliances = []
    listOfUtensils = []
   
    listOfRecipes.forEach(function(aRecipe){
        aRecipe.ingredients.forEach(function(anIngredient) {
            if(!ingredientsActiveTags.includes(anIngredient.name)){
                listOfIngredients.push(anIngredient.name)
            }
        });
        listOfIngredients = [...new Set(listOfIngredients)];
    
        aRecipe.appliances.forEach(function(anAppliance) {
            if(!appliancesActiveTags.includes(anAppliance.name)){
                listOfAppliances.push(anAppliance.name)
            }
        })
        listOfAppliances = [...new Set(listOfAppliances)];

        aRecipe.utensils.forEach(function(anUtensil) {
            if(!utensilsActiveTags.includes(anUtensil.name)){
                listOfUtensils.push(anUtensil.name)
            }
        })
        listOfUtensils = [...new Set(listOfUtensils)];
    })
}
getTheFilters(listOfRecipes);  

function callAvailableFilters(listOfIngredients, listOfAppliances, listOfUtensils) {
    availableFilters(listOfIngredients,'ingredient');
    availableFilters(listOfAppliances,'appliance');
    availableFilters(listOfUtensils,'utensil');
}
callAvailableFilters(listOfIngredients, listOfAppliances, listOfUtensils);

//clear results filters
function clearFiltersResults(filterContainer) {
    filterContainer.innerHTML = ""
}

//  create the elements shown in filters (the choices available)
function availableFilters(list, typeOfFilter) {
    let filterContainer;
    let tagColor;
    let activeTags;
    let callFilterByType;
    if(typeOfFilter === "ingredient") {
        filterContainer = document.querySelector('.choices-wrapper-ingredients');
        tagColor = "tag-ingredients";
        activeTags = ingredientsActiveTags;
        callFilterByType = filterByIngredients
    } else if (typeOfFilter === "appliance"){
        filterContainer = document.querySelector('.choices-wrapper-appliances');
        tagColor = "tag-appliances";
        activeTags = appliancesActiveTags;
        callFilterByType = filterByAppliances
    } else if (typeOfFilter === "utensil"){
        filterContainer = document.querySelector('.choices-wrapper-utensils');
        tagColor = "tag-utensils";
        activeTags = utensilsActiveTags;
        callFilterByType = filterByUtensils
    }
    clearFiltersResults(filterContainer)

    // Loop through the list of choices to create and show them
    list.forEach(choice => {
        const p = document.createElement('p');
        p.classList.add('cursorPointer')
        p.textContent = choice;
        filterContainer.appendChild(p);
        // On click of a choice, create the tags
        p.addEventListener('click', (e) =>{
            const buttonTag = document.createElement('button');
            buttonTag.classList.add('tags', tagColor)
    
            const pTag = document.createElement('p');
            pTag.textContent = choice;

            const imgTag = document.createElement('img');
            imgTag.setAttribute('src', '/images/svg/delete.svg');
            imgTag.setAttribute('alt', 'clik to delete filter');
            imgTag.classList.add('cursorPointer')

            containerTag.appendChild(buttonTag);
            buttonTag.appendChild(pTag);
            buttonTag.appendChild(imgTag);
            // allows to track and store active tags depending on their type of filter
            activeTags.push(choice);
            // call the function to update available recipes
            callFilterByType(choice)
            displayAvailableRecipes()
            //select input button to clear the input fileds after selecting a tagt( to allow a new search with nothing)
            document.querySelectorAll('.input-button').forEach((oneInputField) =>{
                oneInputField.value=""
            });
            
            imgTag.addEventListener('click', (e)=>{
                buttonTag.remove();
                // removes clicked tag from related active tags array by splice method
                activeTags.splice(activeTags.indexOf(choice),1);
                // recalculate results when removing a tag
                updateResultsWithoutATag();
                displayAvailableRecipes()
            })
        })
    })
}
// function to recalculate results when removing a tag
function updateResultsWithoutATag(){
    availableListOfRecipes = [...listOfRecipes];
    ingredientsActiveTags.forEach((tag) => {
        filterByIngredients(tag)
    })
    appliancesActiveTags.forEach((tag) => {
        filterByAppliances(tag)
    })
    utensilsActiveTags.forEach((tag) => {
        filterByUtensils(tag)
    })
}

// filter the choices in the filter dropdown 
const filterInputIngredients = document.querySelector('.input-button-ingredients');
filterInputIngredients.addEventListener("keyup", (e)=> {
    if(e.target.value.length>2){ //more than 2 caracteres so minimum 3
        // filtering through the list of ingredients the ingredients which includes the search
        const filterIngredients = listOfIngredients.filter((filterIngredient) =>{
            return filterIngredient.toLowerCase().includes(e.target.value.toLowerCase())
        })
        availableFilters(filterIngredients, "ingredient")
    } else { 
        availableFilters(listOfIngredients, "ingredient")
    }
});

const filterInputAppliances = document.querySelector('.input-button-appliances');
filterInputAppliances.addEventListener("keyup", (e)=> {
    if(e.target.value.length>2){
        
        const filterAppliances = listOfAppliances.filter((filterAppliance) =>{
            return filterAppliance.toLowerCase().includes(e.target.value.toLowerCase());
        })
        availableFilters(filterAppliances, "appliance")
    }
});

const filterInputUtensil = document.querySelector('.input-button-utensils');
filterInputUtensil.addEventListener("keyup", (e)=> {
    if(e.target.value.length>2){
        const filterUtensils = listOfUtensils.filter((filterUtensil) =>{
            return filterUtensil.toLowerCase().includes(e.target.value.toLowerCase());
        })
        availableFilters(filterUtensils, "utensil")
    }
});

// filter the recipes from the choices selected in the filters dropdown
function filterByIngredients(choice){
    availableListOfRecipes = availableListOfRecipes.filter(recipe =>{
        return recipe.ingredients.some(ingredient => {
            return ingredient.name ===choice;
        })
    })
}

function filterByAppliances(choice){
    availableListOfRecipes = availableListOfRecipes.filter(recipe =>{
        return recipe.appliances.some(appliance => {
            return appliance.name ===choice;
        })
    })
}

function filterByUtensils(choice){
    availableListOfRecipes = availableListOfRecipes.filter(recipe =>{
        return recipe.utensils.some(utensil => {
            return utensil.name ===choice;
        })
    })
}

// function to display the recipe cards results depending on filters
function displayAvailableRecipes(){
    // remove all the cards before the new result
    recipeListContainer.innerHTML=""
    if(availableListOfRecipes.lengh<1){
    } else {// if there are available filters = give the new available recipe
        availableListOfRecipes.forEach((recipe)=>{
            recipeListContainer.appendChild(recipe.createRecipeCard())
        })
        getTheFilters(availableListOfRecipes); //updating the filters list
        callAvailableFilters(listOfIngredients, listOfAppliances, listOfUtensils);// adding lhe left choices in the dropdown after the search is executed
    }
}
