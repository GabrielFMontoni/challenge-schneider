function checkPassword() {
    const registrationPassword = document.querySelector('.input_pswd');
    const registrationPasswordConfirm = document.querySelector('.input_confirm');

    if (registrationPassword.value === registrationPasswordConfirm.value) {
        registrationPasswordConfirm.setCustomValidity('');

    } else {
        registrationPasswordConfirm.setCustomValidity('As senhas não são iguais!');
    }



}



//console.log(registrationPassword);