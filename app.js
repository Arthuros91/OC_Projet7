const mongoose = require("mongoose");
const express = require("express");

const path = require("path");
const helmet = require("helmet");
require('dotenv').config();

const booksRoutes = require("./routes/booksRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();



mongoose.connect(
        "mongodb+srv://" + process.env.MONGODB_URL + "?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
