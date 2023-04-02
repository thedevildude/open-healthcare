'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hospital.hasOne(models.Overview, {
        foreignKey: "hospitalID",
        onDelete: "CASCADE"
      })
      Hospital.hasOne(models.Equipments, {
        foreignKey: "hospitalID",
        onDelete: "CASCADE"
      })
    }

    static async addHospital({hospitalName, email, passwordHash, registrationId, address, phone}) {
      return this.create({
        hospitalName,
        email,
        passwordHash,
        registrationId,
        address,
        phone,
        approved: true
      })
    }
  }
  Hospital.init({
    hospitalName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    registrationId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hospital',
  });
  return Hospital;
};