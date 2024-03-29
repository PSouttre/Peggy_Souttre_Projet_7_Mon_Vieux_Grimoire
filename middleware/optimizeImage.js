import sharp from "sharp";
import fs from "fs";
import path from "path";
import { error } from "console";

// export const deleteFile = (path) => {
//   fs.unlink(path, (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   });
// };

export const optimizeImage = async (req, res, next) => {
  console.log(req.file.path);
  try {
    // On créé le nom et le chemin du fichier pour la version compressée
    req.file.compressedFileName = req.file.filename + ".webp";
    req.file.compressedFilePath = req.file.path + ".webp";

    await sharp(req.file.path)
      .resize(200, 200)
      .webp(90)
      .toFile(req.file.compressedFilePath);
    // `./images/cover/${req.file.filename}`, (err, info) => {
    // if (err) console.log(err);
    // console.log(info);}

    //Si compression on supprime l'image d'origine
    fs.unlink(req.file.path, (error) => {
      if (error) console.log(error);
    });

    next();

    // deleteFile(req.file.path);
  } catch (error) {
    res.status(500).json({ toto: "toto", error });
  }
};
