const Book = require("../models/book");


exports.getAllBooks = (req,res, next) => {
    Book.find()
        .then( books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
}

exports.getBestRating = (req,res, next) => {
    
}

exports.createBook = (req, res, next) => {
    delete req.body._id;
    delete req.body._userId;
    
    const book = new Book({

    })
}

exports.modifyBook = (req, res, next) => {

}

exports.rateBook = (req, res, next) => {

}

exports.deleteBook = (req, res, next) => {

}