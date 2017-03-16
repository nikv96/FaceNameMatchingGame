var mongoose = require('mongoose');

var scoresSchema = mongoose.Schema({
    score            : {
        name            : String,
        month           : String,
        totalCounts     : Number,
        correctCounts   : Number
    }
});

module.exports = mongoose.model('Scores', scoresSchema);
