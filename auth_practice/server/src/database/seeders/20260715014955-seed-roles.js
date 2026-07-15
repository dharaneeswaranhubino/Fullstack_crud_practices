"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        role: "user",
        description: "Default role assign for all registered user",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        role: "admin",
        description: "Administrator with elevated privileges",
        createdAt: new Date(),
        updatedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
