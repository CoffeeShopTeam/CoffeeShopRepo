function logout(req, res, next) {
    req.session.data = null;
    res.redirect("/login/");
}

module.exports = { logout };