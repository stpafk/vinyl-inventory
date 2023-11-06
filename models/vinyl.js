const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VinylSchema = new Schema({
    vynil_name: {type: String, required: true},
    artist: {type: Schema.Types.ObjectId, ref: "Artist", required: true},
    summary: {type: String, required: true},
    year_of_release: {type: Number, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: "Genre"}],
    cover: { type: String }
});

VinylSchema.virtual("url").get(function() {
    return `/catalog/vynil/${this.id}`;
});

module.exports = mongoose.model("Vinyl", VinylSchema);