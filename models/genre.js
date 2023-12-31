const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {type: String, required: true, minLenght: 3, maxLenght: 100},
    description: { type: String }
})

GenreSchema.virtual("url").get(function() {
    return `/catalog/genre/${this._id}`
});

module.exports = mongoose.model("Genre", GenreSchema);