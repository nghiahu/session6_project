const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const UserLoginElement = document.getElementById("userLogin");
const signElement = document.getElementById("sign");
const accElement = document.getElementById("acc");
const deleteElement = document.getElementById("out");
const users = JSON.parse(localStorage.getItem("users"));
let products = JSON.parse(localStorage.getItem("products"));
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
let sum = 0;
let totalPaymentAll = 0;
// Kiểm tra xem người dùng đã đăng nhập chưa và cập nhật giao diện
if (userLogin) {
    signElement.style.display = "none";
    accElement.style.display = "block";
    UserLoginElement.innerHTML = userLogin.userAcc;
} else {
    accElement.style.display = "none";
}
deleteElement.addEventListener('click', function(){
    localStorage.removeItem("userLogin");
});



function rendercart(user) {
    const tableCart = document.getElementById("table");
    tableCart.innerHTML = ''; 
    tableCart.innerHTML +=
        `
        <tr>
            <th>#</th>
            <th></th>
            <th>Sản phẩm</th>
            <th></th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Số tiền</th>
            <th>Thao tác</th>
        </tr>
        `;

    const users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userLogin.id) {
            for (let j = 0; j < users[i].cart.length; j++){
                const totalPayment = parseInt(users[i].cart[j].price) * users[i].cart[j].quantity;
                console.log(totalPayment);
                tableCart.innerHTML += `
                    <tr>
                      <td>${j + 1}</td>
                      <td><input type="checkbox"></td>
                      <td id="produ"><img src="${users[i].cart[j].image}" alt=""></td>
                      <td>${users[i].cart[j].name}</td>
                      <td>${VND.format(users[i].cart[j].price)}</td>
                      <td><input type="number" value="${users[i].cart[j].quantity}" min="1" onchange="updateTotal(${i}, ${j}, this.value)"></td>
                      <td >${VND.format(totalPayment)}</td>
                      <td><button id="butdete" onclick="deleteProduct(${i}, ${j})"><ion-icon name="trash-outline"></ion-icon></button></td>
                    </tr>
                    `;
            }
        }
    }
}

function updateTotal(userIndex, productIndex, quantity) {
    const users = JSON.parse(localStorage.getItem("users"));
    const product = users[userIndex].cart[productIndex];
    product.quantity = parseInt(quantity);
    const totalAmountCell = document.getElementById(`totalAmount_${userIndex}_${productIndex}`);
    const totalPayment = product.price * product.quantity;
    localStorage.setItem("users", JSON.stringify(users));
    rendercart(); 
    totalAmountCell.textContent = totalPayment; 
    users[userIndex].cart[productIndex] = product;
    localStorage.setItem("users", JSON.stringify(users));
}

function deleteProduct(userIndex, productIndex) {
    let confirmation = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirmation) {
    const users = JSON.parse(localStorage.getItem("users"));
    users[userIndex].cart.splice(productIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    rendercart();
}else {
    return;
}
}
rendercart();

function setupCheckboxListeners() {
    const checkboxes = document.querySelectorAll('#table input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            handleCheckboxChange(index, this.checked);
        });
    });
}

function handleCheckboxChange(index, isChecked) {
    const users = JSON.parse(localStorage.getItem("users"));
    console.log(`${index}: ${isChecked}`);
    if (isChecked) {
        sum += 1; 
    } else {
        sum -= 1; 
    }
    if (isChecked) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userLogin.id) {
                const totalPayment = parseInt(users[i].cart[index].price) * users[i].cart[index].quantity;
                totalPaymentAll += totalPayment; 
            }
        }
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userLogin.id) {
                const totalPayment = parseInt(users[i].cart[index].price) * users[i].cart[index].quantity;
                totalPaymentAll -= totalPayment; 
            }
        }
    }
}
setupCheckboxListeners();   


function renderbuy() {
    let elements = "";
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userLogin.id) {
                elements +=
                        `
                        <div id="choice_all">
                        <input type="checkbox"> 
                        <div>Chọn tất cả (${users[i].cart.length})</div> 
                        <div>Xóa</div>
                    </div>
                    <div id="buy_all">
                        <div>Tổng thanh toán(${sum} sản phẳm)</div>
                        <div>${VND.format(totalPaymentAll)}</div>
                        <button type="button">Mua hàng</button>
                    </div>
                        `
            }
        }
        document.getElementById("buyProductCart").innerHTML=elements;   
}
renderbuy();