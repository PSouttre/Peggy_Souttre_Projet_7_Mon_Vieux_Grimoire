import { Router } from "express";

// services
import {
  getBooks,
  getBookById,
  createBook,
  modifyBook,
  deleteBook,
} from "../service/booksService.js";

const router = Router();

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", createBook);

router.put("/:id", modifyBook);

router.delete("/:id", deleteBook);

export default router;
