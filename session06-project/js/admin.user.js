const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const nameAdmin = document.getElementById("name");
const users = JSON.parse(localStorage.getItem("users"));
nameAdmin.innerHTML = userLogin.userAcc;
const table = document.querySelector(".table");

function render(users) {
  const table = document.querySelector(".table");

  table.innerHTML += `
    <tr>  
      <th>#</th>
      <th>id</th>
      <th>Email</th>
      <th>Name</th>
      <th>status</th>
      <th></th>
    </tr>`;

  users.forEach((user, index) => {
    const lockStatus = user.lock ? 'Khóa' : 'Đã khóa';
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.id}</td>
        <td>${user.email}</td>
        <td>${user.userAcc}</td>
        <td>${user.status}</td>
        <td><button class="unlocked" onclick="board(this)">${lockStatus}</button></td>
      </tr>`;
    });
  }
  render(users);
  
  function checkStatus(){
    const users = JSON.parse(localStorage.getItem("users"));
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    for(let i = 0;i<users.length;i++){
      if(users[i].id == userLogin.id){
        users[i].status = "đang hoạt động";
      }else{
        users[i].status = "không hoạt động";
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
  checkStatus();

// function board(button){
//   const users = JSON.parse(localStorage.getItem("users"));
//   for(let i = 0;i<users.length;i++){
//     if(users[i].lock == false){
//       button.innerHTML = "Khóa";
//       users[i].lock = true;
//       button.classList.remove("locked");
//       button.classList.add("unlocked");
//       break;
//     }else{
//       button.innerHTML = "Đã khóa";
//       users[i].lock = false;
//       button.classList.remove("unlocked");
//       button.classList.add("locked");
//       break;
//     }
//   }
//   localStorage.setItem("users",JSON.stringify(users))
// }
// board();   