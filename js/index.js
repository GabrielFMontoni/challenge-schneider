const listUsers = [{
    name: "admin",
    password: "0000"
}, {
    name: "paula",
    password: "123"
}, {
    name: "pedro",
    password: "4330"
}];

const submit = document.querySelector('#submit');

function getData() {
    const userLogin = document.querySelector('#login_user').value;
    const userPassword = document.querySelector('#login_password').value;



    return userCheck(listUsers, userLogin, userPassword);

}



function userCheck(list, user, password) {

    let accessCheck = false

    for (let i in list) {
        if (user === list[i].name && password === list[i].password) {

            accessCheck = true

            break
        }
    }

    return showAccess(accessCheck)
}

function showAccess(access) {

    if (access) {
        return location.href = 'home.html'
    } else {
        return alert("Usuario ou senha incorretos!")
    }

}


submit.addEventListener('click', getData);



