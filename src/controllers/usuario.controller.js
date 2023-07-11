const { Usuario } = require("../models/usuario");

class UsuarioController {
  async createOneUsuario(request, response) {
    try {
      const {
        nome,
        sobrenome,
        genero,
        dataNascimento,
        CPF,
        telefone,
        email,
        senha,
        status,
      } = request.body;

      const data = await Usuario.create({
        nome,
        sobrenome,
        genero,
        dataNascimento,
        CPF,
        telefone,
        email,
        senha,
        status,
      });

      return response.status(201).send(data);
    } catch (error) {
      console.error(error.message);
      return response.status(400).send;
      {
      }
    }
  }
  async listUsuario(request, response) {
    const data = await Usuario.findAll();

    return response.status(200).send(data);
  }

  async listOneUsuario(request, response) {
    const { id } = request.params;
    const data = await Usuario.findOne({
      where: { id },
      attributes: ["cpf"],
    });

    return response.status(200).send(data);
  }
}
module.exports = new UsuarioController();
