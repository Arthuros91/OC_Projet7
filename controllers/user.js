const User = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.signUp = (req, res, next) => {   
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password:hash
        });
        user.save()
            .then(() => res.status(200).json({message: "Utilisateur créé avec succès !"}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
}

    
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({message: "Le nom d'utilisateur ou le mot de passe est incorrect"})
            }  
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({message: "Le nom d'utilisateur ou le mot de passe est incorrect"})    
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_TOKEN,
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch(error => res.status(501).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}







function checkEmail(chaine) {
    let arobaseRegex = /@/;
    let contientArobase = arobaseRegex.test(chaine);
    if (contientArobase) {
      return true;
    } else {
      return false;
    }
}

function checkPaswword(chaine) {
    let majusculeRegex = /[A-Z]/;
    let chiffreRegex = /\d/;

    let contientMajuscule = majusculeRegex.test(chaine);
    let contientChiffre = chiffreRegex.test(chaine);

if (contientMajuscule && contientChiffre) {
    return true;
    } else {
    return false;
    }
}