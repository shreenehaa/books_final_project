import { Movie } from "../movies.js";
import moviesService from "../service/movies-service.js";

async function getAllMovies(request, response) {
  response.send(await moviesService.getMovieService());
}

async function insertMovie(request, response) {
  console.log(request.body);
  const { Name, Poster, Rating, Summary, Trailer } = request.body;
  response.send(
    await moviesService.insertMovieService(
      Name,
      Poster,
      Rating,
      Summary,
      Trailer
    )
  );
}

async function getMovieById(request, response) {
  //   console.log(request.params.id);
  const { id } = request.params;
  var ans = await moviesService.getMovieIdService(id);
  response.send(ans);
}

async function deleteMovieById(request, response) {
  var NOT_FOUND_MSG = { msg: "user not found" };
  const { id } = request.params;
  var ans = await moviesService.deleteMovieIdService(id);
  ans ? response.send("deleted") : response.status(404).send(NOT_FOUND_MSG);
}

async function updateMovieById(request, response) {
  console.log(request.params.id);
  const { id } = request.params;
  const ans1 = request.body;

  var ans = await moviesService.updateMovieIdService(ans1, id);

  const NOT_FOUND_MSG = { msg: "ID not found" };
  ans ? response.send(ans) : response.status(404).send(NOT_FOUND_MSG);
}
export default {
  getAllMovies,
  insertMovie,
  getMovieById,
  deleteMovieById,
  updateMovieById,
};
