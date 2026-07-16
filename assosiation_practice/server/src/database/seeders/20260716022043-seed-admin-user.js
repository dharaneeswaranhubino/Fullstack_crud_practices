"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash("Admin@123", 10);

    await queryInterface.bulkInsert("users", [
      {
        firstName: "Super",
        lastname: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        phone: "9876543210",
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: null,
      },
    ]);

    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'admin@gmail.com' LIMIT 1`,
    );
    const adminUserId = users[0].id;

    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'admin' LIMIT 1`,
    );
    const adminRoleId = roles[0].id;

    await queryInterface.bulkInsert("userroles", [
      {
        userId: adminUserId,
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("userroles", null, {});
    await queryInterface.bulkDelete("users", { email: "admin@gmail.com" }, {});
  },
};
