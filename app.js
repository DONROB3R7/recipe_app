"use strict"    

// Global Variable  {Category and meal container with Random}
const categoryElement = document.getElementById('category');
const mealContainer = document.getElementById('meal-container');

// Global Variable  {Instruction and Button}
const instructionContainerElement = document.getElementById('instruction-container');
const toggleButtonElement = document.getElementById('showContent');

// Global Variable Search button 
const buttonSearch  = document.getElementById('search');
const inputSearch = document.getElementById('inputSearch');


// Fetch functions
async function randomMeal(){
    let mealDbData  = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    try {
        let res  =  await fetch(mealDbData);
        return await res.json();
    } catch (error){
        console.log(error);
    }
}

async function searchMeal(value){

    let mealDbData = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;

    try {
        let res  =  await fetch(mealDbData);
        return await res.json();
    } catch (error){
        console.log(error);
    }
}

// RandomMela Rendert main function 
async function randomMealRender(){
    let mealDbDataJson = await randomMeal();
    let data = mealDbDataJson.meals[0];

    function displayInstructions(){

        const show = `
        <p>${data.strInstructions}</p>
        <span>More information on <a href='${data.strYoutube}' target="_blank"
        <strong>YouTube<strong>
        </a></span>`;
    
        return show;
    }

    const instructionContainerDisplay  = displayInstructions();

   
    const mealContentDisplay =`
    <img src=${data.strMealThumb} alt="">
    <div class="meal-info">
        <h4>${data.strMeal}</h4>
    </div>
    <h3>Instructions:</h3>
    `;

    
    const tagContent =  data.strArea ? `Area: ${data.strArea} 
    - ${data.strCategory}` : `${data.strCategory}`;

    // Dynamic HTML injected 
    categoryElement.innerHTML = tagContent; 
    mealContainer.innerHTML = mealContentDisplay;
    instructionContainerElement.innerHTML = instructionContainerDisplay;
}

// Initial Call 
randomMealRender();



function toggleContent(){
    console.log(showContentInstruction);
    return showContentInstruction = showContentInstruction ? false : true;
}

function toggleClass(){
    console.log(instructionContainerElement);
    instructionContainerElement.classList.toggle("show");
}

toggleButtonElement.addEventListener('click', toggleClass);

// Search Main Function 

async function searchMealRender(){
    // Grab the value from input and send to fech function 
    const inputSearchValue = inputSearch.value;
    let mealDbDataJson = await searchMeal(inputSearchValue);
    
    let data = mealDbDataJson.meals;
    searchMealLoop(data); 
}

function searchMealLoop(value){
    let mealContentDisplay = '';
    let data = value;
    
    console.log(data.length);

    for(let i = 0; i < data.length; i++){
        console.log(data[i]);
       mealContentDisplay += `
       <div class="meal-info">
            <h4>${data[i].strMeal}</h4>
        </div>
        <img src=${data[i].strMealThumb} alt="">
        
    `;

    inputSearch.value = '';
}


categoryElement.innerHTML = ''; 
    mealContainer.innerHTML = mealContentDisplay;

}


buttonSearch.addEventListener('click', searchMealRender);