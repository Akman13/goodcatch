const db = require("../../db");
const bcrypt = require('bcrypt');


// Creates a user and stores their email and digested password into the database.
function recordNewUser(req, res, next) {
    
    const { email, password } = req.body;
    
    bcrypt.genSalt(10, (err, salt) => {
    
        bcrypt.hash(password, salt, (hashErr, digestedPassword) => {
            // const sql = `INSERT INTO users (email, password_digest) VALUES ('${email}', '${digestedPassword}')`;
            const sql = `INSERT INTO users (username, email, password_digest, user_img_url, user_about) VALUES ($1, $2, $3, $4, $5)`;
    
            db.query(sql, [req.body.username, email, digestedPassword, req.file.path, req.body.about], (dbErr, dbRes) => {
                if (dbErr) {
                    console.log(dbErr);
                    process.exit(1);
    
                } else {
                    next();
                }
            })
        })
    })
}

module.exports = recordNewUser;