const { Deposito } = require("../models/deposito");
const { Medicamento } = require("../models/medicamento");
const jwt = require("jsonwebtoken");

class DepositoController {
  async createOneDeposito(request, response) {
    try {
      const {
        id_usuario,
        razao_social,
        cnpj,
        nome_fantasia,
        email,
        telefone,
        celular,
        endereco,
        cep,
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
        !cnpj ||
        !nome_fantasia ||
        !celular ||
        !cep ||
        !logradouro ||
        !numero ||
        !bairro ||
        !cidade ||
        !estado
      ) {
        return response.status(400).send({ message: "Campo obrigatório" });
      }

      const data = await Deposito.create({
        id_usuario,
        razao_social,
        cnpj,
        nome_fantasia,
        celular,
        endereco,
        email,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        status: "Ativo",
      });

      return response.status(201).send({
        id: data.id,

        razao_social: data.razao_social,
        cnpj: data.cnpj,
        nome_fantasia: data.nome_fantasia,
        email: data.email,
        celular: data.celular,
        telefone: data.telefone,
        endereco: data.endereco,
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        status: data.status,
      });
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }
  async dadosDeposito(request, response) {
    const { id } = request.params;
    const { nome_fantasia, email, celular, endereco, telefone } = request.body;

    try {
      const deposito = await Deposito.findOne({
        where: { id: id },
      });
      if (!deposito) {
        return response
          .status(404)
          .send({ message: "Usuário não encontrado." });
      }

      if (!nome_fantasia) {
        return response
          .status(400)
          .send({ message: "Nome Fantasia é obrigatório!" });
      }
      if (!celular) {
        return response.status(400).send({ message: "Celular é obrigatório!" });
      }
      if (!endereco) {
        return response
          .status(400)
          .send({ message: "Endereço é obrigatório!" });
      }
      if (!telefone) {
        return response
          .status(400)
          .send({ message: "Telefone é obrigatório!" });
      }
      if (!email) {
        return response.status(400).send({ message: "Email é obrigatório!" });
      }

      deposito.nome_fantasia = nome_fantasia;
      deposito.email = email;
      deposito.telefone = telefone;
      deposito.celular = celular;
      deposito.endereco = endereco;

      await deposito.save();
      return response.status(204).send(deposito);
    } catch (error) {
      console.log(error);
      return response.status(500).send({
        message: "Erro no servidor",
        cause: "Atualização não pode ser concluída.",
      });
    }
  }

  async statusDeposito(request, response) {
    const { id } = request.params;

    try {
      // Verifique se o depósito com o identificador fornecido existe no sistema
      const deposito = await Deposito.findOne({ where: { id: id } });
      if (!deposito) {
        return response
          .status(404)
          .json({ message: "Depósito não encontrado." });
      }

      if (deposito.status.toLowerCase() === "ativo") {
        deposito.status = "Inativo";
      } else {
        deposito.status = "Ativo";
      }

      await deposito.save();

      return response
        .status(200)
        .json({ message: "Status alterado com sucesso!" });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro no servidor." });
    }
  }

  async listDepositoid(request, response) {
    const { id } = request.params;

    try {
      const deposito = await Deposito.findOne({
        where: { id },
      });

      if (!deposito) {
        return response
          .status(404)
          .json({ message: "Depósito não encontrado." });
      }

      return response.status(200).json(deposito);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro no servidor." });
    }
  }

  async listDeposito(request, response) {
    const { status } = request.query;

    try {
      let depositos;

      if (status) {
        depositos = await Deposito.findAll({ where: { status } });
      } else {
        depositos = await Deposito.findAll();
      }

      return response.status(200).json(depositos);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro no servidor." });
    }
  }

  async deleteDepositoid(request, response) {
    const { id } = request.params;

    try {
      // Verificar se o depósito com o identificador fornecido existe no sistema
      const deposito = await Deposito.findByPk(id);

      if (!deposito) {
        return response
          .status(404)
          .json({ message: "Depósito não encontrado." });
      }

      // Verificar se há medicamentos armazenados no depósito
      const medicamentos = await Medicamento.findAll({
        where: { id_deposito: id },
      });
      if (medicamentos.length > 0) {
        return response.status(400).json({
          message:
            "Não é possível excluir o depósito. Há medicamentos armazenados nele.",
        });
      }

      // Verificar se o depósito está com status 'Inativo'
      if (deposito.status !== "Inativo") {
        return response.status(400).json({
          message:
            "Não é possível excluir o depósito. O status deve ser 'Inativo'.",
        });
      }

      // Exclusão lógica do depósito
      await deposito.destroy();

      return response.status(204).send();
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro no servidor." });
    }
  }
}

module.exports = new DepositoController();
