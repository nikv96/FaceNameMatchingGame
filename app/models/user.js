var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
        full_name    : String,
        dob          : String,
        caregiver_name : {type: String, default: ""},
        caregiver    : {type: Boolean, default: false}
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.generatePatientList = function(name, callback) {
    this.model('User').find({}, function(err, users) {
        var usersList = [];
        for (var i=0; i< users.length; i++) {
            if (users[i].local.caregiver_name == name){
                usersList.push(users[i]);
            }
        }

        var scoresDb = require('./scores.js');
        var Score = new scoresDb();

        Score.generateScoresList(usersList, function(scores){
          callback(scores);
        });
    });
}

module.exports = mongoose.model('User', userSchema);