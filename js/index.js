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
    modalPerfil.close();
  })
);
async function pegaListaRanking(){
      const htmlRanking = await fetch('../pages/ranking.html').then(response => response.text())
.then(htmlString => {
  const regex = /<table[^>]*>[\s\S]*<\/table>/i;
  const tabelaRanking = htmlString.match(regex)
  const tempDiv = document.createElement('div')

  tempDiv.innerHTML = tabelaRanking[0]
  document.body.appendChild(tempDiv);
  tempDiv.style.display = 'none'
  // console.log(tempDiv)
  
    upDateRanking();
    ElementUser();
    sortList();
    upDate(); 
  
  
 
}
)
}
pegaListaRanking( )

const login = JSON.parse(localStorage.getItem("loginAtual"));
if(!login){
  document.querySelector('header').style.display = 'none'
 document.querySelector('main').classList.add('d-none')
 document.querySelector('#irParaCadastro').classList.remove('d-none')
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
    console.log(element.userRating)
    element.Rating > 80
      ? (pointsIndex.parentElement.innerText =
          "Interaja com a plataforma para ganhar pontos!")
      : (pointsIndex.innerText = element.userPoints);
    parseInt(document.querySelector('#user-points').innerHTML) > 0 ? document.querySelector('#seta').style.display = "block" : document.querySelector("#seta").style.display = "none"

    const userRanking = document.querySelector('#user-ranking') 
    const pontuacaoDoRanking = parseInt(userRanking.children[0].innerHTML);
    const nomeUser = userRanking.children[1].innerHTML;
    const pontuacao = parseInt(userRanking.children[2].innerHTML[0]);
    // console.log(pontuacaoDoRanking)
    // console.log(nomeUser)
    // console.log(pontuacao)

    // console.log(element.userPoints)
      upDateRankingIndex(
        element.userPoints,
        nomeUser,
        pontuacaoDoRanking
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
  
        login[0].userPoints += 10;


        clicked = true;
        localStorage.setItem("loginAtual", JSON.stringify(login));
        // console.log(login[0])
        upDateRanking();
        ElementUser();
        // console.log(element.userRating)
        // sortList();
        upDate();
      }
    });
  });
}

function upDateRankingIndex(points, name, position) {
  const rankingUsersToIndex = JSON.parse(localStorage.getItem("rankingToIndex"));
  const table = document.querySelector(".table-tbody");
  const firstChildren = table.children[0];
  const secoundChildren = table.children[1];
  const lastChildren = table.children[2];
  // console.log(rankingUsersToIndex)
  const list = rankingUsersToIndex[0];

  const primeiroNome = firstChildren.children[1].innerHTML;
  const segundoNome = secoundChildren.children[1].innerHTML;
  const ultimoNome = lastChildren.children[1].innerHTML;

  // console.log(firstChildren)
  // console.log(secoundChildren)
  // console.log(lastChildren)

  // console.log(list)
  // sortList();
    let firstInfo, secondInfo, lastInfo;

    if (points > 1271 ) {
      firstInfo = [position, name, `${points} pts`];
      if(list.secoundPosition){
        secondInfo = [
          list.secoundPosition.position,
          list.secoundPosition.name,
          list.secoundPosition.points,
        ];
      }else{
        secondInfo = [
          list.previusPosition.position,
          list.previusPosition.name,
          list.previusPosition.points,
        ];
        removeBackgroundColor(secoundChildren)
      }
     
      if(list.lastInfo){
        lastInfo = [
          list.thirdPosition.position,
          list.thirdPosition.name,
          list.thirdPosition.points,
        ];
      }else{
        lastInfo = [
          list.nextPosition.position,
          list.nextPosition.name,
          list.nextPosition.points,
        ];
      }
     
      table.style.cssText = "display: flex;";
      addBackgroundcolor(firstChildren);
      
    } else if (points < 30) {//30
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
      if(list.previusPosition){
        firstInfo = [
          list.previusPosition.position,
          list.previusPosition.name,
          list.previusPosition.points,
        ];
      }else{
        firstInfo = [
          list.antepnultimate.position,
          list.antepnultimate.name,
          list.antepnultimate.points,
        ];
      }
      
      secondInfo = [position, name, `${points} pts`];
      if(list.nextPosition){
      lastInfo = [
        list.nextPosition.position,
        list.nextPosition.name,
        list.nextPosition.points
      ];
    }else{
      lastInfo = [
        list.penultimatePosition.position,
        list.penultimatePosition.name,
        list.penultimatePosition.points,
      ];
      removeBackgroundColor(lastChildren)
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

function removeBackgroundColor(htmlElement){
  [...htmlElement.children].forEach((element) => {
    element.classList.remove("bg-warning");
  });
}

upDatePoints();
