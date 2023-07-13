const { Deposito } = require("../models/deposito");
const jwt = require("jsonwebtoken");

class DepositoController {
  async createOneDeposito(request, response) {
    try {
      const {
        id_usuario,
        razao_social,
        c_n_p_j,
        nome_fantasia,
        email,
        telefone,
        celular,
        endereco,
        c_e_p,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        complemento,
        latitude,
        longitude,
        status,
      } = request.body;

      if (
        !razao_social ||
        !c_n_p_j ||
        !nome_fantasia ||
        !celular ||
        !c_e_p ||
        !logradouro ||
        !numero ||
        !bairro ||
        !cidade ||
        !estado
      ) {
        return response.status(400).send({ message: "Campo obrigatório" });
      }

      const date = await Deposito.create({
        id_usuario,
        razao_social,
        c_n_p_j,
        nome_fantasia,
        celular,
        endereco,
        email,
        c_e_p,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        status: "Ativo",
      });

      return response.status(201).send({
        id_usuario: date.id_usuario,
        id: date.id,
        razao_social: date.razao_social,
        c_n_p_j: date.c_n_p_j,
        nome_fantasia: date.nome_fantasia,
        celular: date.celular,
        endereco: date.endereco,
        c_e_p: date.c_e_p,
        logradouro: date.logradouro,
        numero: date.numero,
        bairro: date.bairro,
        cidade: date.cidade,
        estado: date.estado,
        status: date.status,
      });
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }
}

module.exports = new DepositoController();
