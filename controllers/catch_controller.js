const express = require('express');
const db = require("./../db");
const upload = require('./../middleware/upload');


const router = express.Router();

// Remaining:
// Show edit & delete buttons at the catch page IF you are the creator
// Make the edit page (redirect to catch form, but with preset values)\
// Users: register
// Users: profile page
// Users: edit info
// Extra functions :)


router.get('/', (req, res) => { //GET the home page

    const sql = 'SELECT * FROM catches;';
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
                        // catches[i].user_id = dbRes2.rows[0].user_id;

                        
                        if (i === dbRes.rows.length-1) {
                            console.log(catchDate);
                            res.render('home', {catches});
                        }
                    }
                })
            }
        }
    })
})

router.get('/catches/new', (req, res) => { //GET a new catch form
    res.render('catch-form');
})

router.get('/catches/:id', (req, res) => { //GET a catch
    // Need: 
    // - catch_id (req.params.id)
    const catchId = req.params.id;
    
    // query for that in the catch tab, then nest a query in the users tab, then render
    // Query in the catch tab:
    const sqlCatch = 'SELECT * FROM catches WHERE catch_id=$1;';
    db.query(sqlCatch, [catchId], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const catchRecord = dbRes.rows[0];
            const user_id = catchRecord.user_id;
            const sqlUser = 'SELECT * FROM users WHERE user_id=$1;';

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

                    console.log(catchRecord);
                    res.render('catch', {catchRecord});
                }

            })
        }
    })
    
    // Send:
    // catch caption (via catch_id)
    // user avatar pic (via catch_id --> user_id)
    // catch experience
    
    // res.json('This is a catch');

})

router.post('/catches', upload.single("uploaded-file"), (req, res) => { //POST a new catch
    // const catch_img_url = req.file.path;
    // Middleware uploads it, we get the url path
    // We have received the user's inputs
    // Need to add them into the database

    const sql = 'INSERT INTO catches (user_id, caption, experience, image_url, catch_state, catch_location, catch_date) VALUES ($1, $2 ,$3 ,$4, $5, $6, $7);';


    // Need to make a middleware that checks if they're logged in. If not, then take them to a login screen first with a message

    db.query (sql, [req.session.user_id, req.body['caption'], req.body['experience'], req.file.path, req.body['catchState'], req.body['catchLocation'], req.body['catchDate']],(dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            res.redirect('/');
        }
    })
})

router.get('/catches/:id/edit', (req, res) => { //GET an edit catch form

})

router.put('/catches/:id', (req, res) => { //PUT an updated catch

})

router.delete('/catches', (req, res) => { //DELETE a catch

})


module.exports = router;