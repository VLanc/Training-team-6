$(document).ready(function () {
  var flagOpenMenu = false;
  $('#hamburger').click(function () {
    if (!flagOpenMenu) {
      $(".for-desktop").removeClass("col-lg-2 col-xl-2").css("display", "block").animate({"left": "0"}, 400);
      flagOpenMenu = true;
    } else {
      $(".for-desktop").animate({"left": "-174px"}, 400);
      flagOpenMenu = false;
    }
  })
});