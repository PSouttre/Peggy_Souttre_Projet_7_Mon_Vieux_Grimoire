const express = require("express");

const app = express();

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

app.use("/api/books", (req, res, next) => {
  const books = [
    {
      userId: "identifiant MongoDB unique de l utilisateur qui a créé le livre",
      title: "titre du livre",
      author: "auteur du livre",
      imageUrl: "",
      year: 1999,
      genre: "genre du livre",
      ratings:
        [
          {
            userId:
              "identifiant MongoDB unique de l utilisateur qui a noté le livre",
            grade: "note donnée à un livre",
          },
        ] - "notes données à un livre",
      averageRating: "note moyenne du livre",
    },
    {
      userId: "identifiant MongoDB unique de l utilisateur qui a créé le livre",
      title: "titre du livre",
      author: "auteur du livre",
      imageUrl: "",
      year: 2005,
      genre: "genre du livre",
      ratings:
        [
          {
            userId:
              "identifiant MongoDB unique de l utilisateur qui a noté le livre",
            grade: "note donnée à un livre",
          },
        ] - "notes données à un livre",
      averageRating: "note moyenne du livre",
    },
  ];
  res.status(200).json(books);
});

module.exports = app;
