let mongoose = require('mongoose');

let schema = mongoose.Schema;

let userSchema = new schema({
    username: {
        type: String,
        required: true
    },
    log: [{
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        date: { type: Date, required: true }
    }]
});

let myUser = mongoose.model('myUser', userSchema);

module.exports = myUser;