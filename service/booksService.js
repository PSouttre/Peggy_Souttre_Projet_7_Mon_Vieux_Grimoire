import Book from "../models/Book.js";
import fs from "fs";

//ROUTE GET QUI RENVOIE TOUS LES BOOKS DS LA BDD
export const getBooks = (_, res) => {
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
  // on convertit le corps de la requête
  const bookObject = JSON.parse(req.body.book);
  // on supprime l'userid de la requête
  delete bookObject._id;
  delete bookObject._userId;
  const newbook = new Book({
    ...bookObject,
    // on remplace par l'userId extrait du token par le middleware d'authentification
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/optimized_${
      req.file.filename
    }`,
  });

  newbook
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
  Book.findOne({
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
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : // sinon on traite simplement l'objet entrant
      { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // Modification du livre possible que par l'utilisateur qui a créé la fiche
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "Requête non autorisée" });
      } else {
        //On sépare le nom du fichier image existant
        const filename = book.imageUrl.split("/images/")[1];
        //Si l'image est modifiée, on supprime l'ancienne
        req.file &&
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
          });

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

//SUPPRESSION D'UN OBJET
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

//NOTATION D'UN LIVRE
export const postRating = (req, res) => {
  // La note du livre doit être comprise entre 0 et 5
  const rating = req.body.rating;
  const userId = req.body.userId;

  if (rating < 0 || rating > 5) {
    res
      .status(400)
      .json({ message: " La note doit être comprise entre 0 et 5" });
  }

  Book.findById(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: " Livre non trouvé" });
      }

      if (userId !== req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      }

      //La note doit correspondre à l'userId d'un utilisateur
      //On vérifie si l'utilisateur a déjà voté
      const userRating = book.ratings.find(
        (rating) => rating.userId === userId
      );

      if (userRating) {
        res.status(400).json({ error: "L'utilisateur a déjà noté ce livre." });
      } else {
        //l'userId + la note sont ajoutés au tableau rating
        book.ratings.push({ userId, grade: rating });
      }

      const totalRatings = book.ratings.length;
      const sumRatings = book.ratings.reduce(
        (sum, rating) => sum + rating.grade,
        0
      );
      book.averageRating = sumRatings / totalRatings;

      book
        .save()
        .then((book) => {
          res.status(200).json(book);
        })
        .catch((error) => {
          console.log("pas bon");
        });
    })

    .catch((error) => {
      res.status(401).json({ error });
    });
};

//RENVOI D'UN TABLEAU DES 3 LIVRES DE LA BDD AYANT LA MEILLEURE NOTE
export const getBestBooks = (_, res) => {
  //On récupère tous les livres
  Book.find()
    //On trie dans l'ordre décroissant
    .sort({ averageRating: -1 })
    //On limite le nb de résultats retournés à 3
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(404).json({ error }));
};
