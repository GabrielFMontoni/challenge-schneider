const login = JSON.parse(localStorage.getItem("login"));
const listUsers = JSON.parse(localStorage.getItem("user")) || [];

upDateRanking();
ElementUser();
sortList();

function upDateRanking() {
  const name = document.querySelector("#user-name-ranking");
  const points = document.querySelector("#user-points-ranking");
  const location = [...document.querySelectorAll(".user-location")];

  name.innerText = login[0].userName;
  points.innerHTML = `${login[0].userPoints} pontos`;
  location.forEach((element) => (element.innerText = login[0].userLocation));
}

function ElementUser() {
  const element = document.querySelector("#user-ranking");
  const name = element.children[1];
  const points = element.children[2];

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
    let position = document.querySelector("#user-position-ranking");
    if (row.hasAttribute("id")) {
      position.innerText = index + 1;
      // para testar a ordenação
      //login[0].userPoints = 500
      login[0].userRating = index + 1;
      localStorage.setItem("login", JSON.stringify(login));
    }
    row.children[0].textContent = index + 1;

    tbody.appendChild(row);
  });

}
