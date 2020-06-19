let html = ''
const addIngredient = document.getElementById("new-ingredient")

if (addIngredient) {
document.getElementById("new-ingredient").addEventListener("click", function(){
  event.preventDefault()
  const products = document.getElementById("products")
  let ingredient = products.options[products.selectedIndex].innerHTML
  const quantity = document.getElementById("quantity").value ? document.getElementById("quantity").value : 0

  let productAlreadyAdded = false
  
  let check = [...document.getElementById("ingredients-list").querySelectorAll("li")]
  check.forEach(elem => {
    if (elem.querySelectorAll("span")[0].innerHTML === ingredient) {
      productAlreadyAdded = true
      return
    }
  })

  if (!productAlreadyAdded) {
    html += `
    <li>
      <span>${ingredient}</span>     <span>${quantity}</span>
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

window.addEventListener("onload", () => {
//Calculate calories
  let totalCalories = document.querySelector("#total-recipe-calories").innerHTML
  let arrayOfCalories = [...document.querySelectorAll("#hidden-calories")]
  totalCalories = arrayOfCalories.reduce((a,b) => a + b, 0)
  
  console.log("ARRAY OF CALORIES: ", total)
})