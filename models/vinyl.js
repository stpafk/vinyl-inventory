const mongoose = require('mongoose');
const {DateTime} = require('luxon')

const Schema = mongoose.Schema;

const VinylSchema = new Schema({
    vinyl_name: {type: String, required: true},
    artist: {type: Schema.Types.ObjectId, ref: "Artist", required: true},
    summary: {type: String, required: true},
    date_of_release: {type: Date, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: "Genre"}],
    cover: { type: String }
});

VinylSchema.virtual("url").get(function() {
    return `/catalog/vinyl/${this.id}`;
});

VinylSchema.virtual("formatted_date").get(function() {
    return this.date_of_release ? DateTime.fromJSDate(this.date_of_release).toLocaleString(DateTime.MED) : "";
})

VinylSchema.virtual("format_yyyy_mm_dd").get(function() {
    return DateTime.fromJSDate(this.date_of_release).toISODate();
});

module.exports = mongoose.model("Vinyl", VinylSchema);