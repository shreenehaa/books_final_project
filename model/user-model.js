import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const users_details = sequelize.define("users_details", {
  // Model attributes are defined here
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// console.log(Movie === sequelize.models.Movie);
export { users_details };
