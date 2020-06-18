let arrayOfProducts = []

let html = ''
document.getElementById("new-ingredient").addEventListener("click", function(){
  event.preventDefault()
  
  const e = document.getElementById("products")
  console.log("TYPE OF E: ", typeof(e), e)
  // let ingredient = JSON.parse(JSON.stringify(e.options[e.selectedIndex]))
  let ingredient = e.options[e.selectedIndex].innerHTML
  console.log("TYPE: ",typeof(ingredient))
  console.log(ingredient)
  const quantity = document.getElementById("quantity").value
  const newIngredient = {
    ingredient: ingredient,
    quantity: quantity
  }
  arrayOfProducts.push(newIngredient)
  html += `
  <li>
    ${ingredient.name}     ${quantity}
  </li>
  `
  console.log("NAME :", ingredient.name)
  console.log("QUANTITY", quantity)
  document.getElementById('ingredients-list').innerHTML = html
  console.log("ARRAY OF PRODUCTS", arrayOfProducts)
});

document.getElementById("validar-ingredients").addEventListener("click", function(){
  event.preventDefault()

  const e = document.getElementById("products")
  e.options[e.selectedIndex].value = arrayOfProducts
});




// [{productObject,quantity},{productObject,quantity}]

// Convert HTML Form Fields to JSON
// https://www.learnwithjason.dev/blog/get-form-values-as-json/