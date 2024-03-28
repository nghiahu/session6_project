const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const nameAdmin = document.getElementById("name");
const products = JSON.parse(localStorage.getItem("products"));
const addproduct = document.getElementById("addButton");
const fromAddproduct = document.getElementById("from");
const outfrom = document.getElementById("outform");
const outfromEdit = document.getElementById("outformEdit");
const fromAdd = document.getElementById("fromAdd");
const fromEdit = document.getElementById("fromEdit");
const editButton = document.getElementById("EditButton")
const nameProductElement = document.getElementById("nameProduct");
const imageProduct = document.getElementById("image");
const priceElement = document.getElementById("price");
const soldElement = document.getElementById("sold");
const productLocal = JSON.parse(localStorage.getItem("products")) || [];
var imgProduct;
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

nameAdmin.innerHTML = userLogin.userAcc;

function render(products) {
  const table = document.getElementById("table");
  table.innerHTML += `
    <tr>  
    <th>#</th>
    <th>id</th>
    <th>Sản phẩm</th>
    <th>Tên</th>
    <th>Giá</th>
    <th>Kho</th>
    <th>Đã bán</th>
    <th>Đánh giá</th>
    <th>Số sao</th>
    <th></th>
    </tr>`;

  products.forEach((products, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${products.id}</td>
        <td><img src="${products.image}" alt=""></td>
        <td>${products.name}</td>
        <td>${VND.format(products.price)}</td>
        <td>${products.sold}</td>
        <td>${products.stock}</td>
        <td>${products.Evaluate}</td>
        <td>${products.star}</td>
        <td class="but">
        <button type="button" onclick="editProduct(${index})">Sửa</button>
        <button type="button" onclick="deleteProduct(${index})">Xóa</button>
        </td>
      </tr>`;
  });
}
render(products);

function deleteProduct(productIndex) {
  let confirmation = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
  if (confirmation) {
      products.splice(productIndex, 1);
      localStorage.setItem('products', JSON.stringify(products));
      render(products);
      location.reload();
  } else {
      return;
  }
}

fromAdd.addEventListener("click",function(e){
  fromAddproduct.style.display = "flex"
});
outfrom.addEventListener("click",function(e){
  fromAddproduct.style.display = "none"
});
////////////////////////////////
// function edit
function editProduct(index){
  const product = products[index];
  document.getElementById("imageEdit").value = "";
  document.getElementById("nameProductEdit").value = product.name;
  document.getElementById("priceEdit").value = product.price;
  document.getElementById("soldEdit").value = product.sold;
  document.getElementById("stockEdit").value = product.stock;
  document.getElementById("EvaluateEdit").value = product.Evaluate;
  document.getElementById("starEdit").value = product.star;
  const formEdit = document.getElementById("fromEdit");
  formEdit.setAttribute("data-index", index);

  formEdit.style.display = "flex";
}

fromEdit.addEventListener("submit", function(e){
  e.preventDefault();
  const index = parseInt(this.getAttribute("data-index"));
  if(document.getElementById("imageEdit").value &&
  document.getElementById("nameProductEdit").value &&
  document.getElementById("priceEdit").value &&
  document.getElementById("soldEdit").value &&
  document.getElementById("stockEdit").value &&
  document.getElementById("EvaluateEdit").value &&
  document.getElementById("starEdit").value){
  products[index].image = imgProduct;
  products[index].name = document.getElementById("nameProductEdit").value;
  products[index].price = document.getElementById("priceEdit").value;
  products[index].sold = document.getElementById("soldEdit").value;
  products[index].stock = document.getElementById("stockEdit").value;
  products[index].Evaluate = document.getElementById("EvaluateEdit").value;
  products[index].star = document.getElementById("starEdit").value;
  localStorage.setItem('products', JSON.stringify(products));
  this.style.display = "none";
  render(products);
  location.reload();
    }else{
      alert("hãy điền đầy đủ thông tin");
    }
});



outfromEdit.addEventListener("click",function(e){
  fromEdit.style.display = "none"
});

function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result)
    imgProduct = reader.result;
  }
  reader.readAsDataURL(file);
}

fromAddproduct.addEventListener("submit",function(e){
  e.preventDefault();
  console.log(imageProduct.value, "+" , nameProductElement.value, "+" , priceElement.value, "+",soldElement.value)
  if(imageProduct.value&&
    nameProductElement.value&&
    priceElement.value&&
    soldElement.value){
      const product = {
        id: Math.ceil(Math.random() * 10000000),
        image: imgProduct,
        name: nameProductElement.value,
        price: priceElement.value,
        sold: soldElement.value,
        stock: 0,
        star: 0,
        Evaluate:0,
    };
    productLocal.push(product);
    localStorage.setItem("products",JSON.stringify(productLocal));
    fromAddproduct.style.display = "none"
    render(products);
    location.reload();
    }else{
      alert("hãy điền đầy đủ thông tin");
    }

})





