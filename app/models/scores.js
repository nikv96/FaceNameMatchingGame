var mongoose = require('mongoose');

var scoresSchema = mongoose.Schema({
    patient_name    : String,
    month           : String,
    totalCounts     : Number,
    correctCounts   : Number,
});

scoresSchema.methods.getPatientScore = function(name, callback) {
	this.model('Scores').find({ patient_name: name }, function(err, scores) {
		var total = 0;
		var result = {};
		for (var i=0; i<scores.length; i++) {
			total += scores[i].totalCounts;
		}
		for (var i=0; i<scores.length; i++) {
			result[scores[i].month] = (scores[i].correctCounts / total) * 100;
		}
        callback(result);
    });
}

scoresSchema.methods.generateScoresList = function(users, callback) {
	this.model('Scores').find({}, function(err, scores) {
		var returnList = {};

		var userTotalList = {};
		for (var i = 0; i < users.length; i++) {
			var total = 0;
			for (var j = 0; j< scores.length; j++){
				if (scores[j].patient_name == users[i].local.full_name) {
					total += scores[j].totalCounts;
				}
			}
			userTotalList[users[i]] = total;
		}

		for (var i = 0; i < users.length; i++) {
			returnList[users[i].local.full_name] = {};
			for (var j = 0; j< scores.length; j++){
				if (scores[j].patient_name == users[i].local.full_name) {
					returnList[users[i].local.full_name][scores[j].month] = (scores[i].correctCounts / total) * 100;
				}
			}
			for (var j=0; j< 12; j++){
				if (returnList[users[i].local.full_name][j] == null)
					returnList[users[i].local.full_name][j] = 0;
			}
		}
        callback(returnList);
    });
}

module.exports = mongoose.model('Scores', scoresSchema);
