$(function () {
  $("#back-to-homepage").on("click", function (event) {
    window.location.href = "/";
  });
});

$(document).ready(function () {
  $(".to-checkout").hover(
    function () {
      $(this).css("background-color", "white");
      $(this).css("color", "black");
    },
    function () {
      $(this).css("background-color", "");
      $(this).css("color", "");
    }
  );
});
