import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { multer } from "multer";

// services
import {
  getBooks,
  getBookById,
  createBook,
  modifyBook,
  deleteBook,
  getBestBooks,
} from "../service/booksService.js";

const router = Router();

// app.use('/images', express.static(path.join(__dirname, 'images')));

router.get("/", auth, getBooks);
router.get("/:id", auth, getBookById);
// router.get("/bestrating", getBestBooks);
router.post("/", auth, multer, createBook);
router.put("/:id", auth, multer, modifyBook);
router.delete("/:id", auth, deleteBook);

export default router;
