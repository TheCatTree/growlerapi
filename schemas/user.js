var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    dogs: [String],
    flagged_dogs: [String]

});

module.exports = mongoose.model('User', UserSchema);