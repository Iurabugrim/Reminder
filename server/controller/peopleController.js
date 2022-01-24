const ApiError = require("../Error/ApiError");
const { People } = require('../model/model');

class PeopleController {
  async create(req, res, next) {
    const {id} = req.user
    const { name, data} = req.body;
    const file = req.file;
    const people = await People.create({name, data, userId: id, img: file.filename})
    return res.json(people)
  }

  async getAll(req, res, next) {
    const {id} = req.user
    const people = await People.findAll({where: {userId: id}})
    return res.json(people)
  }

  async delete(req, res, next) {
    const id = Number(req.params.id)
    await People.destroy({where: {id}})
    return res.json(id)
  }
}

module.exports = new PeopleController();
