'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  questions.init({
    question_score: DataTypes.STRING,
    qname_id: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER,
    years: DataTypes.INTEGER,
    governance_id: DataTypes.INTEGER,
    development_id: DataTypes.INTEGER,
    ultimate_id: DataTypes.INTEGER,
    taxonomy_id: DataTypes.INTEGER,
    indicator_id: DataTypes.INTEGER,
    actual_score: DataTypes.INTEGER,
    status: DataTypes.STRING,
    links: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'questions',
  });
  return questions;
};