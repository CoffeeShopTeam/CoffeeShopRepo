var link = "/frontend/views/layouts/ProductPage/ProductPage.html";

function resetSearchBar() {
  var input = document.querySelector("#searchBar input");
  input.value = "";
  input.placeholder = "Search Here..";
  window.location.href = link;
}

$(function() {
  $("#user-text")
})