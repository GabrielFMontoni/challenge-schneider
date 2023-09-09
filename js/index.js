

const login = JSON.parse(localStorage.getItem('login'));
const bntPopUp = document.querySelector("#btn_popup");
const bntPitch = document.querySelector("#btn_popup2");
const btnPerfil = document.querySelector('#mudarPerfil')
const modal = document.querySelector("#popup-jogos");
const modalPitch = document.querySelector('#pitch')
const modalPerfil = document.querySelector('#perfil')
const modalClose = document.querySelector("#modal_close");
const modalClose2 = document.querySelector("#modal_close2");
const modalClose3 = document.querySelector("#modal_close3");



modalClose.addEventListener('click', ()=> modal.close());
bntPopUp.addEventListener('click', () => modal.showModal());

modalClose2.addEventListener('click', ()=> modalPitch.close());
bntPitch.addEventListener('click', () => modalPitch.showModal());

btnPerfil.addEventListener('click', () => modalPerfil.showModal());
modalClose3.addEventListener('click', () => modalPerfil.close());




const imagensPerfil = document.querySelectorAll('.img__perfil')

imagensPerfil.forEach(img => img.addEventListener('click', function trocaIcone(){
    modalPerfil.src = img.src
    modalPerfil.close()
}))



function upDate (){
    const pointsRanking = document.querySelector('#points-ranking-index')
    const nameRanking = document.querySelector('#name-ranking-index')
    const userNamefirst = document.querySelector('#perfil-name-first');
    const userNameLast = document.querySelector('#perfil-name-last');
    const userJobTitle = document.querySelector('#job-title');
    const points = document.querySelector('#user-points');
    const positionGlobal = document.querySelector('#position-global')

    positionGlobal.innerText = `Posição Global: #${login[0].userRating}` 
    nameRanking.innerText = login[0].userName;
    pointsRanking.innerText = `${login[0].userPoints} pts` 
    userNamefirst.innerText= login[0].userName;
    userNameLast.innerText = login[0].userLastName;
    userJobTitle.innerText = login[0].userJob;
    points.innerHTML = `${login[0].userPoints} pontos`;
    
}   

upDate();

