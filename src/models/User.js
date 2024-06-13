const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const Place = require("./Place");

const User = connection.define("users", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sex: {
    type: DataTypes.ENUM("M", "F"),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Place, {
  foreignKey: "user_id",
  sourceKey: "id",
});

Place.belongsTo(User, {
  foreignKey: "user_id",
  targetId: "id",
});

module.exports = User;
