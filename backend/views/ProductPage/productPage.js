function getProductId() {
  const pathnameArray = window.location.pathname.split("/");
  const productId = pathnameArray[pathnameArray.length - 1];
  return productId;
}

function getCurrentProductFromLocalStorage() {
  const productId = getProductId();
  const jsonProducts = JSON.parse(localStorage.getItem("jsonProducts"));
  const productInLocalStorage = jsonProducts?.find((product) => {
    return product.id === productId;
  });
  return productInLocalStorage;
}

$(function () {
  $("#header").load("/partials/Header/Header.html");
  $("#footer").load("/partials/Footer/Footer.html");
  let quantity = $(".quantity").attr("id");
  let amount = $(".counter-value").text();
  const productInLocalStorage = getCurrentProductFromLocalStorage();
  if (productInLocalStorage) {
    quantity = quantity - productInLocalStorage.quantity;
  }
  if (quantity < amount) {
    $("#add-to-cart-button").attr("disabled", true);
    alert("This product is already in your cart with the maximum quantity.");
  }

});

$(document).ready(function () {
  $.get("/ProductPage/" + productId, function (data) {
    $(".card-title").text(data.productName);
    $(".price").text("$" + data.productPrice);
    $(".section1__greyed-text").text(data.productDescription);
  });
});

$(document).on("click", ".minus-button", function () {
  let value = parseInt(
    $(this).siblings(".counter-value").first().text().trim()
  );
  if (value > 1) {
    value--;
    $(this).siblings(".counter-value").first().text(value);
  }
});

$(document).on("click", ".plus-button", function () {
  let quantity = parseInt($("#quantity").text());
  const productInLocalStorage = getCurrentProductFromLocalStorage();
  if (productInLocalStorage) {
    quantity = quantity - productInLocalStorage.quantity;
  }
  let value = parseInt(
    $(this).siblings(".counter-value").first().text().trim()
  );
  if (value < quantity) {
    value++;
    $(this).siblings(".counter-value").first().text(value);
  }
});

$(document).ready(function () {
  $("#add-to-cart-button").click(function () {
    let quantity = $(".quantity").attr("id");
    let amount = $(".counter-value").text();
    if (quantity < amount) {
      alert("Easy There! It's more than what we have :(");
      return;
    }

    let message = $("<div>", {
      id: "message-content",
      class: "message-content-box col-md-10",
    });

    let messageContent = $("<div>", {
      class: "message-content-flex",
    });

    let messageIcon = $("<div>", {
      class: "message-icon",
    }).append(
      $("<img>", {
        src: "/assets/29721143e926a816dec4943d6352c52e.png",
        alt: "alt text",
        class: "message-icon",
      })
    );

    let messageText = $("<h5>", {
      class: "message-highlights",
      text: "This item has been added to your Shopping bag.",
    });

    let viewCartButton = $("<h5>", {
      class: "view-cart-button",
      text: "VIEW CART",
      click: function () {
        window.location.href = "/Cart";
      },
    });

    messageContent.append(messageIcon, messageText, viewCartButton);

    message.append(messageContent);

    $(".message-content-box").remove();

    $("#header").after(message);

    let jsonProduct = JSON.parse(localStorage.getItem("jsonProducts")) || [];

    const product = {
      image: $("#product-image").attr("src"),
      title: $("#product-title").text().trim(),
      price: $("#product-price").text().trim().replace("$ ", ""),
      quantity: $(".counter-value").text().trim(),
      id: $(".container").attr("id"),
    };

    const existingProduct = jsonProduct.find(
      (p) =>
        p.image === product.image &&
        p.title === product.title &&
        p.price === product.price
    );

    if (existingProduct) {
      existingProduct.quantity =
        parseInt(existingProduct.quantity) + parseInt(product.quantity);
    } else {
      jsonProduct.push(product);
    }

    localStorage.setItem("jsonProducts", JSON.stringify(jsonProduct));
  });
});

$(document).ready(function () {
  $("#add-to-cart-button").hover(
    function () {
      $(this).css("background-color", "black");
      $(this).css("color", "white");
    },
    function () {
      $(this).css("background-color", "");
      $(this).css("color", "");
    }
  );
});
