// #LAYOUT - Show/Hide burger menu
let menuBtn = document.querySelector("#show-menu-btn")
menuBtn.addEventListener('click', () => {
  console.log("MENU PRESSED")
  let menu = document.querySelector(".dropdown__content")
  if(menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
})

// #CREATE/EDIT RECIPE
const createRecipe = document.getElementById("create-recipe-form");
let btnCreate = document.querySelector("#create-recipe-button");

// #CREATE/EDIT RECIPE - Minimum 2 products and 2 steps in the ingredients and steps lists
function checkIngredientAndStepsListsLength() {
  const minimumLengthMessage = document.getElementById("info-min-products");
  let checkIfTwoProductsMin = [...document.getElementById("ingredients-list").querySelectorAll("li")];
  let checkIfTwoStepsMin = [...document.getElementById("steps-list").querySelectorAll("li")];

  if (checkIfTwoProductsMin.length < 2 || checkIfTwoStepsMin.length < 2) {
    btnCreate.disabled = true;
    minimumLengthMessage.style.display = "";
  } else {
    btnCreate.disabled = false;
    minimumLengthMessage.style.display = "none";
  }
}

function addListenersRemoveButton() {
  let btnRemoveIngredient = [...document.getElementsByClassName("delete-product__button")];
  btnRemoveIngredient.forEach(btn => {
    btn.addEventListener("click", function(){
      event.preventDefault();
      btn.parentNode.remove();
      checkIngredientAndStepsListsLength();
    });
  });
}

function addListenersRemoveStepsButton() {
  let btnRemoveSteps = [...document.getElementsByClassName("delete-step__button")];
  btnRemoveSteps.forEach(btn => {
    btn.addEventListener("click", function(){
      event.preventDefault();
      btn.parentNode.remove();
      checkIngredientAndStepsListsLength();
    });
  });
}

// #CREATE/EDIT RECIPE - Add ingredients dynamically
if (createRecipe) {
document.getElementById("new-ingredient").addEventListener("click", function(){
  event.preventDefault();
  const products = document.getElementById("products");
  let ingredient = products.options[products.selectedIndex].innerHTML;
  let quantity = document.getElementById("quantity").value ? document.getElementById("quantity").value : 0;
  let ingredientId = document.getElementById("products").value;

  const newProduct = document.createElement('li');
  newProduct.innerHTML = `<span>${ingredient}</span>     <span>${quantity}</span> g 
                          <button
                            class="delete-product__button"
                          >
                          </button>
                          <span style="display:none">${ingredientId}</span>`;
  let productAlreadyAdded = false;
  let productsAddedByUser = [...document.getElementById("ingredients-list").querySelectorAll("li")];
  productsAddedByUser.forEach(elem => {
    if (elem.querySelectorAll("span")[0].innerHTML === ingredient) {
      productAlreadyAdded = true;
      return;
    }
  });
  if (!productAlreadyAdded) {
    document.getElementById('ingredients-list').appendChild(newProduct);
  }
  addListenersRemoveButton();
});
}

// #CREATE/EDIT RECIPE - Add instruction steps dynamically
if (createRecipe) {
  document.getElementById("new-step-button").addEventListener("click", function(){
    event.preventDefault();
    const step = document.getElementById("new-step").value;
    const newStep = document.createElement('li');
    newStep.innerHTML = `<span>${step}</span><button class="delete-step__button"></button>`;
    let stepAlreadyAdded = false;
    let stepsAddedByUser = [...document.getElementById("steps-list").querySelectorAll("li")];
    stepsAddedByUser.forEach(elem => {
      if (elem.querySelectorAll("span")[0].innerHTML === step) {
        stepAlreadyAdded = true;
        return;
      }
    });
    if (!stepAlreadyAdded) {
      document.getElementById('steps-list').appendChild(newStep);
    }
    document.getElementById("new-step").innerHTML = ""
    addListenersRemoveStepsButton()
  })
}

// #CREATE/EDIT RECIPE - Onload always check if the recipe has at least 2 products
// and activate the "Remove button" for each product added dynamically
// also add click event listeners to "add ingredient" and "add step"
if (createRecipe) {
  addListenersRemoveButton();
  addListenersRemoveStepsButton();
  checkIngredientAndStepsListsLength();
  document.querySelector("#new-ingredient").addEventListener("click", function(){
    checkIngredientAndStepsListsLength();
  });
  document.querySelector("#new-step-button").addEventListener("click", function(){
    checkIngredientAndStepsListsLength();
  });
}

// #CREATE/EDIT RECIPE - When click "CREATE/EDIT RECIPE", get all the added/edited products dynamically created
if(createRecipe){
  btnCreate.addEventListener("click", function(){
    let productsToAdd = [...document.getElementById("ingredients-list").querySelectorAll("li")];
    let stepsToAdd = [...document.getElementById("steps-list").querySelectorAll("li")];
    productsToAdd.forEach(elem => {
      const newProductItem = elem.querySelectorAll("span")[2].innerHTML;
      const newQuantityItem = parseFloat(elem.querySelectorAll("span")[1].innerHTML);

      const newProductInput = document.createElement('input');
      newProductInput.type = "hidden";
      newProductInput.value = newProductItem;
      newProductInput.name = "productIds";

      const newQuantityInput = document.createElement('input');
      newQuantityInput.type = "hidden";
      newQuantityInput.value = newQuantityItem;
      newQuantityInput.name = "quantities";

      document.getElementById('list-to-send').appendChild(newProductInput);
      document.getElementById('list-to-send').appendChild(newQuantityInput);
    });

    stepsToAdd.forEach(elem => {
      const newStepItem = elem.querySelectorAll("span")[0].innerText;
      const newStepInput = document.createElement('input');
      newStepInput.type = "hidden";
      newStepInput.value = newStepItem;
      newStepInput.name = "steps";

      document.getElementById('list-to-send').appendChild(newStepInput);
    })
  });
}

// #PRODUCTS/RECIPES INDEX - Filter the products/recipes list
const searchResults = document.getElementById("search-results");
if (searchResults) {
  const searchItem = document.getElementById("search-item");
  searchItem.addEventListener("keyup", filterFunction);

  function filterFunction() {
    console.log(searchItem.value);
    let filter = searchItem.value.toUpperCase();
    let card = document.getElementsByClassName("card");
    for (let i=0; i<card.length; i++) {
      let txtValue = card[i].textContent.trim() || card[i].innerText.trim();
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        card[i].style.display = "";
      } else {
        card[i].style.display = "none";
      }
    }
  }
}

// #GLOBAL SEARCH RESULTS - Give total of products/recipes found
const globalSearch = document.getElementById("global-search");
if (globalSearch) {
  const products = document.getElementById("global-products");
  const productsFound = products.getElementsByClassName("card").length;
  document.getElementById("global-products-count").innerText = 
  productsFound === 0 ? `No product found.` : productsFound === 1 ? `1 product found: ` : `${productsFound} products found: `;

  const recipes = document.getElementById("global-recipes");
  const recipesFound = recipes.getElementsByClassName("card").length;
  document.getElementById("global-recipes-count").innerText =
  recipesFound === 0 ? `No recipe found.` : recipesFound === 1 ? `1 recipe found: ` : `${recipesFound} recipes found: `;
}