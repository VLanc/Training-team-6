let flagOfAction = 'SIGN_IN';

$(document).ready(function () {

    $('#signUpTab').click(function () {
        if (flagOfAction !== 'SIGN_UP') {
            signUp();
        }
    });

    $('#signInTab').click(function () {
        if (flagOfAction !== 'SIGN_IN') {
            signIn();
        }
    });

    $('#forgotPassword').click(function () {
        forgotPassword();
    });


    $('#button').click(function () {
        if (!checkInputEmail()) {
            $('#labelForEmail').html('please, enter valid e-mail');
            redBlink('labelForEmail');
        } else {
            // require('register-login.js');
            switch (flagOfAction) {
                case 'SIGN_IN':
                    if (checkPassword()) {
                        //console.log('логинимся');
                        login();
                        //console.log('залогинились');
                    }


                    break;
                case 'FORGOT_PASSWORD':
                    reset();
                    break;
                case 'SIGN_UP':
                    if (checkPassword()) {
                        $('#signUpTab').removeClass("active");
                        $('.nav-item').toggleClass("active-tab no-active");
                        // signIn();
                        register();
                        break;
                    }
            }
        }
    });
});

function signIn() {
    $('#signInTab').addClass("active-tab").removeClass("no-active");
    $('#signUpTab').addClass("no-active").removeClass("active-tab");
    $('#ForgotPasswordTitle').addClass('hidden');
    $('#labelForEmail').html('E-mail address');
    $('#passwordBlock').removeClass('hidden');
    $('#forgotPassword').removeClass('hidden');
    $('#button').html('Sign in');
    flagOfAction = 'SIGN_IN';
}

function signUp() {
    $('#signInTab').addClass("no-active").removeClass("active-tab");
    $('#signUpTab').removeClass("no-active").addClass("active-tab");
    $('#forgotPasswordTitle').addClass('hidden');
    $('#labelForEmail').html('E-mail address');
    $('#passwordBlock').removeClass('hidden');
    $('#forgotPassword').addClass('hidden');
    $('#button').html('Sign up');
    flagOfAction = 'SIGN_UP';
}

function forgotPassword() {
    $('#signInTab').toggleClass("active-tab no-active").removeClass("active");
    $('#ForgotPasswordTitle').removeClass('hidden');
    $('#labelForEmail').html('Enter your e-mail, please');
    $('#passwordBlock').addClass('hidden');
    $('#forgotPassword').addClass('hidden');
    $('#button').html('Send instructions');
    flagOfAction = 'FORGOT_PASSWORD';
}

function checkPassword() {
    let password = $('#inputPassword').val().trim();
    if (!password) {
        redBlink('labelForPassword');
        return false;
    } else
        return true;
}

function checkInputEmail() {
    let emailPattern = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;
    let inputEmail = $('#inputEmail').val().trim();
    return emailPattern.test(inputEmail);
}

function redBlink(id) {
    $('#' + id).addClass('warning');
    setTimeout(function () {
        $('#' + id).removeClass('warning');
    }, 1000);
}



function login() {
    let data = {};
    data.email = $('#inputEmail').val();
    data.password = $('#inputPassword').val();
    var url = '/login?email='+data.email + "&password=" + data.password;
    $.get(url, function (data) {
        if (data == "false") {
            $('#labelForEmail').html('email or password incorrect');
            redBlink('labelForEmail');
        }else {
            window.open("/user-cabinet.html", "_self");
        }
    });

}

function register() {
    let data = {};
    data.email = $('#inputEmail').val();
    data.password = $('#inputPassword').val();
    var url = '/register?email='+data.email + "&password=" + data.password;
    $.get(url, function (data) {
        if (data == "false") {
            $('#labelForEmail').html('such email is registered');
            redBlink('labelForEmail');
        }else {
            window.open("/user-cabinet.html", "_self");
        }
    });
}

function reset() {
    let email = {};
    let check;
    email.email = $('#inputEmail').val();
    let url = '/reset?email=' + email.email;
    $.get(url, function (data) {
        console.log(data);
        check = data;
        if (check == "false") {
            $('#labelForEmail').html('user not found');
            redBlink('labelForEmail');
        }
        else {
            $('.modal').modal('show');
            signIn();
        }
    });

}
