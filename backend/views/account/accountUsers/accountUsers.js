$(function () {
  $(".btn.delete").each(function (i, btn) {
    $(btn).on("click", async function (event) {
      const userId = event.target.value;
      console.log(event.target.value);
      $.ajax({
        url: `/account/${userId}`,
        method: "DELETE",
        success: function (response) {
          window.location.href = "/account/users/";
        },
        error: function (error) {
          console.error("Error fetching users:", error);
        },
      });
    });
  });

  $(".btn.edit").each(function (i, btn) {
    $(btn).on("click", async function (event) {
      const userId = event.target.value;
      console.log(event.target);

      $("#save").on("click", function (event) {
        event.preventDefault();
        console.log(event.target);
        console.log(userId);

        $("#save").off("click");
        const userType = $("#userType").val(); // Get the value from the edit form

        // Create an object with the data to send in the AJAX request
        const data = {
          userId: userId,
          userType: userType,
        };

        // Your AJAX request code here
        $.ajax({
          url: `/account/${userId}`,
          method: "PUT",
          data: data,
          success: function (response) {
            window.location.href = "/account/users/";
          },
          error: function (error) {
            console.error("Error fetching products:", error);
          },
        });
      });
    });
  });
});
