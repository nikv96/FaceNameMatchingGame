module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        var imageDb = require('./models/images.js');
        var Image = new imageDb();
        Image.getTwoImages(function(images){
            var image1 = images.image1;
            var image2 = images.image2;
            console.log(images);
            res.render('index.ejs', {
                user: req.user,
                image1: image1.image.path,
                name1: image1.image.name,
                name2: image2.image.name
            });
        });

    });
    app.get('/login', function(req, res) {
        res.render('login.ejs');
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));
    app.get('/signup', function(req, res) {
        res.render('signup.ejs');
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signup',
        failureFlash : true
    }));
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
