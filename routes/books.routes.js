import express from "express";
import booksController from "../controller/books.controller.js";
import { auth } from "../middleWare/auth.js";
const router = express.Router();
router
  .route("/")
  .get(booksController.getAllBooks)
  .post(auth, booksController.insertBook);
router.route("/search").get(booksController.searchBook);
router
  .route("/:id")
  .get(booksController.getBookById)
  .delete(auth, booksController.deleteBookById)
  .put(auth, booksController.updateBookById);
// .put(booksController.updateBookById);
export default router;
