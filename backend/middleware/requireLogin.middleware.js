function requireLogin(req, res, next) {
    try {
        const { type, _id } = req.session.data;
        req.type = type;
        req.userId = _id;
        next();
    } catch (error) {
        res.redirect("/login/");
    }
}

module.exports = { requireLogin }

