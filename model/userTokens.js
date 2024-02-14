import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
const userTokens = sequelize.define("userTokens", {
  // Model attributes are defined here
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // unique: true,
  },
  token: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  expiry: {
    type: DataTypes.STRING,
    defaultValue: "no",
  },
});
export { userTokens };
