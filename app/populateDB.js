module.exports = function(){
	var User = require('./models/user.js');
	
	var user = User();

	user.local.full_name = "James May";
	user.local.email = "jamesmay@gmail.com";
	user.local.dob = "20/1/1990";
	user.local.password = user.generateHash("jamesmay");
	user.local.caregiver_name = "Jeremy Clarkson";
	user.save(function(err) {
        if (err)
            throw err;
    });

    var user = User();

    user.local.full_name = "Jeremy Clarkson";
	user.local.email = "jeremyclarkson@gmail.com";
	user.local.dob = "20/1/1990";
	user.local.password = user.generateHash("jeremyclarkson");
	user.local.caregiver = true;
	user.save(function(err) {
        if (err)
            throw err;
    });

	var user = User();

    user.local.full_name = "Richard Hammond";
    user.local.email = "richardhammond@gmail.com";
    user.local.dob = "20/1/1990";
    user.local.password = user.generateHash("richardhammond");
    user.local.caregiver_name = "Jeremy Clarkson";
    user.save(function(err) {
        if (err)
            throw err;
    });

    var Score = require('./models/scores.js');
    for (var i=0; i<12; i++){
    	var score = Score();
    	score.patient_name = "James May";
	    score.month = i;
	   	score.totalCounts = Math.floor(Math.random() * (30 - 10 + 1) + 10);
	   	score.correctCounts =Math.floor( Math.random() * (score.totalCounts - 0 + 1) + 0 );
	   	score.save(function(err){
	   		if (err) throw err;
	   	});
    }

    for (var i=0; i<12; i++){
    	var score = Score();
    	score.patient_name = "Richard Hammond";
	    score.month = i;
	   	score.totalCounts = Math.floor(Math.random() * (30 - 10 + 1) + 10);
	   	score.correctCounts = Math.floor(Math.random() * (score.totalCounts - 0 + 1) + 0);
	   	score.save(function(err){
	   		if (err) throw err;
	   	});
    }

}