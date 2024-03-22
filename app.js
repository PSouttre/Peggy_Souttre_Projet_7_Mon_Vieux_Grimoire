import express, { json } from "express";
import routes from "./routes/routes.js";
// import path from "path";

// bdd
import mongoose from "mongoose";

// controller
import booksController from "./controller/booksController.js";
import authController from "./controller/authController.js";

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

// Permet les interactions entre appli Express et la BDD MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fyzsjfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON
app.use(json());

// génération des familles de endpoints
// eg: localhost:4000/api/books/whatever/you/want....
// eg: localhost:4000/api/auth/whatever/you/want....
app.use(`/api/${routes.BOOKS}`, booksController);
app.use(`/api/${routes.AUTH}`, authController);

export default app;
