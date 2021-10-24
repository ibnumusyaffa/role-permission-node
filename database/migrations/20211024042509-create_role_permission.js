'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permission', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      permission_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
    await queryInterface.addConstraint('role_permission', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_role_permission_role_id',
      references: {
        table: 'role',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('role_permission', {
      fields: ['permission_id'],
      type: 'foreign key',
      name: 'fk_role_permission_permission_id',
      references: {
        table: 'permission',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    queryInterface.addConstraint('role_permission', {
      fields: ['role_id', 'permission_id'],
      type: 'unique',
      name: 'unique_role_id_permission_id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('role_permission');
  },
};
