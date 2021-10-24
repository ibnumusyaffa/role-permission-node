'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
      });

      this.belongsTo(models.Permission, {
        foreignKey: 'permission_id',
        as: 'permission',
      });
    }
  }
  RolePermission.init(
    {
      role_id: DataTypes.INTEGER,
      permission_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'RolePermission',
      tableName: 'v2_package_order_items',
      timestamps: false,
    }
  );
  return RolePermission;
};
