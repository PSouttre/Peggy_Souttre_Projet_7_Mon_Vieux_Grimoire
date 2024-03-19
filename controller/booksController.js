import { Router } from "express";
import { isValidJwt } from "../middleware/auth.js";
import multer from "../middleware/multer-config.js";

// services
import {
  getBooks,
  getBookById,
  createBook,
  modifyBook,
  deleteBook,
  // getBestBooks,
} from "../service/booksService.js";

const router = Router();

// app.use('/images', express.static(path.join(__dirname, 'images')));

router.get("/", isValidJwt, getBooks);
router.get("/:id", isValidJwt, getBookById);
// router.get("/bestrating", getBestBooks);
router.post("/", isValidJwt, multer, createBook);
router.put("/:id", isValidJwt, multer, modifyBook);
router.delete("/:id", isValidJwt, deleteBook);

export default router;
