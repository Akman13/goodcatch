const db = require('../../db');

function validEmailUsername (req, res, next) {
    const message = {};
    
    const sqlUsername = 'SELECT * FROM users WHERE LOWER(username)=LOWER($1);';
    db.query(sqlUsername, [req.body.username], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {

            if (dbRes.rowCount > 0) {
                res.locals.badUsername = true;
                message.usernameMessage = 'This username already exists';
                // console.log('Line 16 of verify unique email username triggered');
            }
            
            const sqlEmail = 'SELECT * FROM users WHERE LOWER(email)=LOWER($1);';
            db.query(sqlEmail, [req.body.email], (dbErr2, dbRes2) => {
                
                if (dbErr2) {
                    console.log(dbErr2);
                    process.exit(1);
        
                } else {
                    if (dbRes2.rowCount > 0) {
                        res.locals.badEmail = true;
                        message.emailMessage = 'This email already exists';
                    }

                    if (dbRes2.rowCount > 0 || dbRes.rowCount > 0) {
                        res.render('signup', {message});
                        
                    } else if (dbRes2.rowCount === 0 && dbRes.rowCount === 0) {
                        next();
        
                    } else {
                        console.log('Line 40 of verify unique email username. Should not be shown.');
                    }
                }
            })
        }
    })
}


module.exports = validEmailUsername;