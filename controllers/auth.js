const User = require('../models/user');
exports.postLogin = (req, res, next) => {
    User.findById('6004bd2dc368bf17a5e3fb13').then((user) => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
            console.log(err);
            res.redirect('/Login'); 
        });
        
    })
    
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err)=> {
        console.log(err);  
        res.redirect('/');
    })

         
}



exports.getLogin = (req, res, next) => {
    //console.log(req.get('Cookie'));
    // const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1]==='true';
    
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
}


