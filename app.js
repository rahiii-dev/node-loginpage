const express = require('express');
require('dotenv').config();
const session = require('express-session');
const routes = require('./routes/routes');
const {noCacheMiddleware, autMiddleware} = require('./middlewares/middleware')

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//middlewares
app.use(noCacheMiddleware);
app.use(autMiddleware);

// form parsing
app.use(express.urlencoded({extended: true}));
// routes
app.use('/', routes);

// home
app.get('/', (req, res) => {
    if(req.session.user){
        return res.redirect('/dashboard');
    }

    res.redirect('/login');
});

app.get('/*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}/`);
})