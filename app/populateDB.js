module.exports = function(){
	var Image = require('./models/images.js');
	var fs = require('fs');
	var files = fs.readdirSync('./public/face-names');

	Image.find({}, function(err, images) {
		var nameList = [];
		for (i=0; i< images.length; i++) {
			nameList.push(images[i].image.name);
		}
		console.log(nameList);
		for (i = 0; i < files.length; i++) {
			console.log(nameList.indexOf(files[i]));
			if (nameList.indexOf(files[i]) == -1) {
				var newImage = new Image();
				newImage.image.name    = files[i];
				newImage.image.path    = "/face-names/"+files[i];
				newImage.save(function(err) {
					if (err)
					    throw err;
				});
				console.log(newImage);
			}
		}
	});
}