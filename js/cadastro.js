const listUsers = JSON.parse(localStorage.getItem("login")) || [];
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
  const gender = document.querySelector("#gender");
  const textGender = gender.options[gender.selectedIndex].text;
  const img = selectImage(textGender);

  const registrationPassword = document.querySelector(".input_pswd");
  const registrationPasswordConfirm = document.querySelector(".input_confirm");


  if (name && lastName && email && job && password) {
    if(registrationPassword.value !== registrationPasswordConfirm.value){
      alert('As senhas não são iguais.')
    }
    else{
    const date = new Date();
    let countID = date.getTime();

    const User = {
      userName: name,
      userLastName: lastName,
      userGender: textGender,
      userLocation: textLocation,
      userId: countID,
      userPassword: password,
      userJob: job,
      userPoints: 0,
      userRating: 80,
      userPicture: img,
      userPost : [],
    };

    listUsers.push(User);
    localStorage.setItem("login", JSON.stringify(listUsers));
    location.href = "../pages/login.html";
  }}
   else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }

 

});

function selectImage(gender) {
  let imgUser;
  switch (gender) {
    case "Mulher Cisgênero":
      imgUser = "mulher1.png";
      break;

    case "Homem Cisgênero":
      imgUser = "homem1.png";
      break;

    case "Homem Transgênero":
      imgUser = "homem2.png";
      break;

    case "Mulher Transgênero":
      imgUser = "mulher2.png";
      break;

    case "Gênero Não-Binário":
      imgUser = "naobinario.png";
      break;
    case "Gênero-Fluido":
      imgUser = "naobinaria.png";
      break;
  }

  return imgUser;
}

function checkPassword() {
  const registrationPassword = document.querySelector(".input_pswd");
  const registrationPasswordConfirm = document.querySelector(".input_confirm");

  if (registrationPassword.value === registrationPasswordConfirm.value) {
    registrationPasswordConfirm.setCustomValidity("");
  } else {
    registrationPasswordConfirm.setCustomValidity("As senhas não são iguais!");
  }
  document.querySelector('.pass-incorrect').innerHTML = 'As senhas não são iguais';
}
