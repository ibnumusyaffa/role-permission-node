const { User } = require('../models');

// const Sequelize = require('sequelize');

exports.list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * perPage;

    const options = {
      limit: perPage,
      offset: offset,
      order: [],
    };

    const sort_by = req.query.sort_by ? req.query.sort_by : 'created_at';
    const order_by = req.query.order_by ? req.query.order_by : 'desc';
    options.order.push([sort_by, order_by]);

    const users = await User.findAndCountAll(options);
    if (users.rows.length < 1) {
      return res.status(200).send({
        data: [],
        message: 'Data tidak ditemukan',
      });
    }

    const totalPage = Math.ceil(users.count / perPage);

    const meta = {
      per_page: perPage,
      current_page: page,
      last_page: totalPage,
      total: users.count,
    };
    return res.send({ meta: meta, data: users.rows });
  } catch (error) {
    next(error);
  }
};

exports.detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = {
      where: { id },
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

exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await User.create(data);

    return res.status(201).send({
      message: 'Data berhasil disimpan',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;

    const options = {
      where: { id },
    };
    const user = await User.findOne(options);

    if (!user) {
      return res.status(404).send({
        message: 'Data tidak ditemukan',
      });
    }
    const data = req.body;

    await User.update(data, options);

    return res.status(202).send({
      message: 'Berhasil diubah',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const options = {
      where: { id },
    };
    const user = await User.findOne(options);

    if (!user) {
      return res.status(404).send({
        message: 'Data tidak ditemukan',
      });
    }

    await User.destroy({
      where: { id: id },
    });

    return res.status(200).send({
      message: 'user berhasil dihapus',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};
