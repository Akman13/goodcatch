const db = require('../../db');


function validEditInput (req, res, next) {
    const userData = {user_id:res.locals.currentUser.user_id};
    
    const photoEmpty = !req.file;
    if (photoEmpty) {
        res.locals.badPhoto = true;
        userData.photoMessage = 'Please ensure you have selected a photo';
    }

    const aboutEmpty = (req.body.about.trim() === "");
    if(aboutEmpty) {
        res.locals.badAbout = true;
        userData.aboutMessage = 'Please ensure you have provided a valid input.'
    }

    if (photoEmpty || aboutEmpty ) {
        res.render('edit-profile-form', {userData});
    } else {
        next()
    }
}


module.exports = validEditInput;