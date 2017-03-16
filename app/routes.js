module.exports = function(app, passport) {
    app.get('/', isLoggedIn, function(req, res) {
      var imageDb = require('./models/images.js');
      var Image = new imageDb();

      Image.getTwoImages(function(images){
          var image1;
          var image2;
          if(Math.random() < 0.5){
            image1 = images.image1;
            image2 = images.image2;
          }else{
            image1 = images.image2;
            image2 = images.image1;
          }
          // console.log(image1);
          res.render('index.ejs', {
              user: req.user,
              image: image1.image,
              name1: image1.image.name,
              name2: image2.image.name
          });
      });

    });
    app.post('/', function(req, res){
      if(req.body.selectedName !=null && req.body.targetName != null){
        var selectedName = req.body.selectedName;
        var targetName = req.body.targetName;
        if(selectedName == targetName){
          console.log(selectedName+"=="+targetName+" correct");
          //todo some logic to update scores
          res.redirect('/correctguess');
        }else{
          console.log(selectedName+"!="+targetName+" wrong");
          //todo some logic to update scores
          res.redirect('/wrongguess');
        }
        //find user
        // var dbQuery = find({})
        req.user

      }

      var imageDb = require('./models/images.js');
      var Image = new imageDb();

      Image.getTwoImages(function(images){
          var image1;
          var image2;
          if(Math.random() < 0.5){
            image1 = images.image1;
            image2 = images.image2;
          }else{
            image1 = images.image2;
            image2 = images.image1;
          }
          // console.log(image1);
          res.render('index.ejs', {
              user: req.user,
              image: image1.image,
              name1: image1.image.name,
              name2: image2.image.name
          });
      });
    });
    app.get('/login', function(req, res) {
        res.render('login.ejs');
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/patientmenu',
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
    app.get('/scores',isLoggedIn ,function(req, res) {
        res.render('scores.ejs');
    })
    app.get('/correctguess',isLoggedIn ,function(req, res) {
        res.render('correctguess.ejs');
    })
    app.get('/wrongguess',isLoggedIn ,function(req, res) {
        res.render('wrongguess.ejs');
    })
    app.get('/patientmenu',isLoggedIn ,function(req, res) {
        res.render('patientmenu.ejs');
    })

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
