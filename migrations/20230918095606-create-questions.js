'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_score: {
        type: Sequelize.STRING
      },
      qname_id: {
        type: Sequelize.INTEGER
      },
      country_id: {
        type: Sequelize.INTEGER
      },
      years: {
        type: Sequelize.INTEGER
      },
      governance_id: {
        type: Sequelize.INTEGER
      },
      development_id: {
        type: Sequelize.INTEGER
      },
      ultimate_id: {
        type: Sequelize.INTEGER
      },
      taxonomy_id: {
        type: Sequelize.INTEGER
      },
      indicator_id: {
        type: Sequelize.INTEGER
      },
      actual_score: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      links: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('questions');
  }
};