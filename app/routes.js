module.exports = function(app, passport) {
    app.get('/', isLoggedIn, function(req, res) {
      var imageDb = require('./models/images.js');
      var Image = new imageDb();

      Image.getTwoImages(function(images){
          var image1;
          var image2;
          if (Math.random() < 0.5) {
            res.render('index.ejs', {
                user: req.user,
                image: images.image1.image,
                name1: images.image1.image.name,
                name2: images.image2.image.name
            });
          } else {
            res.render('index.ejs', {
                user: req.user,
                image: images.image1.image,
                name1: images.image2.image.name,
                name2: images.image1.image.name
            });
          }
      });

    });
    app.post('/', function(req, res){
      if(req.body.selectedName !=null && req.body.targetName != null){
        var selectedName = req.body.selectedName;
        var targetName = req.body.targetName;
        if(selectedName == targetName) {
          console.log(selectedName+"=="+targetName+" correct");
          
          var Scores = require('./models/scores.js');
          var date = new Date();
          Scores.find({patient_name: req.user.local.full_name, month: date.getMonth()}, function(err, scores) {
            console.log(scores);
            if(scores[0] == null) {
              console.log("Creating new score.");
              var score = new Scores();
              var date = new Date();
              score.patient_name = req.user.local.full_name;
              score.month = date.getMonth();
              score.totalCounts = 1;
              score.correctCounts = 1;
              score.save(function(err) {
                if (err)
                    throw err;
              });
            } else {
              console.log("Updating score.");
              var score = scores[0];
              score.totalCounts += 1;
              score.correctCounts += 1;
              score.save(function(err) {
                if (err)
                  throw err;
              });
            }
          });

          res.render('correctguess.ejs',{
            user: req.user
          });
        } else {
          console.log(selectedName+"!="+targetName+" wrong");
          
          var Scores = require('./models/scores.js')
          var date = new Date();
          Scores.find({patient_name: req.user.local.full_name, month: date.getMonth()}, function(err, scores){
            if(scores == null) {
              var score = new Scores();
              var date = new Date();
              score.patient_name = req.user.local.full_name;
              score.month = date.getMonth();
              score.totalCounts = 1;
              score.correctCounts = 0;
              score.save(function(err) {
                if (err)
                    throw err;
              });
            } else {
              var score = scores[0];
              score.totalCounts += 1;
              score.save(function(err) {
                if (err)
                  throw err;
              });
            }
          });

          res.render('wrongguess.ejs',{
            user: req.user
          });
        }
      }
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
        var scoresDb = require('./models/scores.js');
        var Score = new scoresDb();

        Score.getPatientScore(req.user.local.full_name, function(scores){
          var results = [];
          for (var i = 0; i<12; i++) {
            if (scores[i] == null) {
              results.push(0);
            } else {
              results.push(scores[i]);
            }
          }
          console.log(results);
          res.render('scores.ejs', {
              user: req.user,
              scores: results
          });
        });
    })
    app.get('/correctguess',isLoggedIn ,function(req, res) {
        res.render('correctguess.ejs',{
          user: req.user
        });
    })
    app.get('/wrongguess',isLoggedIn ,function(req, res) {
        res.render('wrongguess.ejs',{
          user: req.user
        });
    })
    app.get('/patientmenu',isLoggedIn ,function(req, res) {
        res.render('patientmenu.ejs',{
          user: req.user
        });
    })

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
