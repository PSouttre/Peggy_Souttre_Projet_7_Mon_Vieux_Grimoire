import sharp from "sharp";
import fs from "fs";

export const optimizeImage = async (req, res, next) => {
  console.log(req.file);
  try {
    // On créé le nom et le chemin du fichier pour la version compressée
    const rawImage = "images/" + req.file.filename;
    const optimizedImage = "./images/optimized_" + req.file.filename;

    sharp.cache(false);
    sharp(req.file.path)
      .resize(210, 300)
      .toFile(optimizedImage, (err, _) => {
        if (err) console.log("ERROR SHARP", err);

        fs.unlink(rawImage, (error) => {
          if (error) console.log("ERROR UNLINK", error);
        });
      });

    next();
  } catch (error) {
    res.status(500).json({ toto: "toto", error });
  }
};
