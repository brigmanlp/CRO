var mongoose = require('mongoose');

// Video Schema
var VideoSchema = mongoose.Schema({
	title: {
		type: String
	},
	category: {
		type: String
	},
    url: {
		type: String,
	},
	dateAdded: {
		type: Date,
        Default: Date.now()
	}
});

var Video = module.exports = mongoose.model('Video', VideoSchema);

module.exports.getVideos = function(callback){
	var query = {};
	Video.find(query, callback);
}

// module.exports.getVideoByVideoname = function(Videoname, callback){
// 	var query = {Videoname: Videoname};
// 	Video.findOne(query, callback);
// }

// module.exports.getVideoById = function(id, callback){
// 	Video.findById(id, callback);
// }

// module.exports.updateVideoById = function(id){
// 	var query = {_id: id}
// 	Video.update(query, { $set: {key: value}}).exec(
// 		console.log("updated record")
// 	);
// }
