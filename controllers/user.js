const User = require("../models/user");
const jwt = require("jsonwebtoken");


exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password:hash
            });
            User.save()
                .then(() => res.status(200).json({message: "Utilisateur créé avec succès !"}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
}




exports.login = (req, res, next) => {
    User.findOne(req.body.email)
        .then(user => {
            if(!user) {
                return res.status(401).json({message: "Le nom d'utilisateur ou le mot de passe est incorrect"})
            }  
            bcrypt.compare(req.body.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({message: "Le nom d'utilisateur ou le mot de passe est incorrect"})    
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            "SECRET_KEY",
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}