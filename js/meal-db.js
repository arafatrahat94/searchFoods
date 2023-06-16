const loadData = (inputName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputName}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayFood(data.meals.slice(0, 6)))
}
const rest = (input) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    fetch(url)
    .then(res =>res.json())
    .then(data => displayFood(data.meals))
}
const displayFood = data => {
    console.log(data)
    const foodContainer = document.getElementById('food-container');
    const button = document.getElementById('showAllButton');
    const tittle = document.getElementById('title');
    foodContainer.innerHTML = '';
    data.forEach(element => {
        tittle.innerHTML = `<h1 class="text-center text-3xl font-bold">Your Favourite Food</h1>`
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <div  onclick="showDetails('${element.idMeal}')"><div onclick="my_modal_3.showModal()"  class="flex flex-col justify-start text-start drop-shadow-md items-center bg-white border rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100  dark:hover:bg-gradient-to-l from-red-200 to-red-600">
        <div class:'' id="image">
        <img class='rounded-lg w-72 md:w-64 border-1' src='${element.strMealThumb}'>
        </div>
        <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight">${element.strMeal}</h5>
        <p class="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-900">Country:${element.strArea}</p>
        <button class="btn w-2/3 bg-gradient-to-r from-red-200 to-red-600 text-black font-bold border-0 drop-shadow-md"><a  target="_blank" href="${element.strYoutube}">Youtube</a></button>
        </div>
        </div></div>`
        button.style.display = 'block';
        foodContainer.appendChild(div);
    });
    // console.log(data);
}
const showDetails = data =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`
    fetch(url)
    .then(res => res.json())
    .then(data => modalData(data.meals));
    
}
const modalData = data => {
    const ModalBox = document.getElementById('forms');
    data.forEach(element => {
        console.log(element.strMeal);
        ModalBox.innerHTML = `
        <h1 class='text-xl font-bold text-center'>${element.strMeal}</h1>
        <div class="my-4 mx-auto  w-64"><img class="rounded-lg drop-shadow-md" src='${element.strMealThumb}'></div>
        <h1 class='font-bold'>Category: ${element.strCategory}</h1>
        <h1 class='font-bold'>Area: ${element.strArea}</h1>
        <h1 class='font-semibold'><span class='font-bold'>Instruction :</span> <br>${element.strInstructions}</h1>
        <h1 class='font-bold'>Youtube: <br> <span class='font-semibold'><a target="_blank" href="${element.strYoutube}">${element.strYoutube}</a></span></h1>`
    });
}
document.getElementById('searchFood').addEventListener('click' , function(){
    const inputName = document.getElementById('searchFoodInput').value;
    loadData(inputName);
})
document.getElementById('AllPro').addEventListener('click', function(){
    const inputName = document.getElementById('searchFoodInput').value;
    rest(inputName);
})