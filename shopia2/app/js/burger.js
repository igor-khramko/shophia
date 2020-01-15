$(document).ready(function() {
    var i = "burger";
    $(".burger").click(function() {
      "close" == i
        ? ($(".navigation").slideUp(),
          $(".burger").toggleClass("active"),          
          (i = "burger"))
        : "burger" == i &&
          ($(".navigation").slideDown(),
          $(".burger").toggleClass("active"),
          $(".navigation").css("display", "flex"),
          (i = "close"));
    });
  });
  