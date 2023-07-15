$(function () {
  $("#header").load("/partials/Header/Header.html");
  $("#footer").load("/partials/Footer/Footer.html");
});

const shopBySelect = document.getElementById("shopBy");
const sortBySelect = document.getElementById("sortBy");
const productElements = document.getElementsByClassName("box");
const originalArray = Array.from(productElements);
const stockSwitch = document.getElementById("StockSwitch");

let currentSortOption = "none";
let currentCategoryOption = "all";

shopBySelect.addEventListener("change", function (event) {
  event.preventDefault();
  const selectedOption = event.target.value;
  currentCategoryOption = selectedOption;

  if (selectedOption !== "all") {
    applyFiltering(selectedOption);
  } else {
    resetFiltering();
  }

  sortBySelect.value = currentSortOption;
  applySorting();
});

sortBySelect.addEventListener("change", function (event) {
  event.preventDefault();
  const selectedOption = event.target.value;
  currentSortOption = selectedOption;

  if (selectedOption !== "none") {
    applySorting();
  } else {
    resetOrder();
  }
});

stockSwitch.addEventListener("change", function () {
  applyStockFiltering();

  shopBySelect.value = currentCategoryOption;
  applyFiltering(currentCategoryOption);

  sortBySelect.value = currentSortOption;
  applySorting();
});

function applyFiltering(selectedOption) {
  const stockSwitchChecked = stockSwitch.checked;

  Array.from(productElements).forEach(function (item) {
    const productCategory = item.classList[item.classList.length - 1];
    const productQuantity = parseInt(item.dataset.quantity);

    if (
      (selectedOption === "all" || productCategory === selectedOption) &&
      (!stockSwitchChecked || productQuantity > 0)
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function resetFiltering() {
  Array.from(productElements).forEach(function (item) {
    item.style.display = "block";
  });
}

function applyStockFiltering() {
  const stockSwitchChecked = stockSwitch.checked;

  Array.from(productElements).forEach(function (item) {
    const productQuantity = parseInt(item.dataset.quantity);
    const productCategory = item.classList[item.classList.length - 1];

    if (stockSwitchChecked) {
      if (
        productQuantity === 0 ||
        (currentCategoryOption !== "all" &&
          productCategory !== currentCategoryOption)
      ) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    } else {
      if (
        currentCategoryOption === "all" ||
        productCategory === currentCategoryOption
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  });
}

function comparePrices(a, b) {
  const priceA = parseFloat(
    a.querySelector(".product-price").textContent.replace("₪", "")
  );
  const priceB = parseFloat(
    b.querySelector(".product-price").textContent.replace("₪", "")
  );

  if (currentSortOption === "least") {
    return priceA - priceB;
  } else if (currentSortOption === "most") {
    return priceB - priceA;
  }
}

function applySorting() {
  const sortedArray = Array.from(productElements).sort(comparePrices);
  const parentElement = productElements[0].parentElement;

  Array.from(productElements).forEach(function (product) {
    parentElement.removeChild(product);
  });

  sortedArray.forEach(function (product) {
    parentElement.appendChild(product);
  });
}

function resetOrder() {
  const parentElement = productElements[0].parentElement;

  Array.from(parentElement.children).forEach(function (child) {
    parentElement.removeChild(child);
  });

  originalArray.forEach(function (product) {
    parentElement.appendChild(product);
  });
}

$.ajax({
  url: "/ShopPage",
  method: "GET",
  success: function (response) {
    renderProducts(response.data.products);
    console.log(response.data.products);
  },
  error: function (error) {
    console.error("Error fetching products:", error);
  },
});

function renderProducts(products) {
  const productContainer = $(".product-list .box-wrap .row");

  productContainer.empty();

  products.forEach((product) => {
    const productHtml = `
      <div class="col-md-4 box ${product.productCategory}" data-quantity="${product.productQuantity}" id="productCell" onclick="window.location.href='/ProductPage/${product._id}'">
        <img src="/assets/${product.productImage}" alt="alt text" class="productImage" />
        <h3 class="product-name">${product.productName}</h3>
        <h3 class="product-price">₪ ${product.productPrice}</h3>
      </div>
    `;

    productContainer.append(productHtml);
  });

  const updatedProductElements = document.getElementsByClassName("box");
  productElements = Array.from(updatedProductElements);
  originalArray.length = 0;
  originalArray.push(...productElements);
}
