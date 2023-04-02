'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hospitalID: {
        type: Sequelize.INTEGER
      },
      aeroMask: {
        type: Sequelize.INTEGER
      },
      oCylinder: {
        type: Sequelize.INTEGER
      },
      sterilizer: {
        type: Sequelize.INTEGER
      },
      defibrillator: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Equipments');
  }
};