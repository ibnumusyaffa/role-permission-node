var jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_JWT_SECRET, async (err, auth) => {
          if (err) {
            return res.status(401).send({
              message: err.message || 'Login session is invalid',
            });
          }

          const user = await User.findOne({
            where: { email: auth.email },
          });

          req.user = user;
          next();
        });
      } else {
        return res.status(401).send({
          message: 'unauthorized access',
        });
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authMiddleware;
