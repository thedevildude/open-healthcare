'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Equipments.belongsTo(models.Hospital, {
        foreignKey: "hospitalID"
      })
    }
  }
  Equipments.init({
    hospitalID: DataTypes.INTEGER,
    aeroMask: DataTypes.INTEGER,
    oCylinder: DataTypes.INTEGER,
    sterilizer: DataTypes.INTEGER,
    defibrillator: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Equipments',
  });
  return Equipments;
};