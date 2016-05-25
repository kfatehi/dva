'use strict';



module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Notebooks', [{
        uuid: '44a8b08b-dfd1-4a8e-aca0-7792add06e47',
        isPublic: true,
        name: 'Titanic Story',
        jsonData: JSON.stringify(require('./demos/titanic')),
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        uuid: 'cdc2c9a0-4fc5-452d-99b3-d57c8618c4e8',
        isPublic: true,
        name: 'Student Gradebook',
        jsonData: JSON.stringify(require('./demos/students')),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Notebooks', null, {
      where: {
        isPublic: true
      }
    });
  }
};
