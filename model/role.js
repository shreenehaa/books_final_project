import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const role = sequelize.define("role", {
  // Model attributes are defined here
  roleid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // unique: true,
  },
  rolename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// console.log(Movie === sequelize.models.Movie);

export { role };
