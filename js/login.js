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

// função responsável por verificar se a senha e login já estão cadastrados 

function userCheck() {

    const userLogin = document.querySelector('#login_user').value;
    const userPassword = document.querySelector('#login_password').value;

    let accessCheck = false

    for (let i in listUsers) {
        if (userLogin === listUsers[i].name && userPassword === listUsers[i].password) {

            accessCheck = true

            break
        }
    }

    return showAccess(accessCheck);
}


function showAccess(access) {

    if (access) {
        return location.href = 'index.html'
    } else {
        return alert("Usuario ou senha incorretos!")
    }

}


submit.addEventListener('click', userCheck);



