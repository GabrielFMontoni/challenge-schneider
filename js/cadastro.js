const listUsers = JSON.parse(localStorage.getItem("user")) || [];
const btnInput = document.querySelector("#btn-input");

btnInput.addEventListener("click", (event) => {
  event.preventDefault();

  const name = document.querySelector("#uname").value;
  const lastName = document.querySelector("#lastname").value;
  const email = document.querySelector("#nameEmail").value;
  const job = document.querySelector("#user-job").value;
  const password = document.querySelector("#password").value;
  const unitLocation = document.querySelector("#unidades");
  const textLocation = unitLocation.options[unitLocation.selectedIndex].text;

  if (name && lastName && email && job && password) {
    const date = new Date();
    let countID = date.getTime();

    const User = {
      userName: name,
      userLastName: lastName,
      userEmail: email,
      userLocation: textLocation,
      userId: countID,
      userPassword: password,
      userJob: job,
      userPoints: 0,
      userRating: 80,
    };

    listUsers.push(User);
    localStorage.setItem("user", JSON.stringify(listUsers));
    location.href = "../pages/login.html";
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
});

function checkPassword() {
  const registrationPassword = document.querySelector(".input_pswd");
  const registrationPasswordConfirm = document.querySelector(".input_confirm");

  if (registrationPassword.value === registrationPasswordConfirm.value) {
    registrationPasswordConfirm.setCustomValidity("");
  } else {
    registrationPasswordConfirm.setCustomValidity("As senhas não são iguais!");
  }
}
