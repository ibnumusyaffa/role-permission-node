'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('user', [
        {
          name: 'admin',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123123'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {})
  },
}
