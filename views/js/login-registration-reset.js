var flagOfAction = 'SIGN_IN';

$(document).ready(function () {

  $('#signUpTab').click(function () {
    if (flagOfAction === 'SIGN_IN') {
      signUp();
    }
  });

  $('#signInTab').click(function () {
    if (flagOfAction === 'SIGN_UP') {
      $('.nav-item').toggleClass("active-tab no-active");
      signIn();
    }
  });

  $('#forgotPassword').click(function () {
    forgotPassword();
  });


  $('#button').click(function () {
    console.log('метод BUTTON, flagOfAction = ' + flagOfAction);
    if (!checkInputEmail()) {
      $('#labelForEmail').html('please, enter valid e-mail');
      redBlink('labelForEmail');
    } else {
      switch (flagOfAction) {
        case 'SIGN_IN':
          checkPassword();
          /********* there ara must be action **********/
          break;
        case 'FORGOT_PASSWORD':
          $('.modal').modal('show');
          signIn();
          break;
        case 'SIGN_UP':
          checkPassword();
          signIn();
          break;
      }
    }
  });
});

function signIn() {
  $('#ForgotPasswordTitle').addClass('hidden');
  $('#labelForEmail').html('E-mail address');
  $('#passwordBlock').removeClass('hidden');
  $('#forgotPassword').removeClass('hidden');
  $('#button').html('Sign in');
  flagOfAction = 'SIGN_IN';
}

function signUp() {
  $('#forgotPasswordTitle').addClass('hidden');
  $('#labelForEmail').html('E-mail address');
  $('.nav-item').toggleClass("active-tab no-active");
  $('#passwordBlock').removeClass('hidden');
  $('#forgotPassword').addClass('hidden');
  $('#button').html('Sign up');
  flagOfAction = 'SIGN_UP';
}

function forgotPassword() {
  $('#ForgotPasswordTitle').removeClass('hidden');
  $('#labelForEmail').html('Enter your e-mail, please');
  $('#passwordBlock').addClass('hidden');
  $('#forgotPassword').addClass('hidden');
  $('#button').html('Send instructions');
  flagOfAction = 'FORGOT_PASSWORD';
}

function checkPassword() {
  var password = $('#inputPassword').val().trim();
  if (!password) {
    redBlink('labelForPassword');
  }
}

function checkInputEmail() {
  var emailPattern = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;
  var inputEmail = $('#inputEmail').val().trim();
  return emailPattern.test(inputEmail);
}

function redBlink(id) {
  $('#' + id).addClass('warning');
  setTimeout(function () {
    $('#' + id).removeClass('warning');
  }, 1000);
}