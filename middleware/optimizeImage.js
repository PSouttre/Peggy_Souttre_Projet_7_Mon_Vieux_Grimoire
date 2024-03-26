import sharp from "sharp";
import fs from "fs";
import path from "path";

export const deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

export const optimizeImage = async (req, res, next) => {
  console.log(req.file.path);
  try {
    await sharp(req.file.path)
      .resize(300, 300)
      .toFile(`./images/cover/${req.file.filename}`, (err, info) => {
        if (err) console.log(err);
        console.log(info);
      });

    deleteFile(req.file.path);
  } catch (error) {
    console.log(error);
    res.status(500).json({ toto: "toto", error });
  }
  next();
};
