;
$(document).ready(function () {
  var sighIn = true;
  var flagOfAction = 'SIGN_IN';

  $('#signUpTab').click(function () {
    if (sighIn === true) {
      $('#ForgotPasswordTitle').addClass('hidden');
      $('.nav-item').toggleClass("active-tab no-active");
      $('#passwordBlock').removeClass('hidden');
      $('#forgotPassword').addClass('hidden');
      $('#button').html('Sign up');
      flagOfAction = 'SIGN_UP';
      sighIn = false;
    }
  });

  $('#signInTab').click(function () {
    if (sighIn === false) {
      $('.nav-item').toggleClass("active-tab no-active");
      $('#ForgotPasswordTitle').addClass('hidden');
      $('#passwordBlock').removeClass('hidden');
      $('#forgotPassword').removeClass('hidden');
      $('#button').html('Sign in');
      flagOfAction = 'SIGN_IN';
      sighIn = true;
    }
  });

  $('#forgotPassword').click(function () {
    $('#ForgotPasswordTitle').removeClass('hidden');
    $('#labelForEmail').html('Enter your e-mail, please');
    $('#passwordBlock').addClass('hidden');
    $('#forgotPassword').addClass('hidden');
    $('#button').html('Send instructions');
    flagOfAction = 'FORGOT_PASSWORD';
  });

  function badEmail() {
    $('#labelForEmail').html('Sorry, your password is not valid');
    }
});
