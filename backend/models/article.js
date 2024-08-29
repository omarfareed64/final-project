const mongoose = require('mongoose');

const Article = mongoose.model('Article',{
    title: {
        type: String,
    },
    idAuthor: {
        type: String,
    },
    description: {
        type: String,

    },
    date: {
        type: Date,
    },
    content: {
        type: String,
    },
    image: {
        type: String
    },
    tags: {
        type: Array
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
      },
    
});



module.exports = Article;