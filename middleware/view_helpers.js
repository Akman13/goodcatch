function viewHelpers(req, res, next) {
    res.locals.isLoggedIn = () => {
        if (req.session.user_id) {
            return true;
        } else {
            return false;
        }
    }


    res.locals.badUsername = false;
    res.locals.badEmail = false;
    res.locals.passwordAdequate = true;
    res.locals.badPhoto = false;
    res.locals.badAbout = false;

    res.locals.isProfileOwner = false;

    res.locals.isCatchOwner = false;
    res.locals.isUniqueEmail = true;
    res.locals.emailExists = true;
    res.locals.passwordCorrect = true;




    next ();
}

module.exports = viewHelpers;