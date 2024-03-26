import { Router } from "express";
import { isValidJwt } from "../middleware/auth.js";
import multer from "../middleware/multer-config.js";
import { optimizeImage } from "../middleware/optimizeImage.js";

// services
import {
  getBooks,
  getBookById,
  createBook,
  modifyBook,
  deleteBook,
  getBestBooks,
  postRating,
} from "../service/booksService.js";

const router = Router();

// app.use('/images', express.static(path.join(__dirname, 'images')));

// GET
router.get("/", getBooks);
router.get("/bestrating", getBestBooks);
router.get("/:id", getBookById);

// POST
router.post("/", isValidJwt, multer, optimizeImage, createBook);

router.put("/:id", isValidJwt, multer, modifyBook);
router.delete("/:id", isValidJwt, deleteBook);
router.post("/:id/rating", isValidJwt, postRating);

export default router;
