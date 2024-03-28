let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {		    
        if (users[i].id == userLogin.id) {		        

            //lấy thông tin sản phẩm để đưa vào giỏ hàng		   
            // làm sao để lấy thông tin sản phẩm		            
            // console.log("11111", productId);		    
    let index = users[i].cart.findIndex((item, index) => {
        return item.id == productId
    })
        if (index == -1) {
            //tức là không có thêm bình thường
            console.log("chưa có ");
            users[i].cart.push({ ...products[i], quantity: 1 });
            localStorage.setItem("users", JSON.stringify(users));
            showQuantityCart()
        } else {
            //có rồi đi tăng số lượng
            // mình phải biết vị trí của cái cần tăng
            users[i].cart[index].quantity = ++users[i].cart[index].quantity;
            localStorage.setItem("users", JSON.stringify(users));
            }
        }
    }   
}
// function hiển thị số lượng sản phẩm
    function showQuantityCart() {
    // lấy giỏ hàng ra.length là được
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
    if (users[i].id === userLogin.id) {
    // console.log(users[i].cart);
    console.log("fuk")
    document.getElementsByClassName("cart-number")[0].innerHTML = users[i].cart.length
    }
}
}
showQuantityCart()