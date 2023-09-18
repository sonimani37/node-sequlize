'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('ultimates', [
      {
        ultimate_name: 'readiness',
        development_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ultimate_name: 'availability',
        development_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ultimate_name: 'development strategy',
        development_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ultimate_name: 'capacity building',
        development_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
