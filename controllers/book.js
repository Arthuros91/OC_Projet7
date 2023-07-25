const Book = require("../models/book");
const fs = require("fs");


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
    Book.find()
        .then((books) => {
            books.sort((a,b) => b.averageRating - a.averageRating);
            const bestRatingsArray = books.splice(0,3);
            return res.status(200).json(bestRatingsArray)
        })
        .catch(error => res.status(400).json({ error }));
}

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        title: bookObject.title,
        author: bookObject.author,
        imageUrl: `${req.protocol}://${req.get('host')}/${req.file.path}`,
        year: bookObject.year,
        genre: bookObject.genre,
        ratings: [{
            userId: req.auth.userId,
            grade: bookObject.ratings[0].grade}],
        averageRating: bookObject.ratings[0].grade
    });

    const rating = {
        userId: req.auth.userId,
        grade: req.body.rating
    };

    book.save()
        .then(res.status(201).json({ message: "Livre crée avec succès" }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifyBook = (req, res, next) => {
    if (req.file) {
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        bookObject = {
            ...JSON.parse(req.body.book),
            imageUrl: imageUrl
        };
    }

    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if(book.userId != req.auth.userId) {
                return res.status(403).json({message: "Utilisateur non authorisé"})
            } else {
                Book.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: "Livre modifié avec succès"}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
    
}

exports.rateBook = (req, res, next) => {
    const rating = {
        userId: req.auth.userId,
        grade: req.body.rating
    };

    const bookId = req.params.id;
    console.log(bookId);
    Book.findOne({_id: bookId})
        .then((book) => {
            const existingRating = book.ratings.find( rating => rating.userId === req.auth.userId);
            if (existingRating != null) {
                    return res.status(401).json({ message: "User has already rated this book." });
            } else {
                book.ratings.push(rating);
                console.log(book.ratings)
                const totalGrades = book.ratings.reduce((somme, élémentCourant) => {
                    return somme + élémentCourant.grade;
                }, 0);  
                const newAverage = totalGrades / book.ratings.length;
                book.averageRating = newAverage.toFixed(2);

                Book.updateOne({_id: bookId}, {ratings: book.ratings, averageRating: book.averageRating})
                    .then(() => res.status(200).json(book))
                    .catch(error => res.status(405).json({ error }))
            }
        })
        .catch(error => res.status(404).json({ error }));

}

exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .then( book => {
            if(book.userId != req.auth.userId) {
                res.status(403).json({message: "Utilisateur non authorisé"})   
            } else {
                const filename = book.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => res.status(200).json({message: "Livre supprimé avec succès"}))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
}