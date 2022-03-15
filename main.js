// --> class qui permet de contrôler l'ouverture et la fermeture de mes boutons filtres
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
        // --> identify which button to drop down
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
/* --> open dropdown --> done
-fermer dropdown --> done
-handle choice and display it --> to do
-track avtive filter and delete it --> to do
*/

/* const item = document.querySelectorAll(".dropdown-buttons p ")
item.addEventListener('click', e => {
    e.target.document.querySelector('.tags').style.display = 'block';
} ) */


}
const controlFilters = new ControlFilters()


    
