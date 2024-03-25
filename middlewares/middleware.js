const noCacheMiddleware = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next()
}

const autMiddleware = (req, res, next) => {
    const isAuthenticated = req.session.user ? true : false;
    const isLoginPage = (req.url === '/login');

    if(isLoginPage && isAuthenticated){
        return res.redirect('/dashboard');
    }

    if(!isLoginPage && !isAuthenticated){
        return res.redirect('/login')
    }

    next()
}

module.exports = {noCacheMiddleware, autMiddleware}