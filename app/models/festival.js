var mongoose = require('mongoose');
var CreatedUpdatedAt = require('mongoose-timestamp');

/**
 * Festival Schema
 */

var Schema = mongoose.Schema;

var FestivalSchema = new Schema({
    name: {
        type: String
    },
    date: {
        type: Date
    },
    activities: {
        type: String
    }
});

FestivalSchema.plugin(CreatedUpdatedAt, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports.mongoose = mongoose;
module.exports.FestivalModel = mongoose.model('Festival', FestivalSchema);
