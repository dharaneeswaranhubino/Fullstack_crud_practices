"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles WHERE name IN ('admin', 'user')`,
    );
    const [permissions] = await queryInterface.sequelize.query(
      `SELECT id, name FROM permissions`,
    );

    const roleMap = {};
    roles.forEach((r) => {
      roleMap[r.name] = r.id;
    });

    const permMap = {};
    permissions.forEach((p) => {
      permMap[p.name] = p.id;
    });

    const adminPermission = [
      "view:user",
      "create:user",
      "edit:user",
      "delete:user",
      "view:role",
      "create:role",
      "edit:role",
      "delete:role",
      "assign:role",
    ].map((name) => ({
      roleId: roleMap["admin"],
      permissionId: permMap[name],
      createdAt: new Date(),
      updatedAt: null,
    }));

    const userPermission = ["view:user"].map((name) => ({
      roleId: roleMap["user"],
      permissionId: permMap[name],
      createdAt: new Date(),
      updatedAt: null,
    }));

    await queryInterface.bulkInsert("rolepermissions", [
      ...adminPermission,
      ...userPermission,
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rolepermissions", null, {});
  },
};
