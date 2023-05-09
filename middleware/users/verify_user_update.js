const db = require('../../db');


function validEditInput (req, res, next) {
    const message = {};
    
    const photoEmpty = (req.file.path.trim() === "");
    if (photoEmpty) {
        res.locals.badPhoto = true;
        message.photoMessage = 'Please ensure you have selected a photo';
    }

    const aboutEmpty = (req.body.about.trim() === "");
    if(aboutEmpty) {
        res.locals.badAbout = true;
        message.aboutMessage = 'Please ensure you have provided a valid input.'
    }

    if (photoEmpty || aboutEmpty ) {
        res.render('edit-profile-form', {message});
    } else {
        next()
    }
}


module.exports = validEditInput;