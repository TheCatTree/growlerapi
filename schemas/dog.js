var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DogSchema   = new Schema({
    name: String,
    picture: String,
    attributes: [String],
    description: String,
    breed: String,
    friends: [String]
});

module.exports = mongoose.model('Dog', DogSchema);