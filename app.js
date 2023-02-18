let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
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

submit.addEventListener("click", saveDataAndCreate);
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    saveDataAndCreate();
  }
});
function saveDataAndCreate() {
  if (
    price.value != "" &&
    title.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
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
    if (mood == "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProducts.push(newProduct);
        }
      } else {
        dataProducts.push(newProduct);
      }
    } else {
      dataProducts[tmp] = newProduct;
      mood = "create";
      count.style.display = "block";
      submit.innerHTML = "create";
    }
    localStorage.setItem("product", JSON.stringify(dataProducts));
    clearInputs();
    showData();
  } else {
    alert("ADD Title,price,category and count <1000");
  }
}
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
        <td>${i + 1}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button id="update" onClick="upDate(${i})">update</button></td>
        <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDiv = document.getElementById("deleteDiv");
  if (dataProducts.length > 0) {
    btnDiv.innerHTML = `<button onClick="deleteAll()">Delete All (${dataProducts.length})</button>`;
  } else {
    btnDiv.innerHTML = "";
  }
}
showData();
//delete
function deleteData(i) {
  dataProducts.splice(i, 1);
  localStorage.product = JSON.stringify(dataProducts);
  showData();
}
function deleteAll() {
  dataProducts = [];
  localStorage.clear();
  showData();
}
//update
function upDate(i) {
  title.value = dataProducts[i].title;
  price.value = dataProducts[i].price;
  taxes.value = dataProducts[i].taxes;
  ads.value = dataProducts[i].ads;
  discount.value = dataProducts[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProducts[i].category;
  submit.innerHTML = "Updata";
  mood = "upDate";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    if (searchMood == "title") {
      if (dataProducts[i].title.toLowerCase().includes(value.toLowerCase())) {
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
        <td><button id="update" onClick="upDate(${i})">update</button></td>
        <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    } else {
      if (
        dataProducts[i].category.toLowerCase().includes(value.toLowerCase())
      ) {
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
        <td><button id="update" onClick="upDate(${i})">update</button></td>
        <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
// clean data
