const listUsers = JSON.parse(localStorage.getItem('user')) || [];



const submit = document.querySelector('#submit');

// função responsável por verificar se a senha e login já estão cadastrados 

function userCheck() {

    const userLogin = document.querySelector('#login_user').value;
    const userPasswordLogin = document.querySelector('#login_password').value;

    let accessCheck = false;
    
    for (let i in listUsers) {

        
        if (userLogin === listUsers[i].userName && userPasswordLogin === listUsers[i].userPassword) {
            const login = [];
            login.push(listUsers[i])
            accessCheck = true
            localStorage.setItem('login', JSON.stringify(login))
            break
        }
    }   

    return showAccess(accessCheck);
}


function showAccess(access) {

    if (access) {
  
        return location.href = '../index.html'
    } else {
        return alert("Usuario ou senha incorretos!")
    }

}



submit.addEventListener('click', userCheck);

