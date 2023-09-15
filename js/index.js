const login = JSON.parse(localStorage.getItem("login"));
const rankingUsersToIndex = JSON.parse(localStorage.getItem("rankingToIndex"));

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
    let imgChoose = img.src;
    imgChoose = imgChoose.split("/");
    btnPerfil.src = img.src;

    login[0].userPicture = imgChoose[imgChoose.length - 1];
    localStorage.setItem("login", JSON.stringify(login));
    modalPerfil.close();
  })
);

upDate();

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
    btnPerfil.src = `./assets/icones/${element.userPicture}`;

    element.userPoints == 0
      ? (pointsIndex.parentElement.innerText =
          "Interaja com a plataforma para ganhar pontos!")
      : (pointsIndex.innerText = element.userPoints);
    upDateRankingIndex(
      element.userPoints,
      element.userName,
      element.userRating
    );
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

function upDateRankingIndex(points, name, position) {
  const table = document.querySelector(".table-tbody");
  const firstChildren = table.children[0];
  const secoundChildren = table.children[1];
  const lastChildren = table.children[2];
  const list = rankingUsersToIndex[0];

  if (points == 0) {
    table.style.cssText = "display: none;";
  } else {
    let firstInfo, secondInfo, lastInfo;

    if (points > 1271) {
      firstInfo = [position, name, `${points} pts`];
      secondInfo = [
        list.secoundPosition.position,
        list.secoundPosition.name,
        list.secoundPosition.points,
      ];
      lastInfo = [
        list.thirdPosition.position,
        list.thirdPosition.name,
        list.thirdPosition.points,
      ];
      table.style.cssText = "display: flex;";
      addBackgroundcolor(firstChildren);
    } else if (points < 30) {
      firstInfo = [
        list.antepnultimate.position,
        list.antepnultimate.name,
        list.antepnultimate.points,
      ];
      secondInfo = [
        list.penultimatePosition.position,
        list.penultimatePosition.name,
        list.penultimatePosition.points,
      ];
      lastInfo = [position, name, `${points} pts`];
      table.style.cssText = "display: flex;";
      addBackgroundcolor(lastChildren);
    } else {
      firstInfo = [
        list.previusPosition.position,
        list.previusPosition.name,
        list.previusPosition.points,
      ];
      secondInfo = [position, name, `${points} pts`];
      lastInfo = [
        list.nextPosition.position,
        list.nextPosition.name,
        list.nextPosition.points,
      ];
      table.style.cssText = "display: flex;";
      addBackgroundcolor(secoundChildren);
    }

    setElementInfo(firstChildren, firstInfo);
    setElementInfo(secoundChildren, secondInfo);
    setElementInfo(lastChildren, lastInfo);
  }
}

function setElementInfo(element, info) {
  element.children[0].innerText = info[0];
  element.children[1].innerText = info[1];
  element.children[2].innerText = info[2];
}

function addBackgroundcolor(htmlElement) {
  [...htmlElement.children].forEach((element) => {
    element.classList.add("bg-warning");
  });
}

upDatePoints();
