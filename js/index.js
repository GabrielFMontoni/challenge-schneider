import { upDateRanking, ElementUser, sortList } from "./ranking.js";

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
const divPoints = document.querySelectorAll(".div-points");
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
    localStorage.setItem("loginAtual", JSON.stringify(login));
    location.reload();
    modalPerfil.close();
  })
);
async function pegaListaRanking() {
  const htmlRanking = await fetch("../pages/ranking.html")
    .then((response) => response.text())
    .then((htmlString) => {
      const regex = /<table[^>]*>[\s\S]*<\/table>/i;
      const tabelaRanking = htmlString.match(regex);
      const tempDiv = document.createElement("div");

      tempDiv.innerHTML = tabelaRanking[0];
      document.body.appendChild(tempDiv);
      tempDiv.style.display = "none";
      // console.log(tempDiv)

      upDateRanking();
      ElementUser();
      sortList();
      upDate();
    });
}
pegaListaRanking();

const login = JSON.parse(localStorage.getItem("loginAtual"));
if (!login) {
  document.querySelector("header").style.display = "none";
  document.querySelector("main").classList.add("d-none");
  document.querySelector("#irParaCadastro").classList.remove("d-none");
}

function upDate() {
  login.forEach((element) => {
    const pointsRanking = document.querySelector("#points-ranking-index");
    const nameRanking = document.querySelector("#name-ranking-index");
    const userNamefirst = document.querySelector("#perfil-name-first");
    const userNameLast = document.querySelector("#perfil-name-last");
    const userJobTitle = document.querySelector("#job-title");
    const positionGlobal = document.querySelector("#position-global");
    // console.log(element.userRating)
    positionGlobal.innerText = `Posição Global: #${element.userRating}`;
    nameRanking.innerText = element.userName;
    pointsRanking.innerText = `${element.userPoints} pts`;
    userNamefirst.innerText = element.userName;
    userNameLast.innerText = element.userLastName;
    userJobTitle.innerText = element.userJob;
    btnPerfil.src = `./assets/icones/${element.userPicture}`;

    console.log(element.userRating);
    element.Rating > 80
      ? (pointsIndex.parentElement.innerText =
          "Interaja com a plataforma para ganhar pontos!")
      : (pointsIndex.innerText = element.userPoints);
    parseInt(document.querySelector("#user-points").innerHTML) > 0
      ? (document.querySelector("#seta").style.display = "block")
      : (document.querySelector("#seta").style.display = "none");

    const userRanking = document.querySelector("#user-ranking");
    const pontuacaoDoRanking = parseInt(userRanking.children[0].innerHTML);
    const nomeUser = userRanking.children[1].innerHTML;
    const pontuacao = parseInt(userRanking.children[2].innerHTML[0]);
    // console.log(pontuacaoDoRanking)
    // console.log(nomeUser)
    // console.log(pontuacao)

    // console.log(element.userPoints)
    upDateRankingIndex(element.userPoints, nomeUser, pontuacaoDoRanking);
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

        login[0].userPoints += 10;

        clicked = true;
        localStorage.setItem("loginAtual", JSON.stringify(login));
        // console.log(login[0])
        upDateRanking();
        ElementUser();
        upDate();
      }
    });
  });
}

