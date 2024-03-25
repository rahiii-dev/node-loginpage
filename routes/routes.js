const express = require('express');

const router = express.Router()

const users = new Map();
users.set('admin', {
    username: "admin",
    password: "admin123"
});

// dashboard
router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', {user: req.session.user})
});


// login
router
.route('/login')
.get((req, res) => {
    res.render('pages/login');
})
.post((req, res) => {
    const { username, password } = req.body;
    const errors = {};

    if (!username) {
        errors.usernameError = "Please enter Username";
    }

    if (!password) {
        errors.passError = "Please enter Password";
    }

    if (Object.keys(errors).length > 0) {
        return res.render('pages/login', { errors: errors, username: username });
    }

    if (users.has(username)) {
        const user = users.get(username);

        if (user.password === password) {
            req.session.user = user.username;
            return res.redirect("/dashboard");
        }
    }

    errors.credError = "Invalid Username or Password";
    errors.values = {
        username : username
    }
    res.render('pages/login', { errors: errors, username: username });
});

// logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).send("Server Error");
        }

        res.redirect('/login');
    })
});

module.exports = router;