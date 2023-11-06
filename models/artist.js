const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    artist_name: {type: String, required: true, maxLenght: 150},
    formed_in: {type: String, required: true, maxLenght: 30},
    description: {type: String, maxLenght: 500},
    image: { type: String },
})

ArtistSchema.virtual("url").get(function() {
    return `catalog/artist/${this._id}`
});

module.exports = mongoose.model("Artist", ArtistSchema);