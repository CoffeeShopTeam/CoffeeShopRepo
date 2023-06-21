$(function () {
  $("#header").load("/frontend/views/partials/Header/Header.html");
  $("#footer").load("/frontend/views/partials/Footer/Footer.html");
});

const shopBySelect = document.getElementById("shopBy");
let productItems = document.querySelectorAll("#productCell");
let productsPrices = document.querySelectorAll(".product-price");
const sortBySelect = document.getElementById("sortBy");
const productElements = document.getElementsByClassName("box");
const originalArray = Array.from(productElements);

shopBySelect.addEventListener("change", function (event) {
  event.preventDefault();

  const selectedOption = event.target.value;

  $.each(productItems, function (index, element) {
    const item = element;

    if (selectedOption === "all" || item.classList.contains(selectedOption)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

sortBySelect.addEventListener("change", function (event) {
  event.preventDefault();
  const selectedOption = event.target.value;
  console.log(selectedOption);

  function comparePrices(a, b) {
    const priceA = parseFloat(
      a.querySelector(".product-price").textContent.replace("$", "")
    );
    const priceB = parseFloat(
      b.querySelector(".product-price").textContent.replace("$", "")
    );
    if (selectedOption == "least") {
      return priceA - priceB;
    } else if (selectedOption == "most") {
      return priceB - priceA;
    }
  }

  if (selectedOption !== "none") {
    const sortedArray = Array.from(productElements).sort(comparePrices);

    const parentElement = productElements[0].parentElement;
    Array.from(productElements).forEach(function (product) {
      parentElement.removeChild(product);
    });

    sortedArray.forEach(function (product) {
      parentElement.appendChild(product);
    });
  } else {
    resetOrder();
  }
});

function resetOrder() {
  const parentElement = productElements[0].parentElement;
  Array.from(parentElement.children).forEach(function (child) {
    parentElement.removeChild(child);
  });

  originalArray.forEach(function (product) {
    parentElement.appendChild(product);
  });
}
