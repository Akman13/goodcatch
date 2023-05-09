const express = require('express');
const db = require("./../db");
const bcrypt = require('bcrypt');
const checkForEmail = require('./../middleware/users/check_for_email');


const router = express.Router();

router.get('/login', (req, res) => {
    if (req.session.user_id) {
        res.redirect('/');
    } else {
        res.render('login')
    }
})

router.post('/login', checkForEmail, (req, res) => {
    const { email, password } = req.body;
    
    const sql = `SELECT * FROM users WHERE email=$1;`;

    db.query(sql, [email] , (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);
        
        } else {
           
            const user = dbRes.rows[0];

            bcrypt.compare(password, dbRes.rows[0].password_digest, (err, result) => {
                if (result) {
                    req.session.user_id = user.user_id;
                    res.redirect('/');

                } else {
                    const passwordMessage = 'The password you have provided is incorrect.';
                    res.locals.passwordCorrect = false;
                    res.render('login', {passwordMessage});
                }

            })
        }
    })
})

router.delete('/login', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
})

module.exports = router;
