const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("email");
const passElement = document.getElementById("pass");
const errorElement = document.getElementById("error");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");
const users = document.getElementById("users");

function validateEmail  (email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

formLogin.addEventListener("submit", function(e){
    e.preventDefault();
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];
    const findUser = userLocal.find((user) => user.email === emailElement.value && user.pass === passElement.value);

    if (!emailElement.value){
        emailError.style.display = "block"
    }else{
        if(!findUser){
            errorElement.style.display = "block";
        }else{
            window.location.href = "/index.html";
            localStorage.setItem("userLogin",JSON.stringify(findUser));
        }
        emailError.style.display = "none"
        if(!validateEmail(emailElement.value)){
            emailError.style.display = "block";
            emailError.innerHTML = "Email không hợp lệ"
        }else{
            emailError.style.display = "none"
        }
    }
    if (!passElement.value){
        passError.style.display = "block"
    }else{
        if(!findUser){
            errorElement.style.display = "block";
        }else{
            for(let i = 0; i < users.length;i++){
                if(users[i].id === findUser.id){
                    users[i].status = true;
                    break;
                }
            }
            localStorage.setItem("users",JSON.stringify(users));
            localStorage.setItem("userLogin",JSON.stringify(findUser));
            window.location.href = "/index.html";
           
        }
        passError.style.display = "none"
    }

});


