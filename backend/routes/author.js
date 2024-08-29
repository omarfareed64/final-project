const express = require('express');

const router = express.Router();

const multer = require('multer');

const Author = require('../models/author');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

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

router.post('/register', upload.single('image'),(req, res) => {
    data=req.body;
    author= new Author(data);
    author.name= data.name;
    author.image= filename;

    salt= bcrypt.genSaltSync(10);
    author.password= bcrypt.hashSync(author.password, salt);

    author.save()
        .then(
            (savedAuthor) => {
                filename = ""
                res.status(200).json(savedAuthor);
            }
        )
        .catch(
            (error) => {
                res.send(error);
        })
    });
    router.post('/login', (req, res) => {
        let data = req.body;
    
        Author.findOne({ email: data.email })
            .then((author) => {
                if (!author) {
                    // Author not found
                    return res.status(401).send('Invalid email or password');
                }
    
                let valid = bcrypt.compareSync(data.password, author.password);
                if (valid) {
                    let payload = {
                        _id: author._id,
                        email: author.email,
                        fullname: author.name + ' ' + author.lastname
                    };
                    let token = jwt.sign(payload, '123456789');
                    res.send({ mytoken: token });
                } else {
                    // Invalid password
                    res.status(401).send('Invalid email or password');
                }
            })
            .catch((error) => {
                res.status(500).send('Internal Server Error');
            });
    });
router.get('/all', (req, res) => {
    Author.find()
    .then((authors) => {
        res.status(200).send(authors);
    })
    .catch((err) => {
        res.status(400).send(err);
    });
});
router.get('/getbyid/:id', (req, res) => {
    let id = req.params.id;
    Author.findOne({ _id: id })
        .then((authors) => {
            res.status(200).send(authors);
        })
        .catch((err) => {
            res.status(400).send(err);
        });

});

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;

    Author.findByIdAndDelete(id)
        .then((author) => {
            if (!author) {
                return res.status(404).send({ message: 'author not found' });
            }
            res.status(200).send(author);
        })
        .catch((err) => {
            res.status(400).send({ message: 'Error deleting author', error: err });
        });
});

module.exports = router;