const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 8081;
// const multer = require('multer');

const session = require('express-session');
const MemoryStore = require('memorystore')(session);


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));



const methodOverride = require('./middleware/utils/method_override');
const catchController = require('./controllers/catch_controller');
const sessionController = require('./controllers/session_controller');
const userController = require('./controllers/user_controller');
const setCurrentUser = require('./middleware/utils/set_current_user');
const viewHelpers = require('./middleware/utils/view_helpers');
const upload = require('./middleware/utils/upload');



app.use(express.urlencoded({extended:true}));
app.use(upload.single("uploaded-file"));
app.use(methodOverride);

app.use(setCurrentUser);
app.use(viewHelpers);
app.use(catchController);
app.use(sessionController);
app.use(userController);

// Modify the catch forms to handle EJS message data
// This is sent if the input fields are invalid
// The data flow looks something like:
//  - A middleware checks for valid data input
//  - This middleware is at the PUT and POST routes for catches
//  - If the input is invalid: 
//  - Change the view-helped states, render with the warning message
//  - Else, next()



app.listen(port, () => {
    console.log(`You are listening at port ${port}`);
})