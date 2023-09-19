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
        type: Sequelize.INTEGER,
        references:{
            model:'questionNames',
            key:'id'
        }
      },
      country_id: {
        type: Sequelize.INTEGER,
        references:{
            model:'countries',
            key:'id'
        }
      },
      years: {
        type: Sequelize.INTEGER
      },
      governance_id: {
        type: Sequelize.INTEGER,
        references:{
            model:'governances',
            key:'id'
        }
      },
      development_id: {
        type: Sequelize.INTEGER,
        references:{
            model:'developments',
            key:'id'
        }
      },
      ultimate_id: {
        type: Sequelize.INTEGER,
        references:{
            model:'ultimates',
            key:'id'
        }
      },
      taxonomy_id: {
        type: Sequelize.INTEGER,
        references:{
            model:'taxonomies',
            key:'id'
        }
      },
      indicator_id: {
        type: Sequelize.INTEGER,
        references:{
            model:'indicators',
            key:'id'
        }
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
