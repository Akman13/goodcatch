function validSignupInput (req, res, next) {
    const message = {};
    
    const usernameEmpty = (req.body.username.trim() === "");
    const usernameWhitespace = (req.body.username.includes(" "));
    
    if (usernameWhitespace) {
        res.locals.badUsername = true;
        message.usernameMessage = 'Your username cannot contain spaces';

    } else if(usernameEmpty) {
        res.locals.badUsername = true;
        message.usernameMessage = 'Please ensure you have provided a valid username.'
    }

    const emailEmpty = (req.body.email.trim() === "");
    const emailWhitespace = (req.body.email.includes(" "));
    if (emailWhitespace) {
        res.locals.badEmail = true;
        message.emailMessage = 'Your email cannot contain spaces';

    } else if(emailEmpty) {
        res.locals.badEmail = true;
        message.emailMessage = 'Please ensure you have provided a valid email.'
    }

    const passwordEmpty = (req.body.password.trim() === "");
    const passwordWhitespace = (req.body.password.includes(" "));
    if (passwordWhitespace) {
        res.locals.passwordAdequate = false;
        message.passwordMessage = 'Your password cannot contain spaces';
    
    } else if(passwordEmpty) {
        res.locals.passwordAdequate = false;
        message.passwordMessage = 'Please ensure you have provided a valid password.'
    }

    const photoEmpty = !req.file;
    if (photoEmpty) {
        res.locals.badPhoto = true;
        message.photoMessage = 'Please ensure you have selected a photo';
    }

    const aboutEmpty = (req.body.about.trim() === "");
    if(aboutEmpty) {
        res.locals.badAbout = true;
        message.aboutMessage = 'Please ensure you have provided a valid input.'
    }


    if (usernameEmpty || usernameWhitespace || emailEmpty || emailWhitespace || passwordEmpty || passwordWhitespace || photoEmpty || aboutEmpty ) {
        res.render('signup', {message});
    } else {
        next()
    }
}


module.exports = validSignupInput;