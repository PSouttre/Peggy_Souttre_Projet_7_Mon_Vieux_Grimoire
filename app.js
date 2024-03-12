import express, { json } from "express";
import routes from "./routes/routes.js";

// bdd
import mongoose from "mongoose";

// controller
import booksController from "./controller/booksController.js";

const app = express();

// mongoose.connect('mongodb+srv://:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

// Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON
app.use(json());

app.use(`/api/${routes.BOOKS}`, booksController);

// app.use(`/api/${routes.AUTH}`, authController);

export default app;
