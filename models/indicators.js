'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class indicators extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  indicators.init({
    indicator_name: DataTypes.STRING,
    taxonomy_id: DataTypes.INTEGER,
    indicator_score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'indicators',
  });
  return indicators;
};