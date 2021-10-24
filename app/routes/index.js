module.exports = (app) => {
  const router = require('express').Router();
  const user = require('../controllers/userController');

  router.get('/', user.detail);

  app.use(router);
};
