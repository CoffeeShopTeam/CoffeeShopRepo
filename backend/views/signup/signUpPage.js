$(function () {
    // TODO: Add header and footer
    // $("#header").load("/frontend/views/partials/Header/Header.html");
    // $("#footer").load("/frontend/views/partials/Footer/Footer.html");

    $('#goToLoginBtn').on('click', function(e) {
        e.preventDefault();
        window.location.href = '/login/';
    });
});
