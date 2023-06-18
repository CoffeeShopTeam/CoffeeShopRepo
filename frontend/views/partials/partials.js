function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}
$.ajax({
  url: "/frontend/views/partials/Header/Header.html",
  dataType: "html",
  success: function (data) {
    $("#header").html(data);
    loadCSS("/frontend/views/partials/Header/Header.css");
  },
});

$.ajax({
  url: "/frontend/views/partials/Footer/Footer.html",
  dataType: "html",
  success: function (data) {
    $("#footer").html(data);
    loadCSS("/frontend/views/partials/Footer/Footer.html");
  },
});
