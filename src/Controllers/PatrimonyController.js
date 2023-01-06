const moment = require('moment-timezone');
const Patrimony = require('../Models/PatrimonySchema');
const validation = require('../Utils/validate');

// ROTAS

const getAll = async (req, res) => {
  const patrimonies = await Patrimony.find();
  return res.json(patrimonies);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const patrimony = await Patrimony.findById(id);
    return res.json(patrimony);
  } catch {
    return res.status(400).json({ error: 'Invalid id' });
  }
};

const createPatrimony = async (req, res) => {
  const {
    name, description, image,
  } = req.body;

  const errorMessage = validation.validate(name, description);

  if (errorMessage.length) {
    return res.status(400).json({ error: errorMessage });
  }
  try {
    const patrimony = await Patrimony.create({
      name,
      description,
      image,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });

    return res.status(200).json(patrimony);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  getAll,
  getOne,
  createPatrimony,
};
