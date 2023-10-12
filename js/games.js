const login = JSON.parse(localStorage.getItem("loginAtual"));


function addPointsBtn(){
    const btn = document.querySelectorAll('.add-points')
    btn.forEach(element => {
        element.addEventListener('click', ()=>{
            login[0].userPoints += 5;
            localStorage.setItem("loginAtual", JSON.stringify(login));
        })
    })







}






addPointsBtn();