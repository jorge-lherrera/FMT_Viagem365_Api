const yup = require("yup");
const { Op } = require("sequelize");
const User = require("../models/User");
const Place = require("../models/Place");

const userSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  sex: yup.string().required("O sexo é obrigatório"),
  cpf: yup.string().required("O cpf é obrigatório"),
  address: yup.string().required("O endereço é obrigatório"),
  email: yup.string().required("O email é obrigatório"),
  password: yup.string().required("A senha é obrigatório"),
  //   birthDate: yup.string().required("A data de nascimento é obrigatória"),
});

class UserController {
  async list(req, res) {
    const users = await User.findAll();
    res.json(users);
  }
  async listOne(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: "Não foi possível listar o usuario especificado",
        error: error,
      });
    }
  }

  async listPlaces(req, res) {
    try {
      const { id } = req.params;
      const place = await Place.findAll({
        where: { user_id: id },
      });
      res.json(place);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: "Não foi possível listar o lugares de usuario especificado",
        error: error,
      });
    }
  }

  async register(req, res) {
    try {
      await userSchema.validate(req.body, {
        abortEarly: false,
        strict: true,
      });
      const { name, sex, cpf, address, email, password, birthDate } = req.body;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ cpf: cpf }, { email: email }],
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json("O CPF ou Email inserido já existe. Por favor, escolha outro.");
      }

      if (!birthDate.match(/\d{4}-\d{2}-\d{2}/gm)) {
        return res.status(400).json({
          message: "Formato correto da data de nascimento e ano-mes-dia",
        });
      }

      const user = await User.create({
        name,
        sex,
        cpf,
        address,
        email,
        password,
        birthDate,
      });

      res.status(201).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  }

  async updateOne(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      user.update(req.body);
      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: "Não foi possível atualizar o usuario especificado",
        error: error,
      });
    }
  }

  async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.destroy({
        where: {
          id: id,
        },
      });

      if (!deletedUser) {
        return res.status(404).json({ message: "O usuario não existe" });
      }

      res.status(200).json({ message: "Usuario eliminado com sucesso" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Error ao eliminar o usuario", error: error });
    }
  }
}

module.exports = new UserController();
