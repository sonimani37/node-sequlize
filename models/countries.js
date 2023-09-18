'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class countries extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    countries.init({
        country_name: DataTypes.STRING,
        iso_code: DataTypes.STRING,
        lat: DataTypes.STRING,
        lng: DataTypes.STRING,
        flag: DataTypes.STRING,
        year: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'countries',
    });
    return countries;
};