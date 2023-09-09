const login = JSON.parse(localStorage.getItem("login"));
const bntPopUp = document.querySelector("#btn_popup");
const bntPitch = document.querySelector("#btn_popup2");
const btnPerfil = document.querySelector("#mudarPerfil");
const modal = document.querySelector("#popup-jogos");
const modalPitch = document.querySelector("#pitch");
const modalPerfil = document.querySelector("#perfil");
const modalClose = document.querySelector("#modal_close");
const modalClose2 = document.querySelector("#modal_close2");
const modalClose3 = document.querySelector("#modal_close3");
const pointsIndex = document.querySelector("#user-points");

modalClose.addEventListener("click", () => modal.close());
bntPopUp.addEventListener("click", () => modal.showModal());

modalClose2.addEventListener("click", () => modalPitch.close());
bntPitch.addEventListener("click", () => modalPitch.showModal());

btnPerfil.addEventListener("click", () => modalPerfil.showModal());
modalClose3.addEventListener("click", () => modalPerfil.close());

const imagensPerfil = document.querySelectorAll(".img__perfil");

imagensPerfil.forEach((img) =>
  img.addEventListener("click", function trocaIcone() {
    modalPerfil.src = img.src;
    modalPerfil.close();
  })
);

upDate()


function upDate() {
  login.forEach((element) => {
    const pointsRanking = document.querySelector("#points-ranking-index");
    const nameRanking = document.querySelector("#name-ranking-index");
    const userNamefirst = document.querySelector("#perfil-name-first");
    const userNameLast = document.querySelector("#perfil-name-last");
    const userJobTitle = document.querySelector("#job-title");
    const positionGlobal = document.querySelector("#position-global");

    positionGlobal.innerText = `Posição Global: #${element.userRating}`;
    nameRanking.innerText = element.userName;
    pointsRanking.innerText = `${element.userPoints} pts`;
    userNamefirst.innerText = element.userName;
    userNameLast.innerText = element.userLastName;
    userJobTitle.innerText = element.userJob;

   // element.userPoints == 0 ? 
    //pointsIndex.parentElement.innerText = "Interaja com a plataforma para ganhar pontos!" :
    pointsIndex.innerText = element.userPoints;

   
  });
}

function upDatePoints() {
  const divPoints = document.querySelectorAll(".div-points");

  divPoints.forEach((element) => {
    const pointsElement = element.querySelector(".points");
    const btnElement = element.querySelector("svg");

    let clicked = false;

    btnElement.addEventListener("click", () => {
      if (!clicked) {
        const currentPoints = parseInt(pointsElement.textContent);
        const newPoints = currentPoints + 1;

        pointsElement.textContent = newPoints;

        login[0].userPoints += 250;
        localStorage.setItem("login", JSON.stringify(login));
        clicked = true;
        upDate();
      }
    });
  });
}

upDatePoints();
