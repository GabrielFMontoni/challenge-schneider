const bntPopUp = document.querySelector("#btn_popup");
const modal = document.querySelector("dialog");
const modalClose = document.querySelector("#modal_close");


modalClose.addEventListener('click', ()=> modal.close());
bntPopUp.addEventListener('click', () => modal.showModal());

