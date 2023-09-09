const login = JSON.parse(localStorage.getItem("login"));
const listUsers = JSON.parse(localStorage.getItem('user')) || [];


function upDateRanking() {
  const name = document.querySelector("#user-name-ranking");
  const points = document.querySelector("#user-points-ranking");
  const location = [...document.querySelectorAll('.user-location')]
 

  name.innerText = login[0].userName;
  points.innerHTML = `${login[0].userPoints} pontos`;
  location.forEach(element => element.innerText = login[0].userLocation);

}


function ElementUser(){
    const element = document.querySelector('#user-ranking')
    const name = element.children[1]
    const points = element.children[2]



    name.textContent = login[0].userName;
    points.textContent = `${login[0].userPoints} pts`;

}

function sortList() {
  const tbody = document.getElementById("list-tbody");
  const rows = [...tbody.querySelectorAll("tr")];

  rows.sort((a, b) => {
    const pointsA = parseInt(a.querySelector("td:nth-child(3)").textContent);
    const pointsB = parseInt(b.querySelector("td:nth-child(3)").textContent);

    return pointsB - pointsA;
  });

  rows.forEach((row, index) => {
    let position =  document.querySelector('#user-position-ranking')
    if(row.hasAttribute('id')){
       position.innerText = index + 1;
        // para testar a ordenação
     login[0].userPoints = '500'
     login[0].userRating = index + 1;
     localStorage.setItem('login', JSON.stringify(login));

    }
    row.children[0].textContent = index + 1

    tbody.appendChild(row);
  });

  console.log(rows[0].children[1].innerHTML += `<svg class="trofeu" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
  fill="gold" class="bi bi-trophy-fill" viewBox="0 0 16 16">
  <path
    d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
</svg>`)
}
upDateRanking();
ElementUser();
sortList();
