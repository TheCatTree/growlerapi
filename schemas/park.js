var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ParkSchema   = new Schema({
    name: String,
    suburb: String,
    leash_status: String,
    dogs_there: [String],
    leash_times: String,
    road_side: String,
    location: {}
});

module.exports = mongoose.model('Park', ParkSchema);