const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 8080;

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

app.use(express.urlencoded({extended:true}));
app.use(methodOverride);

app.use(catchController);







app.listen(port, () => {
    console.log(`You are listening at port ${port}`);
})