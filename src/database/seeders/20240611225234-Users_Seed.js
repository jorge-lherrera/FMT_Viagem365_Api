"use strict";

const User = require("../../models/User");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        name: "Jorge test",
        sex: "M",
        cpf: "82141001001",
        address: "my first address",
        email: "test1111@email.com",
        password: "123qwe",
        birthDate: "1999-01-01",
      },
      {
        name: "Pepe test",
        sex: "F",
        cpf: "22710101001",
        address: "my second address",
        email: "asd1111@email.com",
        password: "asdqwe",
        birthDate: "1999-01-01",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({
      email: ["test@email.com", "asd@email.com"],
    });
  },
};
