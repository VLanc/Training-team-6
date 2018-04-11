var usercookie;
var user;

$(document).ready(function () {

  $.get('/user-cabinet', function (data) {
    if (data == "false") {


      window.open("/register-login-reset.html", "_self");
      return;
    }
    usercookie = data;
    var url = "userdata?email=" + usercookie.email;
    $.get(url, function (data) {
      user = data;
      /*if (user.name.length > 0) {*/
      if (user.photo) {
        $('.user-avatar').css("background-image", "url(images/" + user.photo + ".png)");
      } else $('.user-avatar').css("background-image", "url(images/anounymus.png)");

      if (user.name) $(".user-field-name").html(user.name);
      else $(".user-field-name").html("You haven't filled this field yet");

      if (user.surname) $(".user-field-surname").html(user.surname);
      else $(".user-field-surname").html("You haven't filled this field yet");

      if (user.role) $(".user-field-role").html(user.role);
      else $(".user-field-role").html("You haven't filled this field yet");

      $(".user-field-email").html(user.email);
      /* }
       $(".user-field-email").html(user.email);*/

    });
  });


  function readImageURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.user-avatar').css("background-image", "url(" + e.target.result + ")");
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".avatar-input").change(function () {
    readImageURL(this);
  });

  function validateEmail(email) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  }

  function showSuccessfulSavingAlert() {
    $(".successful-saving").removeClass("hidden");
    $(".successful-saving").addClass("visible");

    setTimeout(function () {
      $(".successful-saving").removeClass("visible");
      $(".successful-saving").addClass("hidden");
    }, 3000);
  }

  function toggleCurrentFieldsState(readonlyFieldsState, writableFieldsState) {

    $(".user-readonly-fields").removeClass(readonlyFieldsState);
    $(".user-readonly-fields").addClass(writableFieldsState);

    $(".user-writable-fields").removeClass(writableFieldsState);
    $(".user-writable-fields").addClass(readonlyFieldsState);

    $(".edit-user-info-button").removeClass(readonlyFieldsState);
    $(".edit-user-info-button").addClass(writableFieldsState);

    $(".save-user-info-button").removeClass(writableFieldsState);
    $(".save-user-info-button").addClass(readonlyFieldsState);

  }

  function fillWritableFields() {
    $("#user-name").val(user.name);
    $("#user-surname").val(user.surname);
    $("#role-select").val(user.roleIndex);
    $("#user-email").val(user.email);
  }

  function fillReadonlyFields() {
    $(".user-field-name").html(user.name);
    $(".user-field-surname").html(user.surname);
    $(".user-field-role").html(user.role);
    $(".user-field-email").html(user.email);
  }

  function saveChangesToServer() {
    user.email = $("#user-email").val();
    user.role = $("#role-select option:selected").text();
    user.roleIndex = $("#role-select").val();
    user.name = $("#user-name").val();
    user.surname = $("#user-surname").val();

         let url = "/saveUserChanges";
         $.post(url, user);
  }

  function checkFieldsValidation() {
    var correctnessOfFields = [];

    if ($("#user-name").val()) {
      $("#user-name").removeClass("invalid");
      correctnessOfFields.push(true);
    } else {
      $("#user-name").addClass("invalid");
      correctnessOfFields.push(false);
    }

    if ($("#user-surname").val()) {
      $("#user-surname").removeClass("invalid");
      correctnessOfFields.push(true);
    } else {
      $("#user-surname").addClass("invalid");
      correctnessOfFields.push(false);
    }

    if ($("#role-select").val()) {
      $("#role-select").removeClass("invalid");
      correctnessOfFields.push(true);
    } else {
      $("#role-select").addClass("invalid");
      correctnessOfFields.push(false);
    }

    if (!$("#user-email").val() || !validateEmail($("#user-email").val())) {
      $("#user-email").addClass("invalid");
      correctnessOfFields.push(false);
    } else {
      $("#user-email").removeClass("invalid");
      correctnessOfFields.push(true);
    }

    for (var i = 0; i < correctnessOfFields.length; i++) {
      if (correctnessOfFields[i] === false) return false;
    }

    return true;
  }

  $("#edit-user-info-button").click(function () {
    var currentrReadonlyFieldsState = "visible";
    var currentrWritableFieldsState = "hidden";

    toggleCurrentFieldsState(currentrReadonlyFieldsState, currentrWritableFieldsState);
    fillWritableFields();
  });


  $("#save-user-info-button").click(function () {
    if (!checkFieldsValidation()) return;

    var currentrReadonlyFieldsState = "hidden";
    var currentrWritableFieldsState = "visible";

    /*    $(".user-field-name").html($("#user-name").val());
        $(".user-field-surname").html($("#user-surname").val());
        $(".user-field-role").html($("#role-select option:selected").text());
        $(".user-field-email").html($("#user-email").val());*/

    saveChangesToServer();
    toggleCurrentFieldsState(currentrReadonlyFieldsState, currentrWritableFieldsState);
    fillReadonlyFields();
    showSuccessfulSavingAlert();
  });
  /*  $("#save-user-info-button").click(function (e) {
      e.preventDefault();
      if (!validateEmail($("#user-email").val()) && $("#user-email").val()){
        $("#user-email").addClass("invalid");
        $(".user-field-email").html($("#user-email").val());
        return;
      } else {
        window.open("interview.html", "_self");
      }
    })*/

});

