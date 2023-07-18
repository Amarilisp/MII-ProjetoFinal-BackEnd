const { Deposito } = require("../models/deposito");
const { Usuario } = require("../models/usuario");
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
        id: date.id,

        razao_social: date.razao_social,
        c_n_p_j: date.c_n_p_j,
        nome_fantasia: date.nome_fantasia,
        email: date.email,
        celular: date.celular,
        telefone: date.telefone,
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
  async dadosDeposito(request, response) {
    const { id } = request.params;
    const { nome_fantasia, email, celular, endereco, telefone, logradouro } =
      request.body;

    try {
      const deposito = await Deposito.findOne({
        where: { id: id },
      });
      if (!deposito) {
        return response
          .status(404)
          .send({ message: "Usuário não encontrado." });
      }

      if (
        !nome_fantasia ||
        !celular ||
        !endereco ||
        !telefone ||
        !logradouro ||
        email
      ) {
        return response.status(400).send({ message: "Campo obgrigatório." });
      }

      deposito.nome_fantasia = nome_fantasia;
      deposito.celular = celular;
      deposito.endereco = endereco;
      deposito.c_e_p = c_e_p;
      deposito.logradouro = logradouro;
      deposito.numero = numero;
      deposito.bairro = bairro;
      deposito.cidade = cidade;
      deposito.estado = estado;
      deposito.status = status;

      await Usuario.save();
      return response.status(204).send(Usuario);
    } catch (error) {
      console.log(error);
      return response.status(500).send({
        message: "Erro no servidor",
        cause: "Atualização não pode ser concluída.",
      });
    }
  }

  async deleteDeposito(request, response) {
    const { id_deposito } = request.params;

    try {
      // Verificar se o depósito com o id existe no sistema
      const deposito = await Deposito.findByPk(id_deposito);
      if (!deposito) {
        return response
          .status(404)
          .json({ message: "Depósito não encontrado." });
      }

      // Remover o depósito
      await deposito.destroy();

      return response
        .status(200)
        .json({ message: "Depósito removido com sucesso." });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro no servidor." });
    }
  }
}

module.exports = new DepositoController();
