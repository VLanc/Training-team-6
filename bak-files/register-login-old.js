$(document).ready(function () {
    $('#log_button').click(login);
    $('#reg_button').click(register);
    $('#res_button').click(reset);
});

function login() {
   var data = {};
   data.email = $('#log_email').val();
   data.password = $('#log_pass').val();
  // console.log(data);
   $.post('/login', data);
   window.open("/user-cabinet.html", "_self");
}

function register() {
    var data = {};
    data.email = $('#reg_email').val();
    data.password = $('#reg_pass').val();
    $.post('/register', data);
    window.open("/user-cabinet.html", "_self");
}

function reset() {
    // var data = {};
    // data.email = $('#reg_email').val();
    // data.password = $('#reg_pass').val();
    var email = {};
    email.email = $('#res_email').val();
    console.log(email);
    $.post('/reset', email);
   // window.open("/user-cabinet.html", "_self");
}