import { Router } from "express";
// services
import { getBooks } from "../service/booksService.js";

const router = Router();

router.get("/", getBooks);

// router.get("/:id", getBookById);

// router.post()

// router.delete()

// router.put()

export default router;
