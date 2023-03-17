const db = require("../db");

function checkProfileOwnership(req, res, next) {
    if(!req.session.user_id) {
        res.redirect('/');

    } else {
        if (req.session.user_id !== Number(req.params.id)) {
            res.redirect('/');

        } else {
            next();
        }
    }
}

module.exports = checkProfileOwnership;