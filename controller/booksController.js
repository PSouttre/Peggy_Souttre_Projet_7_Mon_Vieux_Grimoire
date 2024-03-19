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

router.get("/", auth, getBooks);
router.get("/:id", auth, getBookById);
// router.get("/bestrating", getBestBooks);
router.post("/", auth, multer, createBook);
router.put("/:id", auth, modifyBook);
router.delete("/:id", auth, deleteBook);

export default router;
