var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    password: String,
    dogs: [String],
    flagged_dogs: [String]

});

module.exports = mongoose.model('User', UserSchema);