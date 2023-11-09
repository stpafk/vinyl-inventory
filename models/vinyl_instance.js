const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VinylInstanceSchema = new Schema({
    vinyl: {type: Schema.ObjectId, ref: "Vinyl", required: true},
    issue: {type: Date, required: true},
    description: { type: String, maxLength: 200 },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Loaned", "Auction", "Sold"],
        default: "Available"
    },
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
})

VinylInstanceSchema.virtual("url").get(function() {
    return `/catalog/copies/${this._id}`
});

VinylInstanceSchema.virtual("formatted_date").get(function() {
    return this.issue ? DateTime.fromJSDate(this.date_of_release).toLocaleString(DateTime.MED) : "";
})

VinylInstanceSchema.virtual("format_yyyy_mm_dd").get(function() {
    return DateTime.fromJSDate(this.date_of_release).toISODate();
});

module.exports = mongoose.model("VynilInstance", VinylInstanceSchema);