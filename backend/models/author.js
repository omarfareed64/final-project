const mongoose = require('mongoose');

const Author = mongoose.model('Author', {
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    about: {
        type: String
    },
    image: {
        type: String
    }
});


module.exports = Author;