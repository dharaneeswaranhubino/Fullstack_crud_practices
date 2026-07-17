'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("permissions",[
      {
        name: "view:user",
        description: "View all users",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "create:user",
        description: "Create a user",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "edit:user",
        description: "Edit a user",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "delete:user",
        description: "Delete a user",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "view:role",
        description: "View all roles",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "create:role",
        description: "Create a role",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "edit:role",
        description: "Edit a role",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "delete:role",
        description: "Delete a role",
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        name: "assign:role",
        description: "Assign role to user",
        createdAt: new Date(),
        updatedAt: null,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions",null,{})
  }
};