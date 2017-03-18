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

module.exports = mongoose.model('Scores', scoresSchema);
