const db = require('../../db');


function validEditInput(req, res, next) {
    const userData = { user_id: res.locals.currentUser.user_id };

    const photoEmpty = !req.file;
    if (photoEmpty) {
        res.locals.badPhoto = true;
        userData.photoMessage = 'Please ensure you have selected a photo';
    }

    const aboutEmpty = (req.body.about.trim() === "");
    if (aboutEmpty) {
        res.locals.badAbout = true;
        userData.aboutMessage = 'Please ensure you have provided a valid input.'
    }

    if (photoEmpty || aboutEmpty) {
        const sql = 'SELECT * FROM users WHERE user_id=$1';

        db.query(sql, [req.params.id], (dbErr, dbRes) => {
            if (dbErr) {
                console.log(dbErr);
                process.exit(1);

            } else {
                Object.assign(userData, dbRes.rows[0])

                if (userData.user_id === req.session.user_id) {
                    res.locals.isProfileOwner = true;
                }

                res.render('edit-profile-form', { userData });
            }
        })
    } else {
        next()
    }
}


module.exports = validEditInput;