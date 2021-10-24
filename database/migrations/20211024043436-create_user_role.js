'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });

    await queryInterface.addConstraint('user_role', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_role_user_id',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });


    await queryInterface.addConstraint('user_role', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_user_role_role_id',
      references: {
        table: 'role',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

  

    queryInterface.addConstraint('user_role', {
      fields: ['user_id', 'role_id'],
      type: 'unique',
      name: 'unique_user_id_role_id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_role');
  },
};
