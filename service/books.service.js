import { Book } from "../model/books.js";
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
export default { getBooks, createBook, getBookId, deleteBookId, updateBookId };
