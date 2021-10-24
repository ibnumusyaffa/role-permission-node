const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).send({
        message: 'Email tidak ditemukan',
      });
    }

    let is_password_match = await bcrypt.compare(password, user.password);

    if (!is_password_match) {
      return res.status(401).send({
        message: 'Password yang anda masukkan salah',
      });
    }

    const access_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.TOKEN_JWT_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRED,
      }
    );

    return res.json({
      access_token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
