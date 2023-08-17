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
    mudarPerfil.src = img.src
    modalPerfil.close()
}))