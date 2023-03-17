const express = require('express');
const db = require("./../db");
const upload = require('./../middleware/upload');
const validSignupInput = require('./../middleware/verify_signup');
const validEditInput = require('./../middleware/verify_user_update');
const validEmailUsername = require('./../middleware/verify_unique_email_username');
const setCurrentSession = require('./../middleware/set_current_session');
const createNewUser = require('./../middleware/create_user');
const checkProfileOwnership = require('../middleware/check_profile_ownership');



const router = express.Router();

// Remaining:

router.get('/signup', (req, res) => {
    res.render('signup');
})


router.get('/users/:id/edit', checkProfileOwnership, (req, res) => {
    
    const sql = 'SELECT * FROM users WHERE user_id = $1';
    db.query(sql, [req.params.id], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const userData = dbRes.rows[0];
            console.log(userData.user_about);
            res.render('edit-profile-form', {userData});
        }
    })
})

router.get('/users/:id', (req, res) => {
    const sql = 'SELECT * FROM users WHERE user_id=$1';
    db.query(sql, [req.params.id], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const userRecord = dbRes.rows[0];
            
            if (userRecord.user_id === req.session.user_id) {
                res.locals.isProfileOwner = true;
            }

            res.render('profile', {userRecord});
        }
    })
})


router.post('/users', validSignupInput, validEmailUsername, createNewUser, setCurrentSession, (req, res) => {
    res.redirect('/');
})


router.put('/users/:id', checkProfileOwnership, validEditInput, (req, res) => {
    const sql = 'UPDATE users SET user_img_url=$1, user_about=$2 WHERE user_id=$3';

    db.query(sql, [req.file.path, req.body.about, req.params.id], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            res.redirect('/');
        }
    })
} )


// Readme info + deployment of tables
// Extra functions :) eg search, sort, etc

module.exports = router;