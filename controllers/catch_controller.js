const express = require('express');
const db = require("./../db");


const router = express.Router();

// Create a middleware function that 

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
                        catches[i].userId = dbRes2.rows[0].user_id;

                        
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

router.get('/catches/new', (req, res) => { //GET a new catch form

})

router.post('/catches', (req, res) => { //POST a new catch

})

router.get('/catches/:id/edit', (req, res) => { //GET an edit catch form

})

router.put('/catches/:id', (req, res) => { //PUT an updated catch

})

router.delete('/catches', (req, res) => { //DELETE a catch

})


module.exports = router;