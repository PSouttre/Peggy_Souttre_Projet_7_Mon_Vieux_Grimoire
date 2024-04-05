import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
  // on appelle la fonction de hachage de bcryptd notre MDP et on demande de saler le MDP 10 fois
  bcrypt
    .hash(req.body.password, 10)
    // On reçoit le hash généré
    .then((hash) => {
      // On créé un utilisateur et on enregistre ds la BDD
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const login = (req, res, next) => {
  // On vérifie que lemail utilisateur correspond à un utilisateur existant de la BDD
  User.findOne({ email: req.body.email })
    .then((user) => {
      // Si n'existe pas => erreur 401 unauthorized
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de pass incorrecte" });
        //   si email correspond on continue
      } else {
        // On compare le MDP entré avec le hash enregistré dans la BDD
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            // si ne correspondent pas erreur 401 unauthorized
            if (!valid) {
              res.status(401).json({
                message: "Paire indentifiant/mot de passe incorrecte",
              });
              // si correspondent = infos d'authentification valides => réponse 200 avec id utilisateur + token
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  // Données que l'on veut encoder dans le token = payload
                  //UserId de l'utilisateur
                  { userId: user._id },
                  //Clé secrète pour l'encodage
                  process.env.JWT_SECRET_KEY,
                  //Argument de configuration => durée d'expiration du token
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
