function userObject(action) {
  let data = {};
  data.email = $('#inputEmail').val();
  data.password = $('#inputPassword').val();
  $.post("/" + action, data);
  window.open("/user-cabinet.html", "_self");
}

function login() {
  userObject('login');
}

function register() {
  userObject('register');
}

function reset() {
  let email = {};
  email.email = $('#inputEmail').val();
  $.post('/reset', email);
}

//
// function login() {
//   var data = {};
//   data.email = $('#inputEmail').val();
//   data.password = $('#inputPassword').val();
//   // console.log(data);
//   $.post('/login', data);
//   window.open("/user-cabinet.html", "_self");
// }
//
// function register() {
//   var data = {};
//   data.email = $('#inputEmail').val();
//   data.password = $('#inputPassword').val();
//   $.post('/register', data);
//   window.open("/user-cabinet.html", "_self");
// }
//
// function reset() {
//   // var data = {};
//   // data.email = $('#reg_email').val();
//   // data.password = $('#reg_pass').val();
//   var email = {};
//   email.email = $('#inputEmail').val();
//   console.log(email);
//   $.post('/reset', email);
//   // window.open("/user-cabinet.html", "_self");
// }