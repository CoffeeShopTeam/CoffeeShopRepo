function handleEditButtonClick(event) {
  event.preventDefault();

  const form = document.getElementById("user-details-form");
  const formInputs = form.querySelectorAll("input");
  const email = document.getElementById("email");
  formInputs.forEach((input) => {
    if (input.value != email.value) {
      input.removeAttribute("disabled");
    }
  });

  const editButton = document.getElementById("editButton");
  editButton.textContent = "Save";
  editButton.removeEventListener("click", handleEditButtonClick);
  editButton.addEventListener("click", handleSaveButtonClick);
}

function handleSaveButtonClick() {
  const form = document.getElementById("user-details-form");
  const formInputs = form.querySelectorAll("input");
  formInputs.forEach((input) => {
    input.setAttribute("disabled", true);
  });

  const editButton = document.getElementById("editButton");
  editButton.textContent = "Edit";

  const data = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    country: document.getElementById("country").value,
    city: document.getElementById("city").value,
    street: document.getElementById("street").value,
    houseNumber: document.getElementById("houseNumber").value,
  };

  axios
    .put("/account/details", data)
    .then((response) => {})
    .catch((error) => {
      console.error("Error:", error);
    });
}

const editButton = document.getElementById("editButton");
editButton.addEventListener("click", handleEditButtonClick);
