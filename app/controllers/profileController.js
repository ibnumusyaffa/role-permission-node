const { User } = require('../models');

exports.index = async (req, res, next) => {
  try {
    const id = req.user.id;
    const options = {
      where: { id },
      attributes: { exclude: ['password'] },
      // include: [
      //   {
      //     model: UserPersonalityType,
      //     as: 'personality',
      //     attributes: ['user_id', 'personality_type_id'],
      //     include: ['type'],
      //   },
      // ],
    };
    const user = await User.findOne(options);
    if (!user) {
      return res.status(200).send({
        message: 'Data tidak ditemukan',
      });
    }

    return res.send({ data: user });
  } catch (error) {
    next(error);
  }
};
