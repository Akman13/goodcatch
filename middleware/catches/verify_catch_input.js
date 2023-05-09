// Checks the Catch details for valid inputs. Refreshes with warning message if invalid
function verifyCatchInput(req, res, next) {
    const validDate = !!req.body['catchDate'];
    const validImg = !!req.file;
    const validCaption = !!req.body['caption'];
    const validCatchState = !!req.body['catchState'];
    const validCatchLocation = !!req.body['catchLocation'];

    if (validDate && validImg && validCaption && validCatchLocation && validCatchState) {
        next()

    } else {
        const message = {invalidCreation: "Please ensure you have inputted a valid value for each field."}
        res.locals.badCatchDetails = true;
        res.render('catch-form', {message})
    }

}

module.exports = verifyCatchInput