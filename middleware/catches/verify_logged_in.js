function verifyLoggedIn(req, res, next) {
    if (req.session.user_id) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = verifyLoggedIn;