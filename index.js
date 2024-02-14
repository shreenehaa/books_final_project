// const express = require("express"); // "type": "commonjs"
import express, { response } from "express"; // "type": "module"
import { sequelize } from "./config.js";
import moviesRouter from "./routes/books.routes.js";
import cors from "cors";
import morgan from "morgan";
// import multer from "multer";
import userRouter from "./routes/user-routes.js";
import booksRouter from "./routes/books.routes.js";
import path from "path";

import { users_details } from "./model/user-model.js";
// import {usersToken} from "./model/usersToken.js"
import { auth } from "./middleWare/auth.js";
import userService from "./service/user-service.js";
import { userTokens } from "./model/userTokens.js";
import { role } from "./model/role.js";

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const PORT = process.env.PORT;

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
// app.use("/movies", moviesRouter);
app.use("/books", booksRouter);
app.use("/users", userRouter);
// const access1 = await access.create({ userid: 1, roleid: 0 });
// const access1 = await access.create({ userid: 4, roleid: 0 });
// const role1 = await role.create({ roleid: 2, rolename: "normal user" });
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
