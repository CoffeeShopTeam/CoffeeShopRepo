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
    .catch((error) => {});
}

function handleconfirmPasswordButton(event) {
  event.preventDefault();

  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("New password and confirm password do not match.");
    return;
  }

  const data = {
    currentPassword,
    newPassword,
    confirmPassword,
  };

  axios
    .put("/account/details", data)
    .then((response) => {})
    .catch((error) => {
      console.log("helllo");
      if (error.response) {
        // Handle the specific error case
        alert("Entered current password wrong.");
      }
    });
}

const editButton = document.getElementById("editButton");
editButton.addEventListener("click", handleEditButtonClick);

const confirmPasswordButton = document.getElementById("confirmPasswordButton");
confirmPasswordButton.addEventListener("click", handleconfirmPasswordButton);
