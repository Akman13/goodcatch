const db = require("../../db");

function checkCatchOwnership(req, res, next) {
    if(!req.session.user_id) {
        res.redirect('/');

    } 
    else {
        const sqlUser = 'SELECT user_id FROM catches WHERE catch_id = $1;';
        db.query(sqlUser, [req.params.id], (dbErr, dbRes) => {
            if (dbErr) {
                console.log(dbErr);
                process.exit(1);

            } else {
                const owner_id = dbRes.rows[0].user_id;

                if (owner_id === req.session.user_id) {
                    next()

                } else {
                    res.redirect('/')
                }
            }
        })
    }
}

module.exports = checkCatchOwnership;