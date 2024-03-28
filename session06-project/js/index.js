const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const UserLoginElement = document.getElementById("userLogin");
const signElement = document.getElementById("sign");
const accElement = document.getElementById("acc");
const deleteElement = document.getElementById("out");
const condition = document.getElementById("condition");
const productsList =document.getElementById("list-product");
// const pro = JSON.parse(localStorage.getItem("products"));


condition.addEventListener("click", function(){
    if(userLogin){
        window.location.href = "/pages/cart.html";
    }else{
        alert("Đăng nhập để kiểm tra giỏ hàng");
    }
});


if (userLogin) {
    signElement.style.display = "none";
    accElement.style.display = "block";
    UserLoginElement.innerHTML = userLogin.userAcc;
} else {
    accElement.style.display = "none";
}

deleteElement.addEventListener('click', function(){
    localStorage.removeItem("userLogin");
    location.reload();
});

// let products = [
//     {
//     image: "./asset/images/101.webp",
//     name: "Giày Thể Thao Nam GTT23.1",
//     price: 450000,
//     id: 1475922,
//     stock: 21,
//     star: 5,
//     Evaluate:53,
//     sold: 235,
// },
//     {
//     image: "./asset/images/dien-thoai-samsung-galaxy-a05-4128g-a055f-bac_eb85bcc6.jpg",
//     name: "Điện thoại Samsung Galaxy A05 (4+128G) A055F Bạc",
//     price: 4999000,
//     id: 2492984,
//     stock: 21,
//     star: 5,
//     Evaluate:53,
//     sold: 235,
// },
//     {
//     image: "./asset/images/Túi-xách-da-nữ-handmade-Velisa-560-3.jpeg",
//     name: "Túi xách da nữ handmade VLS 560",
//     price: 11230000,
//     id: 3183752,
//     stock: 21,
//     star: 5,
//     Evaluate:53,
//     sold: 235,
// },
//     {
//     image: "./asset/images/4b30e545689f450e84a5b701d967d34a.jpg_720x720q80.jpg",
//     name: "Móc treo điện thoại, dây đeo điện thoại, móc khóa acrylic Raiden Genshin Impact anime chibi...",
//     price: 109000,
//     id: 4036925,
//     stock: 21,
//     star: 5,
//     Evaluate:53,
//     sold: 235,
// },
//     {
//     image: "./asset/images/images (1).jpg",
//     name: "Ốp lưng iPhone 15 Pro Max RINGKE Onyx Design - RINGKE VIETNAM",
//     price: 35000,
//     id: 5673924,
//     stock: 21,
//     star: 5,
//     Evaluate:53,
//     sold: 235,
// },
//     {
//     image: "./asset/images/1c9c18fc43f4b7cdc762d3d0d37a486a.jpg_550x550.jpg",
//     name: "Đèn led genshin impact raiden trang trí phòng ngủ quà tặng",
//     price: 350000,
//     id: 6174942,
//     stock: 21,
//     star: 5,
//     Evaluate:53,
//     sold: 235,
// },
//     {
//     image: "./asset/images/b516316b7266614a61ad07dd082b22ed.jpg_800x800Q100.jpg",
//     name: "Chuột máy tính chơi game G21 có dây bản cải tiến,hiệu ứng ánh sáng đèn led 7 màu, phù hợp cho game thủ và văn phòng..",
//     price: 1239000,
//     id: 7145924,
//     stock: 21,
//     star: 5,
//     Evaluate:53,
//     sold: 235,
// },
//     {
//     image: "./asset/images/images (2).jpg",
//     name: "Thú nhồi bông hình cáo Sta5 Genshin Impact Yae Miko phù hợp làm quà tặng cho bé | Shopee Việt Nam",
//     price: 210000,
//     id: 8523572,
//     stock: 21,
//     star: 5,
//     Evaluate:53,
//     sold: 235,
// },
// ]
// // // lưu data trên localstorage
// localStorage.setItem("products",JSON.stringify(products));

// lấy dữ liệu về 
let products = JSON.parse(localStorage.getItem("products"));
console.log(products);
// pro.addEventListener("click",function(){
//     window.location.href ="/pages/information.html"
// });

// function render product
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  console.log('Việt Nam đồng: ' + VND.format(products.price));

function renderProduct() {
    let element = "";
    for(let i = 0; i < products.length; i++) {
        let product = products[i];
        element +=
            `
            <div class="products" id="products">
            <div class="add">
                <button type="button" onclick="addToCart(${product.id})" class="info">Thêm vào giỏ</button>
                <button type="button" onclick="infoPage(${product.id})" class="info">Chi tiết</button>
                </div>
                <img src="${product.image}" alt="">
                <p class="introduce">${product.name}</p>
                <div class="price">
                    <p>${VND.format(product.price)}</p>
                    <p>Đã bán ${product.stock}</p>
                </div>
            </div>
            `
    }
    // console.log("111",element)
    document.getElementById("list-product").innerHTML=element;
}
renderProduct();


// function đi mua hàng
function addToCart(productId) {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (!userLogin) {
        alert("Hãy đăng nhập để mua hàng");
        return;
    }
    // for(let l = 0;l < users.length;l++){
    //     if(users[l].id = userLogin.id){
    //         if(users[l].lock == false){
    //             alert("Tài khỏa của bạn đã bị khóa,bạn không thể mua hàng");
    //             return;
    //         }
    //     }
    // }

    let productData = JSON.parse(localStorage.getItem("products"));
    let product = productData.find(item => item.id === productId);

    if (!product) {
        console.error("Không tìm thấy sản phẩm với id:", productId);
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userLogin.id) {
            let index = users[i].cart.findIndex(item => item.id === productId);
            if (index === -1) {
                users[i].cart.push({ ...product, quantity: 1 });
            } 
            localStorage.setItem("users", JSON.stringify(users));
            showQuantityCart();
            break;
        }
    }
}

function showQuantityCart() {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userLogin.id) {
            document.getElementsByClassName("cart-number")["0"].innerHTML = users[i].cart.length;
            break; // Thoát khỏi vòng lặp sau khi hiển thị số lượng
        }
    }
}
showQuantityCart();

function infoPage(productId){
    let productData = JSON.parse(localStorage.getItem("products"));
    let product = productData.find(item => item.id === productId);
    // console.log(product.id);
    localStorage.setItem("infomation",JSON.stringify(product.id))
    window.location.href = "/pages/information.html";
}