function upDateRankingIndex(points, name, position) {
  const rankingUsersToIndex = JSON.parse(
    localStorage.getItem("rankingToIndex")
  );
  const table = document.querySelector(".table-tbody");
  const firstChildren = table.children[0];
  const secoundChildren = table.children[1];
  const lastChildren = table.children[2];
  // console.log(rankingUsersToIndex)
  const list = rankingUsersToIndex[0];

  const primeiroNome = firstChildren.children[1].innerHTML;
  const segundoNome = secoundChildren.children[1].innerHTML;
  const ultimoNome = lastChildren.children[1].innerHTML;

  let firstInfo, secondInfo, lastInfo;

  if (points > 1271) {
    firstInfo = [position, name, `${points} pts`];
    if (list.secoundPosition) {
      secondInfo = [
        list.secoundPosition.position,
        list.secoundPosition.name,
        list.secoundPosition.points,
      ];
    } else {
      secondInfo = [
        list.previusPosition.position,
        list.previusPosition.name,
        list.previusPosition.points,
      ];
      removeBackgroundColor(secoundChildren);
    }

    if (list.lastInfo) {
      lastInfo = [
        list.thirdPosition.position,
        list.thirdPosition.name,
        list.thirdPosition.points,
      ];
    } else {
      lastInfo = [
        list.nextPosition.position,
        list.nextPosition.name,
        list.nextPosition.points,
      ];
    }

    table.style.cssText = "display: flex;";
    addBackgroundcolor(firstChildren);
  } else if (points < 30) {
    //30
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
    if (list.previusPosition) {
      firstInfo = [
        list.previusPosition.position,
        list.previusPosition.name,
        list.previusPosition.points,
      ];
    } else {
      firstInfo = [
        list.antepnultimate.position,
        list.antepnultimate.name,
        list.antepnultimate.points,
      ];
    }

    secondInfo = [position, name, `${points} pts`];
    if (list.nextPosition) {
      lastInfo = [
        list.nextPosition.position,
        list.nextPosition.name,
        list.nextPosition.points,
      ];
    } else {
      lastInfo = [
        list.penultimatePosition.position,
        list.penultimatePosition.name,
        list.penultimatePosition.points,
      ];
      removeBackgroundColor(lastChildren);
    }
    table.style.cssText = "display: flex;";
    addBackgroundcolor(secoundChildren);
  }

  setElementInfo(firstChildren, firstInfo);
  setElementInfo(secoundChildren, secondInfo);
  setElementInfo(lastChildren, lastInfo);
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

function removeBackgroundColor(htmlElement) {
  [...htmlElement.children].forEach((element) => {
    element.classList.remove("bg-warning");
  });
}

function post() {
  const btn = document.querySelector(".btn-custom");
  const perfilPost = document.querySelector(".perfil-post");
  perfilPost.src = `./assets/icones/${login[0].userPicture}`;
  btn.addEventListener("click", () => {
    const contentPost = document.querySelector(".content");

    login[0].userPost.push(contentPost.value);
    contentPost.value = "";
    login[0].userPoints += 30;
    localStorage.setItem("loginAtual", JSON.stringify(login));
    location.reload();
    
    
  });

  showPost();
  upDatePoints();
}

function postComment() {
  const btn = document.querySelectorAll(".btn-post-comment");

  btn.forEach((element) => {
    element.addEventListener("click", () => {
      const textComment = element.parentNode;
      const textValue = textComment.querySelector(".content-comment");

      const comment = document.createElement("div");
      comment.classList.add("ms-3", "mb-2");

      comment.innerHTML = `  
      <div class="d-flex mb-2 align-items-center align-self-center">
      <img src="./assets/icones/${login[0].userPicture}" class=" img__perfil_post rounded-circle " alt="Foto de Perfil"
          width="50" height="50">
      <span class="fw-bold">${login[0].userName}</span>, <i></i>comentou:
      </div>
      <div class="card-body border card bg-light">
          <p> ${textValue.value}</p>
          <div
              class="d-flex justify-content-end gap-1 mt-2  align-items-center div-points">
              <p class="mt-3 points">0</p><svg xmlns="http://www.w3.org/2000/svg"
                  width="20" height="20" fill="green"
                  class="bi bi-arrow-up-square-fill  pointer " viewBox="0 0 16 16">
                  <path
                      d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
              </svg>

          </div>
      </div>

              `;

      textValue.value = "";
      
      element.after(comment);
      upDatePoints();
    });
  }
    
  );

  
}

function showPost() {
  post = login[0].userPost;
  if (post.length != 0) {
    const listPost = document.querySelector(".section-posts");

    post.forEach((element) => {
      const newPost = `  <section class="border rounded p-5 mb-5 bg-light ">

      <article>


          <div class="d-flex mb-2">
          <img src="./assets/icones/${login[0].userPicture}" class=" img__perfil_post rounded-circle mr-3"
          alt="Foto de Perfil" width="50" height="50">
              
              <p class="fw-bold text-start ms-2 mt-3">${login[0].userName} ${login[0].userLastName} </p>

          </div>

          <section class="mb-5">
              <p class="fs-5 mb-4">${element}</p>


          </section>
      </article>


      <section>
          <div class="card bg-light">
              <div class="card-body">

                  <form class="mb-4"><textarea class="form-control content-comment" rows="3"
                          placeholder="Compartilhe seu conhecimento, deixe um comentário!"></textarea>
                  </form>
                  <button type="button" class="btn btn-primary mb-3 btn-post-comment" >Comentar</button>

              </div>
          </div>
      </section>

      <div class="d-flex justify-content-end gap-1 mt-3 align-items-center div-points">

          <p class="h3 points">0</p> 
          
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
              fill="green" class="bi bi-arrow-up-square-fill pointer " viewBox="0 0 16 16">
              <path
                  d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
          </svg>

  

      </div>
  </section>`;

      listPost.insertAdjacentHTML("afterbegin", newPost);
    });
  }

 
  
}
 

upDatePoints();
post();

postComment();