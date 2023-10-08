
  const login = JSON.parse(localStorage.getItem("loginAtual"));
  const listUsers = JSON.parse(localStorage.getItem("user")) || [];
  const rankingUsersToIndex =
    JSON.parse(localStorage.getItem("rankingToIndex")) || [];
  
   if(document.location.pathname === "/pages/ranking.html"){
  upDateRanking();
  ElementUser();
  sortList();
  console.log('Fui Executado')
    }

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
      //login[0].userPoints = 0;
      login[0].userRating = index + 1;
      localStorage.setItem("loginAtual", JSON.stringify(login));
    }
    row.children[0].textContent = index + 1;

    tbody.appendChild(row);
  });

  const elementUser = tbody.querySelector("#user-ranking");
  let previusElement;
  let nextElement;
  const pointsElementToRanking =
    elementUser.children[2].textContent.split(" ")[0];

  if (pointsElementToRanking > 1271) {
    nextElement = elementUser.nextSibling;
    const secoundSibling = nextElement.nextSibling;

    const elementsPositionFirst = {
      secoundPosition: {
        position: nextElement.children[0].textContent,
        name: nextElement.children[1].textContent,
        points: nextElement.children[2].textContent,
      },
      thirdPosition: {
        position: secoundSibling.children[0].textContent,
        name: secoundSibling.children[1].textContent,
        points: secoundSibling.children[2].textContent,
      },
    };

    rankingUsersToIndex[0] = elementsPositionFirst;
    localStorage.setItem("rankingToIndex", JSON.stringify(rankingUsersToIndex));
  } else if (pointsElementToRanking < 30 ) {
    previusElement = elementUser.previousSibling;
    const thirdToLast = previusElement.previousSibling;

    const elementsPosition = {
      antepnultimate: {
        position: thirdToLast.children[0].textContent,
        name: thirdToLast.children[1].textContent,
        points: thirdToLast.children[2].textContent,
      },

      penultimatePosition: {
        position: previusElement.children[0].textContent,
        name: previusElement.children[1].textContent,
        points: previusElement.children[2].textContent,
      },
    };

    rankingUsersToIndex[0] = elementsPosition;
    localStorage.setItem("rankingToIndex", JSON.stringify(rankingUsersToIndex));
  } else {
    previusElement = elementUser.previousSibling;
    nextElement = elementUser.nextSibling;

    const elementsPosition = {
      previusPosition: {
        position: previusElement.children[0].textContent,
        name: previusElement.children[1].textContent,
        points: previusElement.children[2].textContent,
      },

      nextPosition: {
        position: nextElement.children[0].textContent,
        name: nextElement.children[1].textContent,
        points: nextElement.children[2].textContent,
      },
    };

    rankingUsersToIndex[0] = elementsPosition;
    localStorage.setItem("rankingToIndex", JSON.stringify(rankingUsersToIndex));
  }
}



export { upDateRanking, ElementUser, sortList };