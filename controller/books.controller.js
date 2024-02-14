import { Book } from "../model/books.js";
import booksService from "../service/books.service.js";
async function getAllBooks(request, response) {
  var querys = request.query;
  const page = querys?.page || 1;
  const limit = querys?.limit || 5;
  let dbQuery = {};
  // console.log(querys);
  if (querys.orderBy && querys.order) {
    dbQuery.order = [[querys.orderBy, querys.order]];
  }
  if ("page" in querys || "limit" in querys) {
    dbQuery.offset = (page - 1) * limit;
    dbQuery.limit = limit;
  }
  var result = await booksService.getBooks(dbQuery);
  response.send(result);
}

async function insertBook(request, response) {
  var insertBook = request.body;
  var insertedBook = await booksService.createBook(insertBook);
  response.send(insertedBook);
}

async function getBookById(request, response) {
  const { id } = request.params;
  var getBookByID = await booksService.getBookId(id);
  response.send(getBookByID);
}

async function deleteBookById(request, response) {
  //   console.log(request.params.id);
  const { id } = request.params;
  const msg = { msg: "not found" };
  var deleteBookByID = await booksService.deleteBookId(id);
  deleteBookByID
    ? response.send({ msg: "deleted" })
    : response.status(404).send(msg);
}

async function updateBookById(request, response) {
  // console.log(request.body);
  const { id } = request.params;
  const updateBook = request.body;
  const msg = { msg: "not found" };
  var updateBookByID = await booksService.updateBookId(updateBook, id);
  updateBookByID
    ? response.send(updateBookByID)
    : response.status(404).send(msg);
}

export default {
  getAllBooks,
  insertBook,
  getBookById,
  deleteBookById,
  updateBookById,
};
