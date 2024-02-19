import { Book } from "../model/books.js";
import { Op } from "sequelize";
async function getBooks(dbQuery) {
  return await Book.findAll(dbQuery);
}

async function createBook(insertBook) {
  return await Book.create(insertBook);
}

async function getBookId(id) {
  return await Book.findOne({
    where: {
      id: id,
    },
  });
}

async function deleteBookId(id) {
  return await Book.destroy({
    where: {
      id: id,
    },
  });
}

async function updateBookId(updateBook, id) {
  return await Book.update(updateBook, {
    where: {
      id: id,
    },
  });
}
async function searchBookService(ans) {
  console.log(ans.search);
  return await Book.findOne({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${ans}%` } },
        { author: { [Op.like]: `%${ans}%` } },
        { genre: { [Op.like]: `%${ans}%` } },
        { language: { [Op.like]: `%${ans}%` } },
      ],
    },
  });
}

export default {
  getBooks,
  createBook,
  getBookId,
  deleteBookId,
  updateBookId,
  searchBookService,
};
