const db = require("../../db");

// Middleware function used to reset the current Session to the newly registered user
function setCurrentSession(req, res, next) {
    
    const sql = `SELECT user_id, email FROM users WHERE email = $1;`;
        
    db.query(sql, [req.body.email] ,(dbErr, dbRes) => {
        if(dbErr) {
            console.log(dbErr);
            process.exit(1);
        } else {
            // console.log(`Line13 of set-current-session. req.session is:`);
            // console.log(req.session);
            req.session.user_id = dbRes.rows[0].user_id;
            // res.locals.currentUser = dbRes.rows[0];
            next();
        }
    })
}

module.exports = setCurrentSession;