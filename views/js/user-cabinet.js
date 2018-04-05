$(document).ready(function () {

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

  $("#edit-user-info-button").click(function () {
/*    var visible = "visible";
    var hidden = "hidden";
    var nextState;
    var currentState = $(".user-readonly-fields").attr('class').split(' ').pop();
    if (currentState === visible) nextState = hidden;
    else {
      nextState = visible;
      $(".user-field-name").html($("#user-name").val() || "You haven't filled this field yet");
      $(".user-field-surname").html($("#user-surname").val() || "You haven't filled this field yet");

      if ($("#role-select").val()) {
        $(".user-field-role").html($("#role-select option:selected").text());
      } else $(".user-field-role").html("You haven't filled this field yet");

      if (!$("#user-email").val()) {
        $(".user-field-email").html("You haven't filled this field yet");
      } else if (!validateEmail($("#user-email").val())) {
        $("#user-email").addClass("invalid");
        $(".user-field-email").html($("#user-email").val());
        return;
      } else $(".user-field-email").html($("#user-email").val());
    }*/
    /*$("#user-email").removeClass("invalid");*/

    $(".user-readonly-fields").removeClass("visible");
    $(".user-readonly-fields").addClass("hidden");

    $(".user-writable-fields").removeClass("hidden");
    $(".user-writable-fields").addClass("visible");

    $(".edit-user-info-button").removeClass("visible");
    $(".edit-user-info-button").addClass("hidden");

    $(".save-user-info-button").removeClass("hidden");
    $(".save-user-info-button").addClass("visible");
  });

  $("#save-user-info-button").click(function (e) {
    e.preventDefault();
    if (!validateEmail($("#user-email").val()) && $("#user-email").val()){
      $("#user-email").addClass("invalid");
      $(".user-field-email").html($("#user-email").val());
      return;
    } else {
      window.open("interview.html", "_self");
    }
  })

});