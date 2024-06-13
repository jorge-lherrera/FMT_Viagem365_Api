"use strict";

const Place = require("../../models/Place");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Place.bulkCreate([
      {
        user_id: 1,
        place: "lagoa",
        cityName: "floripa",
        country: "brasil",
        emoji: "BR",
        date: "1999-01-01",
        notes: "123qweqweqweqweqwe",
        latitude: -27.6038933,
        longitude: -48.4837647,
      },
      {
        user_id: 2,
        place: "rio tavares",
        cityName: "floripa",
        country: "brasil",
        emoji: "BR",
        date: "1999-01-01",
        notes: "123qweqweqweqweqwe",
        latitude: -27.6461021,
        longitude: -48.4831188,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const coordinatesToDelete = [
      { latitude: -27.6461021, longitude: -48.4831188 },
      { latitude: -27.6038933, longitude: -48.4837647 },
    ];

    for (const coordinates of coordinatesToDelete) {
      await Place.destroy({
        where: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
      });
    }
  },
};
