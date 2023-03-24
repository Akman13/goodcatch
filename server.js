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



const methodOverride = require('./middleware/method_override');
const catchController = require('./controllers/catch_controller');
const sessionController = require('./controllers/session_controller');
const userController = require('./controllers/user_controller');
const setCurrentUser = require('./middleware/set_current_user');
const viewHelpers = require('./middleware/view_helpers');
const upload = require('./middleware/upload');



app.use(express.urlencoded({extended:true}));
app.use(upload.single("uploaded-file"));
app.use(methodOverride);

app.use(setCurrentUser);
app.use(viewHelpers);
app.use(catchController);
app.use(sessionController);
app.use(userController);




/*
Incorporating sessions into the page. What does that look like?
We have a session created from the above API
When/if the user logs in, then store so in the session object
If the user logs out, then delete the session (?)

In the layout, check if the user is logged in or not
If they are - then 
*/





app.listen(port, () => {
    console.log(`You are listening at port ${port}`);
})