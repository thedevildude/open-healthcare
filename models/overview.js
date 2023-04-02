'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Overview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Overview.belongsTo(models.Hospital, {
        foreignKey: "hospitalID"
      })
    }

    static async addTotal({ generalBed, icuBed, ventilator, hospitalID }) {
      return this.create({
        hospitalID,
        generalBed,
        icuBed,
        ventilator
      })
    }
  }

  Overview.init({
    hospitalID: DataTypes.INTEGER,
    generalBed: DataTypes.INTEGER,
    occupiedGeneralBed: DataTypes.INTEGER,
    icuBed: DataTypes.INTEGER,
    occupiedIcuBed: DataTypes.INTEGER,
    ventilator: DataTypes.INTEGER,
    occupiedVentilator: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Overview',
  });
  return Overview;
};