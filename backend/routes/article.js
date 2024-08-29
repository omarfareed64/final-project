const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const multer = require('multer');

let filename = '';

// Multer storage configuration
const myStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads'); // Ensure this path exists
    },
    filename: function (req, file, callback) {
        let date = Date.now();
        let fl = date + '-' + file.mimetype.split('/')[1];
        callback(null, fl);
        filename = fl;
    }
});

const upload = multer({ storage: myStorage });

router.post('/add', upload.single('image'), (req, res) => {
    let data = req.body;

    let article = new Article({
        title: data.title, // Handle the title field
        idAuthor: data.idAuthor,
        description: data.description, // Handle the id_author field
        date: new Date(),
        image: filename,
        tags: data.tags.split(','), // Ensure tags are split into an array
    });

    article.save()
        .then((saved) => {
            filename = ''; // Reset filename after saving
            res.status(200).send(saved);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});



// Other routes can be defined here
router.get('/all', (req, res) => {
    Article.find()
        .then((articles) => {
            res.status(200).send(articles);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});
router.get('/getbyid/:id', (req, res) => {
    let id = req.params.id;
    Article.findOne({ _id: id })
        .then((articles) => {
            res.status(200).send(articles);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});
router.get('/getbyidauthor/:id', (req, res) => {
    let id = req.params.id;
    Article.find({ idAuthor: id })
        .then((articles) => {
            res.status(200).send(articles);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;

    Article.findByIdAndDelete(id)
        .then((article) => {
            if (!article) {
                return res.status(404).send({ message: 'Article not found' });
            }
            res.status(200).send(article);
        })
        .catch((err) => {
            res.status(400).send({ message: 'Error deleting article', error: err });
        });
});

router.put('/update/:id', upload.any('image'), (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let article = new Article;
    article.tags = data.tags.split(',');
    if (filename.length > 0) {
        article.image = filename;
    }
    Article.findByIdAndUpdate({ _id: id }, data)
        .then((article) => {
            filename=''; // Reset filename after saving
            res.status(200).send(article);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

module.exports = router;
