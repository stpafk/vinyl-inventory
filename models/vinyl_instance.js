const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VinylInstanceSchema = new Schema({
    vinyl: {type: Schema.ObjectId, ref: "Vinyl", required: true},
    year: {type: Number, required: true},
    released_by: {type: String, required: true, maxLength: 100},
    released_in: { type: String, maxLength: 29 },
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    status: {
        type: String,
        required: true,
        enum: ["Available", "Loaned", "Auction", "All Sold"],
        default: "Available"
    },
})

VinylInstanceSchema.virtual("url").get(function() {
    return `/catalog/copies/${this._id}`
});

module.exports = mongoose.model("VynilInstance", VinylInstanceSchema);