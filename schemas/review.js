var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReviewSchema   = new Schema({
    user: String,
    park: String,
    rating: String,
    review_text: String
});

module.exports = mongoose.model('Review', ReviewSchema);