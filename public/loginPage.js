'use strict'

let userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if(!response.success) {
            userForm.setLoginErrorMessage(response.error);
            return;
        }
        location.reload();
    })
    
}

userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if(!response.success) {
            userForm.setRegisterErrorMessage(response.error);
            return;
        }
        location.reload();
    })
    
}