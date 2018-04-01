; $(document).ready(function () {
  var flagOpenMenu = false;
  $('#hamburger').click(function () {
    if (!flagOpenMenu) {
      $(".class-menu").removeClass("col-lg-2 col-xl-2").css("display", "block").animate({"left": "0"}, 400);
      flagOpenMenu = true;
    } else {
      $(".class-menu").animate({"left": "-174px"}, 400);
      flagOpenMenu = false;
    }
  })
});