'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Overviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hospitalID: {
        type: Sequelize.INTEGER
      },
      generalBed: {
        type: Sequelize.INTEGER
      },
      occupiedGeneralBed: {
        type: Sequelize.INTEGER
      },
      icuBed: {
        type: Sequelize.INTEGER
      },
      occupiedIcuBed: {
        type: Sequelize.INTEGER
      },
      ventilator: {
        type: Sequelize.INTEGER
      },
      occupiedVentilator: {
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
    await queryInterface.dropTable('Overviews');
  }
};