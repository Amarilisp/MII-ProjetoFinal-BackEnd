const { Usuario } = require("../models/usuario");

class UsuarioController {
  async createOneUsuario(request, response) {
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

    if (!nome || !sobrenome || !dataNascimento || !CPF || !email || !senha) {
      //criar if de campos obrigatorios - devolver erro 400
      return response.status(400).send({ message: "Campo obrigatório" });
    }

    const validaCPF = await Usuario.findOne({
      // chamando a constante e pedindo pra procurar no banco de dados se o CPF já existe.
      where: { CPF },
    });
    //outro if para condições: cpf e email já estão cadastrados
    if (validaCPF) {
      return response.status(409).send({ message: "CPF já cadastrado!" });
    } // se o cpf já existe, retornar o erro.

    const validaEmail = await Usuario.findOne({
      where: { email },
    });
    if (validaEmail) {
      return response.status(409).send({ message: "Email já cadastrado!" });
    }

    const date = await Usuario.create({
      nome,
      sobrenome,
      genero,
      dataNascimento,
      CPF,
      telefone,
      email,
      senha,
      status: "Ativo",
    });

    return response.status(201).send({
      id: date.id,
      nome: date.nome,
      sobrenome: date.sobrenome,
      CPF: date.CPF,
      genero: date.genero,
      dataNascimento: date.dataNascimento,
      telefone: date.telefone,
      email: date.email,
      senha: date.senha,
      status: date.status,
    });
  }

  // criar o login usuario

  async listOneUsuario(request, response) {
    const { id } = request.params;
    const data = await Usuario.findOne({
      where: { id },
      attributes: { exclude: ["senha"] },
    });
    if (!data) {
      return response.status(404).send("Usuário não encontrado.");
    }
    return response.status(200).send(data);
  }
}
module.exports = new UsuarioController();
