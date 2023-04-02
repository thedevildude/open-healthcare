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

    static async addOccupancy({ occupiedGeneralBed, occupiedIcuBed, occupiedVentilator, hospitalID }) {
      return this.create({
        hospitalID,
        occupiedGeneralBed,
        occupiedIcuBed,
        occupiedVentilator
      })
    }

    static async updateGeneralBed({ generalBed, hospitalID }) {
      return this.update({generalBed}, {
        where: {
          hospitalID
        }
      })
    }

    static async updateIcuBed({ icuBed, hospitalID }) {
      return this.update({icuBed}, {
        where: {
          hospitalID
        }
      })
    }

    static async updateVentilator({ ventilator, hospitalID }) {
      return this.update({ventilator}, {
        where: {
          hospitalID
        }
      })
    }

    static async updateOccupiedGeneralBed({ occupiedGeneralBed, hospitalID }) {
      return this.update({occupiedGeneralBed}, {
        where: {
          hospitalID
        }
      })
    }

    static async updateOccupiedIcuBed({ occupiedIcuBed, hospitalID }) {
      return this.update({occupiedIcuBed}, {
        where: {
          hospitalID
        }
      })
    }

    static async updateOccupiedVentilator({ occupiedVentilator, hospitalID }) {
      return this.update({occupiedVentilator}, {
        where: {
          hospitalID
        }
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