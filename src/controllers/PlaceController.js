const Place = require("../models/Place");
const User = require("../models/User");
const LoginController = require("./LoginController");

class PlaceController {
  async findAll(req, res) {
    const place = await Place.findAll();
    res.json(place);
  }
  async findOne(req, res) {
    try {
      const { id } = req.params;

      const place = await Place.findByPk(id);

      if (!place) {
        return res.status(404).json({ message: "Local não encontrado!" });
      }

      res.json(place);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: "Não foi possível listar o local especificado",
        error: error,
      });
    }
  }
  async create(req, res) {
    try {
      const {
        user_id,
        place,
        cityName,
        country,
        emoji,
        date,
        notes,
        latitude,
        longitude,
      } = req.body;

      const user = await User.findByPk(user_id);
      if (!user)
        return res.status(404).json({ messagem: "O usuario não existe" });
      const newPlace = await Place.create({
        user_id,
        place,
        cityName,
        country,
        emoji,
        date,
        notes,
        latitude,
        longitude,
      });
      res.status(201).json(newPlace);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensagem: "Não foi possível salvar o local" });
    }
  }

  async updateOne(req, res) {
    try {
      const { id } = req.params;
      const place = await Place.findByPk(id);

      if (!place) {
        return res.status(404).json({ message: "Local não encontrado!" });
      }
      place.update(req.body);
      await place.save();
      res.json(place);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: "Não foi possível atualizar o local especificado",
        error: error,
      });
    }
  }

  async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const deletedPlace = await Place.destroy({
        where: {
          id,
        },
      });

      if (!deletedPlace) {
        return res.status(404).json({ message: "O local não existe" });
      }

      res.status(200).json({ message: "Local eliminado com sucesso" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Error ao eliminar o local", error: error });
    }
  }
}
module.exports = new PlaceController();
