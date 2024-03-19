import { log } from "console";
import Book from "../models/Book.js";
import fs from "fs";

//ROUTE GET QUI RENVOIE TOUS LES BOOKS DS LA BDD
export const getBooks = (req, res) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//ROUTE POST
export const createBook = (req, res) => {
  console.log(req);
  // on convertit le corps de la requête
  const bookObject = JSON.parse(req.body.book);
  // on supprime l'userid de la requête
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    // on remplace par l'userId extrait du token par le middleware d'authentification
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  book
    .save()
    .then(() => {
      res.status(201).json({
        message: "Objet enregistré !",
      });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//RECUPERATION D'UN BOOK SPECIFIQUE
export const getBookById = (req, res) => {
  Book.finOne({
    _id: req.params.id,
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

//MODIFICATION D'UN OBJET
export const modifyBook = (req, res, next) => {
  //on regarde si req.file existe ou non
  const bookObject = req.file
    ? {
        //s'il existe on traite la nouvelle image
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : // sinon on traite simplement l'objet entrant
      { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//SUPPRRESSION D'UN OBJET
export const deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        //on utilise le fait de savoir que notre url d'image contient un segment /images/ pour séparer le nom du fichier
        const filename = book.imageUrl.split("/images/")[1];
        // on utilise la fonction unlink du package fs pour supprimer ce fichier
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//RENVOI D'UN TABLEAU DES 3 LIVRES DE LA BDD AYANT LA MEILLEURE NOTE
// export const getBestBooks = (req, res, next) => {

// };
