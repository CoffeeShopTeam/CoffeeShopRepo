$(function () {
    // TODO: Add header and footer
    // $("#header").load("/frontend/views/partials/Header/Header.html");
    // $("#footer").load("/frontend/views/partials/Footer/Footer.html");

    $('#goToLoginBtn').on('click', function (e) {
        e.preventDefault();
        window.location.href = '/login/';
    });

    const phoneNumberRegex = /^(?:(?:\+|00)(?:[1-9]\d{0,2})[\s-]?)?(?:\()?(?:\d{1,4}(?:[\s-])?)?(?:\))?(?:[\s-]?\d{1,4}){1,10}(?:[\s-]?(?:#|x\.?|ext\.?|extension)\s?\d{1,4})?$/;

    function validatePhoneNumber(phoneNumber) {
        return phoneNumberRegex.test(phoneNumber);
    }
});
