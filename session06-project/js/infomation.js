const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const UserLoginElement = document.getElementById("userLogin");
const signElement = document.getElementById("sign");
const accElement = document.getElementById("acc");
const deleteElement = document.getElementById("out");
const condition = document.getElementById("condition");
const information =document.getElementById("information");
const products = JSON.parse(localStorage.getItem("products"));


const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

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


function showQuantityCart() {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userLogin.id) {
            document.getElementsByClassName("cart-number")["0"].innerHTML = users[i].cart.length;
            break;
        }
    }
}
showQuantityCart();


function renderInfomation() {
    let infomationId = JSON.parse(localStorage.getItem("infomation"));
    // console.log(infomationId);
    let element = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == infomationId) {
            element +=
                `
                <div class="information_left">
                    <img src="${products[i].image}" alt="">
                    <div class="share">
                        <div>Chia sẻ:</div>
                        <ion-icon class="logo_facebook" name="logo-facebook"></ion-icon>
                        <ion-icon class="logo_instagram" name="logo-instagram"></ion-icon>
                        <ion-icon class="logo_twitter" name="logo-twitter"></ion-icon>
                        <ion-icon class="logo_twitch" name="logo-twitch"></ion-icon>
                    </div>
                </div>
                <div class="information_right">
                    <p>${products[i].name}</p>
                    <div class="parameter">
                        <div class="star">${products[i].star}<ion-icon name="star" class="starx"></ion-icon><ion-icon name="star" class="starx"></ion-icon><ion-icon name="star" class="starx"></ion-icon><ion-icon name="star" class="starx"></ion-icon><ion-icon name="star" class="starx"></ion-icon></div>
                        <div id="arr" class="arrange">${products[i].Evaluate}<p>Đánh giá</p></div>
                        <div class="arrange">${products[i].stock}<p>Đã bán</p></div>
                    </div>
                    <div class="price">${VND.format(products[i].price)}</div>
                    
                    <div class="quantity">
                        <div class="colz">Số lượng</div>
                        <input type="number" min="1" value="1" max="${products[i].sold}" onchange="updateQuantity(${products[i].id}, this.value)">
                        <div class="col">${products[i].sold} sản phẩm có sẵn</div>  
                    </div>

                    <div class="but">
                        <button class="button_add_cart" type="button" onclick="addToCart(${products[i].id})"><ion-icon name="cart-outline" class="icon_add"></ion-icon> Thêm vào giỏ hàng</button>
                        <button class="button_buy" type="button">Mua ngay</button>
                    </div>
                </div>
                `;
        }
    }
    document.getElementById("information").innerHTML = element;
}
renderInfomation();

function addToCart(productId) {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (!userLogin) {
        alert("Hãy đăng nhập để mua hàng");
        return;
    }

    let productData = JSON.parse(localStorage.getItem("products"));
    let product = productData.find(item => item.id === productId);
    if (!product) {
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

function updateQuantity(productId, quantity) {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (!userLogin) {
        alert("Hãy đăng nhập để mua hàng");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userLogin.id) {
            let index = users[i].cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                users[i].cart[index].quantity = parseInt(quantity);
                localStorage.setItem("users", JSON.stringify(users));
                showQuantityCart();
                break;
            }
        }
    }
}


