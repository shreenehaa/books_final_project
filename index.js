// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { sequelize } from "./config.js";
import moviesRouter from "./routes/movies-routes.js";
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
