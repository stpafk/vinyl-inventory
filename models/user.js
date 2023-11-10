const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, minLength: 3, maxLength: 100},
    email: {type: String, required: true, minLength: 3, maxLength: 100},
    password: {type: String, required: true, minLength: 6}, 
})

UserSchema.virtual("url").get(function() {
    return `/user/${this.username}`
});

module.exports = mongoose.model("User", UserSchema);
