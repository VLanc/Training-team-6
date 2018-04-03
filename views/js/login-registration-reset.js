$(document).ready(function () {
  sighIn = true;
  flagOfAction = 'SIGN_IN';

  $('#signUpTab').click(function () {
    if (sighIn === true) {
      $('#forgotPasswordTitle').addClass('hidden');
      $('#forgotPassword').addClass('hidden');
      $('#labelForEmail').html('E-mail address');
      $('.nav-item').toggleClass("active-tab no-active");
      $('#passwordBlock').removeClass('hidden');
      $('#inputPassword').attr('required');
      $('#forgotPassword').addClass('hidden');
      $('#button').html('Sign up');
      flagOfAction = 'SIGN_UP';
      sighIn = false;
    }
  });

  $('#signInTab').click(function () {
    if (sighIn === false) {
      $('.nav-item').toggleClass("active-tab no-active");
      signIn();
    }
  });

  $('#forgotPassword').click(function () {
    forgotPassword();
  });


  $('#button').click(function () {

    if (flagOfAction === 'FORGOT_PASSWORD')
    // if (flagOfAction === 'FORGOT_PASSWORD' && checkInputEmail() === true) { (must work)
      $('.modal').modal('show');

    // else {
      // alert('Sorry, invalid email');
      // signIn();
    // }
  });


  $('#modal-button').click(function () {
    signIn();
  });

  function signIn() {
    $('#ForgotPasswordTitle').addClass('hidden');
    $('#labelForEmail').html('E-mail address');
    $('#passwordBlock').removeClass('hidden');
    $('#inputPassword').attr('required');
    $('#forgotPassword').removeClass('hidden');
    $('#button').html('Sign in');
    flagOfAction = 'SIGN_IN';
    sighIn = true;
  }

  function forgotPassword() {
    $('#ForgotPasswordTitle').removeClass('hidden');
    $('#labelForEmail').html('Enter your e-mail, please');
    $('#passwordBlock').addClass('hidden');
    $('#inputPassword').removeAttr('required');
    $('#forgotPassword').addClass('hidden');
    $('#button').html('Send instructions');
    flagOfAction = 'FORGOT_PASSWORD';
  }

  function checkInputEmail() {
    var emailPattern = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;
    var inputEmail = $('#inputEmail').val().trim();
    return emailPattern.test(inputEmail);
  }

  function badEmail() {
    $('#labelForEmail').html('Sorry, your password is not valid');
  }
});

