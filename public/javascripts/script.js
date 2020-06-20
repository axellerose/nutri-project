let html = ''
const addIngredient = document.getElementById("new-ingredient")

if (addIngredient) {
document.getElementById("new-ingredient").addEventListener("click", function(){
  event.preventDefault()
  const products = document.getElementById("products")
  let ingredient = products.options[products.selectedIndex].innerHTML
  const quantity = document.getElementById("quantity").value ? document.getElementById("quantity").value : 0

  let productAlreadyAdded = false
  
  let productsAddedByUser = [...document.getElementById("ingredients-list").querySelectorAll("li")]
  productsAddedByUser.forEach(elem => {
    if (elem.querySelectorAll("span")[0].innerHTML === ingredient) {
      productAlreadyAdded = true
      return
    }
  })

  if (!productAlreadyAdded) {
    html += `
    <li>
      <span>${ingredient}</span>     <span>${quantity} g</span>
    </li>
    `
    document.getElementById('ingredients-list').innerHTML = html
    const newProductInput = document.createElement('input')
    newProductInput.type = "hidden"
    newProductInput.value = products.options[products.selectedIndex].value
    newProductInput.name = "productIds"

    const newQuantityInput = document.createElement('input')
    newQuantityInput.type = "hidden"
    newQuantityInput.value = quantity

    newQuantityInput.name = "quantities"

    document.getElementById('create-recipe-form').appendChild(newProductInput)
    document.getElementById('create-recipe-form').appendChild(newQuantityInput)
  }
});
}

// MINIMUM 2 PRODUCTS RULE
let btnCreate = document.querySelector("#create-recipe-button")

document.querySelector("#new-ingredient").addEventListener("click", function(){
  let checkIfTwoProductsMin = [...document.getElementById("ingredients-list").querySelectorAll("li")]
  if (checkIfTwoProductsMin.length < 2) {
    btnCreate.disabled = true
  } else {
    btnCreate.disabled = false
  }
})
