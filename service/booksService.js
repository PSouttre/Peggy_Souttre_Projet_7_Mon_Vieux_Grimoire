import Book from "../models/Book.js";

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
export const createBook = (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    userId: req.body.userId,
  });
  thing
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
  const book = new Book({
    _id: req.params.id,
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    userId: req.body.userId,
  });
  Book.updateOne({ _id: req.params.id }, book)
    .then(() => {
      res.status(201).json({
        message: "Mise à jour du livre réussie !",
      });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//SUPPRRESSION D'UN OBJET
export const deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Supprimé!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//RENVOI D'UN TABLEAU DES 3 LIVRES DE LA BDD AYANT LA MEILLEURE NOTE
// export const getBestBooks = (req, res, next) => {

// };
