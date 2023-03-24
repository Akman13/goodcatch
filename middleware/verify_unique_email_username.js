const db = require('./../db');

function validEmailUsername (req, res, next) {
    const message = {};
    console.log('Line 5 of verify unique email username triggered');
    
    const sqlUsername = 'SELECT * FROM users WHERE LOWER(username)=LOWER($1);';
    db.query(sqlUsername, [req.body.username], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {

            if (dbRes.rowCount > 0) {
                res.locals.badUsername = true;
                message.usernameMessage = 'This username already exists';
                console.log('Line 16 of verify unique email username triggered');
            }
            
            const sqlEmail = 'SELECT * FROM users WHERE LOWER(email)=LOWER($1);';
            db.query(sqlEmail, [req.body.email], (dbErr2, dbRes2) => {
                console.log('Line 24 of verify unique email username triggered');
                
                if (dbErr2) {
                    console.log(dbErr2);
                    process.exit(1);
        
                } else {
                    if (dbRes2.rowCount > 0) {
                        res.locals.badEmail = true;
                        message.emailMessage = 'This email already exists';
                    }

                    if (dbRes2.rowCount > 0 || dbRes.rowCount > 0) {
                        console.log('Line 33 of verify unique email username triggered');
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