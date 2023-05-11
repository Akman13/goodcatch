const db = require('./../../db')

// Checks the updated Catch details for valid inputs. Refreshes with warning message if invalid
function verifyUpdateCatchInput(req, res, next) {
    
    const sql = 'SELECT * FROM catches WHERE catch_id = $1';

    db.query(sql, [req.params.id], (dbErr, dbRes) => {
        if (dbErr) {
            console.log(dbErr);
            process.exit(1);

        } else {
            const catchData = dbRes.rows[0];
            const validDate = !!req.body['catchDate'];
            const validImg = !!req.file;
            const validCaption = !!req.body['caption'];
            const validCatchState = !!req.body['catchState'];
            const validCatchLocation = !!req.body['catchLocation'];
        
            if (validDate && validImg && validCaption && validCatchLocation && validCatchState) {
                next()
        
            } else {
                catchData.invalidCreation = "Please ensure you have inputted a valid value for each field."
                res.locals.badCatchDetails = true;
                res.render('edit-catch-form', {catchData})
            }
        }
    })



}

module.exports = verifyUpdateCatchInput