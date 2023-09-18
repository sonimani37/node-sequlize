'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ultimates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ultimates.init({
    ultimate_name: DataTypes.STRING,
    development_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ultimates',
  });
  return ultimates;
};