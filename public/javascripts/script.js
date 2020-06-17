document.getElementById("new-ingredient").addEventListener("click", function(){
  event.preventDefault()
  let html = ''
  const e = document.getElementById("products")
  const name = e.options[e.selectedIndex].text
  const quantity = document.getElementById("quantity").value
  html += `
  <li>
    ${name}     ${quantity}
  </li>
  `
  console.log(name)
  console.log(quantity)
  document.getElementById('ingredients-list').innerHTML = html
});