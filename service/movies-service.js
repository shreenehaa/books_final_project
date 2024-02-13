import { Movie } from "../model/movies-model.js";

async function getMovieService() {
  return await Movie.findAll();
}

async function insertMovieService(Name, Poster, Rating, Summary, Trailer) {
  return await Movie.create({ Name, Poster, Rating, Summary, Trailer });
}

async function getMovieIdService(id) {
  return await Movie.findOne({
    where: {
      id: id,
    },
  });
}

async function deleteMovieIdService(id) {
  return await Movie.destroy({
    where: {
      id: id,
    },
  });
}

async function updateMovieIdService(ans1, id) {
  return await Movie.update(ans1, {
    where: {
      id: id,
    },
  });
}

export default {
  getMovieService,
  insertMovieService,
  getMovieIdService,
  deleteMovieIdService,
  updateMovieIdService,
};
