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
  editButton.addEventListener("click", handleSaveButtonClick);
}

function handleSaveButtonClick() {
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
    .then((response) => {
      const form = document.getElementById("user-details-form");
      const formInputs = form.querySelectorAll("input");
      formInputs.forEach((input) => {
        input.setAttribute("disabled", true);
      });
      const editButton = document.getElementById("editButton");
      editButton.textContent = "Edit";
    })
    .catch((error) => {
      if (error.response) {
        alert("Entered wrong addres.");
      }
    });
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
    .then((response) => {
      const currentPassword = document.getElementById("currentPassword");
      const newPassword = document.getElementById("newPassword");
      const confirmPassword = document.getElementById("confirmPassword");
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
      alert("password changed");
    })
    .catch((error) => {
      console.log("helllo");
      if (error.response) {
        alert("Entered current password wrong.");
      }
    });
}

const editButton = document.getElementById("editButton");
editButton.addEventListener("click", handleEditButtonClick);

const confirmPasswordButton = document.getElementById("confirmPasswordButton");
confirmPasswordButton.addEventListener("click", handleconfirmPasswordButton);
