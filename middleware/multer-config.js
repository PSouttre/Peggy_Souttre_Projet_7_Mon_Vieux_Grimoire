import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/png": "png",
};
//Constante storage à passer à multer comme configuration qui indique où enregister les fichiers entrants
const storage = multer.diskStorage({
  //fonction destination qui indique à multer d'enregister ds le dossier 'images'
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //fonction filename qui indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des _ et d'ajouter un timestamp comme nom de fichier
  filename: (req, file, callback) => {
    const name = file.originalname; //.split("").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

//On exporte multer configuré, on lui passe la const storage et on lui indique de gérer uniquement le téléchargements de fichiers image.
export default multer({ storage }).single("image");
