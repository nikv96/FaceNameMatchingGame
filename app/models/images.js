var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    image            : {
        path        : String,
        name        : String
    }
});

function getRandomInt(min, max) {
    return
}

imageSchema.methods.getTwoImages = function(callback) {
    this.model('Images').find({}, function(err, images){
        var max = images.length-1;
        var min = 0;
        var image1Index = Math.floor(Math.random() * (max - min + 1)) + min;
        var image2Index = Math.floor(Math.random() * (max - min + 1)) + min;
        var image1 = images[image1Index];
        var image2 = images[image2Index];
        while (image1 == image2) {
            if (image2Index == images.length - 1)
                image2Index -=2;
            image2 = images[image2Index + 1];
        }
        callback({"image1":image1, "image2": image2});
    });

}

module.exports = mongoose.model('Images', imageSchema);
