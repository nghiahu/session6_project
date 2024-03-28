const formRegister = document.getElementById("formRegister");
const emailElement = document.getElementById("email");
const nameElement = document.getElementById("name");
const nameAccElement = document.getElementById("nameAcc");
const passElement = document.getElementById("pass");

const emailError = document.getElementById("emailError");
const nameError = document.getElementById("nameError");
const nameAccError = document.getElementById("nameAccError");
const passError = document.getElementById("passError");
const emailErrorRepeat = document.getElementById("emailErrorRepeat");


const userLocal = JSON.parse(localStorage.getItem("users")) || [];


/**
 * Validate email address
 * @param {*} email 
 * @returns 
 */

function validateEmail  (email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

formRegister.addEventListener("submit",function(e){
    e.preventDefault();
    const findEmailUser = userLocal.find((user) => user.email === emailElement.value);
    if (!emailElement.value){
        emailError.style.display = "block"
    }else{
        emailError.style.display = "none"
        if(!validateEmail(emailElement.value)){
            emailError.style.display = "block";
            emailError.innerHTML = "Email không hợp lệ";
        }else{
            emailError.style.display = "none"
        }
        if(findEmailUser){
            emailError.style.display = "block";
            emailError.innerHTML = "Email đã được đăng ký vui lòng sử dụng địa chỉ email khác";
        }else{
            emailError.style.display = "none";
        }
    }
    if (!nameElement.value){
        nameError.style.display = "block"
    }else{
        nameError.style.display = "none"
    }
    if (!nameAccElement.value){
        nameAccError.style.display = "block"
    }else{
        nameAccError.style.display = "none"
    }
    if (!passElement.value){
        passError.style.display = "block"
    }else{
        passError.style.display = "none"
    }

    if(emailElement.value && 
        nameElement.value && 
        nameAccElement.value && 
        passElement.value&& 
        !findEmailUser)
        {
            const user = {
                id: Math.ceil(Math.random() * 10000000),
                email: emailElement.value,
                userName: nameElement.value,
                userAcc: nameAccElement.value,
                pass: passElement.value,
                status:false,
                lock:false,
                cart: []
            };

            userLocal.push(user);

            localStorage.setItem("users",JSON.stringify(userLocal));
            window.location.href = "login.html";

        }

     


});