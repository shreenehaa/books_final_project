import express from "express";
const router = express.Router();
import { Movie } from "../movies.js";
import moviesController from "../controller/movies-controller.js";
router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.insertMovie);
router
  .route("/:id")
  .get(moviesController.getMovieById)
  .delete(moviesController.deleteMovieById)
  .put(moviesController.updateMovieById);
export default router;
