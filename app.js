const express = require("express");
const mongoose = require("mongoose");

const booksRoutes = require("./routes/booksRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

mongoose
    .connect(
        "mongodb+srv://arthura54:8Q4h9BeHpqDMsJam@database.iyfmdur.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

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

app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
