$(function() {


    $('#goToSignUpBtn').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = '/signup/';
    });
});