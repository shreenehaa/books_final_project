import { DataTypes } from "sequelize";
import { sequelize } from "./config.js";

const Movie = sequelize.define("Movie", {
  // Model attributes are defined here
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Poster: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  Rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  Summary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Trailer: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
});
// console.log(Movie === sequelize.models.Movie);
export { Movie };
