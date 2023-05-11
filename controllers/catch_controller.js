const express = require('express');
const db = require("./../db");
const upload = require('../middleware/utils/upload');
const checkCatchOwnership = require('../middleware/catches/check_catch_ownership');
const verifyCatchInput = require('../middleware/catches/verify_catch_input');
const verifyLoggedIn = require('../middleware/catches/verify_logged_in');


const router = express.Router();



router.get('/', (req, res) => { //GET the home page

    const sql = 'SELECT * FROM catches ORDER BY catch_date DESC LIMIT 12;';

    db.query(sql, (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const catches = dbRes.rows;

            for (let i = 0; i < dbRes.rows.length; i++) {
                const sqlUsername = `SELECT username from users where user_id=$1;`;
                const catchDate = dbRes.rows[i].catch_date;
                catches[i].catch_date = catchDate.split('-').reverse().join('-');

                db.query(sqlUsername, [dbRes.rows[i].user_id], (dbErr2, dbRes2) => {
                    if (dbErr2) {
                        console.log(dbErr2);
                        process.exit(1);
    
                    } else {

                        catches[i].username = dbRes2.rows[0].username;
                        
                        if (i === dbRes.rows.length-1) {
                            res.render('home', {catches});
                        }
                    }
                })
            }
        }
    })
})

router.get('/catches/new', verifyLoggedIn, (req, res) => { //GET a new catch form
    res.render('catch-form');
})

router.get('/catches/:id/edit', checkCatchOwnership, (req, res) => { //GET an edit catch form
    
    const sql = 'SELECT * FROM catches WHERE catch_id = $1';
    db.query(sql, [req.params.id], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const catchData = dbRes.rows[0];
            res.render('edit-catch-form', {catchData});
        }
    })
})



router.get('/catches/:id', (req, res) => { //GET a catch
    const catchId = req.params.id;

    const sqlCatch = 'SELECT * FROM catches WHERE catch_id=$1;';
    db.query(sqlCatch, [catchId], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const catchRecord = dbRes.rows[0];
            const user_id = catchRecord.user_id;
            const sqlUser = 'SELECT * FROM users WHERE user_id=$1;';
            if (req.session.user_id === user_id) {
                res.locals.isCatchOwner = true;
            }

            db.query(sqlUser, [user_id], (dbErr2, dbRes2) => {
                if (dbErr2) {
                    console.log(dbErr2);
                    process.exit(1);

                } else {
                    catchRecord.user_id = dbRes2.rows[0].user_id;
                    catchRecord.user_img_url = dbRes2.rows[0].user_img_url;
                    catchRecord.username = dbRes2.rows[0].username;
                    
                    const catchDate = dbRes.rows[0].catch_date;
                    catchRecord.catch_date = catchDate.split('-').reverse().join('-');

                    res.render('catch', {catchRecord});
                }

            })
        }
    })
})


router.post('/catches', verifyCatchInput, (req, res) => { //POST a new catch

    const sql = 'INSERT INTO catches (user_id, caption, experience, image_url, catch_state, catch_location, catch_date) VALUES ($1, $2 ,$3 ,$4, $5, $6, $7);';

    db.query (sql, [req.session.user_id, req.body['caption'], req.body['experience'], req.file.path, req.body['catchState'], req.body['catchLocation'], req.body['catchDate']],(dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            res.redirect('/');
        }
    })
})


router.put('/catches/:id', checkCatchOwnership, verifyCatchInput, (req, res) => { //PUT an updated catch
    
    const sql = 'UPDATE catches SET caption=$1, experience=$2, image_url=$3, catch_state=$4, catch_location=$5, catch_date=$6 WHERE catch_id=$7';

    db.query(sql, [req.body['caption'], req.body['experience'], req.file.path, req.body['catchState'], req.body['catchLocation'], req.body['catchDate'], req.params.id], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            res.redirect('/');
        }
    })
})

router.delete('/catches/:id', checkCatchOwnership, (req, res) => { //DELETE a catch
    const sql= 'DELETE FROM catches WHERE catch_id=$1';
    db.query(sql, [req.params.id], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            res.redirect('/');
        }
    })

})


module.exports = router;