let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

//get total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#006400";
  } else {
    total.innerHTML = "";
    total.style.background = "#da0037";
  }
}
//creat products
//save lacalstorge
let dataProducts = [];
if (localStorage.product != null) {
  let dataParse = JSON.parse(localStorage.getItem("product"));
  dataProducts = dataParse;
  showData();
} else {
  dataProducts = [];
}

submit.addEventListener("click", function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value || 0,
    ads: ads.value || 0,
    discount: discount.value || 0,
    total: total.innerHTML,
    count: count.value || 1,
    category: category.value,
  };
  dataProducts.push(newProduct);
  localStorage.setItem("product", JSON.stringify(dataProducts));
  clearInputs();
  showData();
});

//clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  total.style.background = "#da0037";
  count.value = "";
  category.value = "";
}
//read
function showData() {
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    table += `
        <tr>
        <td>${i}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button id="update">update</button></td>
        <td><button id="delete">delete</button></td>
      </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
}
showData();
//count

//delete

//update

// search

// clean data
