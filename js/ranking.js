const login = JSON.parse(localStorage.getItem('login'));


console.log(login)

upDateRanking();

function upDateRanking(){
    const name = document.querySelector("#user-name-ranking");
    const points = document.querySelector("#user-points-ranking");
    

    name.innerText = login[0].userName;
    points.innerHTML = `${login[0].userPoints} pontos`;
}