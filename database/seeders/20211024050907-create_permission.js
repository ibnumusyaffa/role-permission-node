'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('permission', [
      {
        group: 'article',
        name: 'create article',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'article',
        name: 'read article',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'article',
        name: 'delete article',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'article',
        name: 'update article',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'article',
        name: 'publish article',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        group: 'user',
        name: 'create user',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'user',
        name: 'read user',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'user',
        name: 'delete user',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'user',
        name: 'update user',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'user',
        name: 'change user password',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group: 'user',
        name: 'disable user',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permission', null, {});
  },
};
