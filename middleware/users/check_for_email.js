const db = require("../../db");

// Checks the database to see if the email exists
function checkForEmail(req, res, next) {
    const email=req.body.email;

    const sql = `SELECT user_id FROM users WHERE LOWER(email)=LOWER($1);`;
    db.query(sql, [email], (dbErr, dbRes) => {
        if(dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else if (dbRes.rows.length === 0) {
            const emailMessage = 'The email you have provided does not exist.'
            res.locals.emailExists = false;
            res.render('login', {emailMessage});

        } else if (dbRes.rows.length > 0) {
            next();

        } else {
            console.log('Line 21 of check_for_email. Should not show.');
        }
    })
}

module.exports = checkForEmail;