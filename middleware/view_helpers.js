function viewHelpers(req, res, next) {
    res.locals.isLoggedIn = () => {
        if (req.session.user_id) {
            return true;
        } else {
            // return true; //##Remove this when we setup sessions
            return false;
        }
    }

    res.locals.isUniqueEmail = true;
    res.locals.emailExists = true;
    res.locals.passwordCorrect = true;



    next ();
}

module.exports = viewHelpers;