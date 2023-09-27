'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questionNames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      questionNames.hasMany(models.questions, { foreignKey: 'qname_id', as: 'questions' });
    }
  }
  questionNames.init({
    question_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'questionNames',
  });
  return questionNames;
};
