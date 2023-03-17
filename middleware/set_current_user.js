const db = require("../db");

// Used to store the current user details into res.locals for use by the templates
function setCurrentUser(req, res, next) {
    const {user_id} = req.session;

    res.locals.currentUser = {};

    if (user_id) {
        const sql = `SELECT user_id, username, user_img_url FROM users WHERE user_id = ${user_id};`;
        
        db.query(sql, (dbErr, dbRes) => {
            if(dbErr) {
                console.log(dbErr);
                process.exit(1);
            } else {
                res.locals.currentUser = dbRes.rows[0];
                next();
            }
        })
    } else {
        next();
    }
}
module.exports = setCurrentUser;