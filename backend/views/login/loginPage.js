$(function() {
    localStorage.clear();
    
    $('#goToSignUpBtn').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = '/signup/';
    });
});