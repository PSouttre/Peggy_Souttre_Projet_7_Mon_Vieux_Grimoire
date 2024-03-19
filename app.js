import express, { json } from "express";
import routes from "./routes/routes.js";
// import path from "path";

// bdd
import mongoose from "mongoose";

// controller
import booksController from "./controller/booksController.js";

const app = express();

// Permet les interactions entre appli Express et la BDD MongoDB
mongoose
  .connect(
    "mongodb+srv://JohnDoe:Inconnu0123@cluster0.fyzsjfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON
app.use(json());

app.use(`/api/${routes.BOOKS}`, booksController);

// app.use(`/api/${routes.AUTH}`, authController);

export default app;
