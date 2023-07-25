const { Medicamento } = require("../models/medicamento");
const { Usuario } = require("../models/usuario");
const { Deposito } = require("../models/deposito");

class MedicamentoController {
  async createOneMedicamento(request, response) {
    try {
      const {
        id_usuario,
        id_deposito,
        nome_medicamento,
        nome_laboratorio,
        descricao,
        dosagem,
        unidade_da_dosagem,
        tipo,
        preco_unitario,
        quantidade,
      } = request.body;

      if (!id_usuario) {
        return response
          .status(400)
          .json({ message: "ID do usuário é obrigatório." });
      }

      if (!id_deposito) {
        return response
          .status(400)
          .json({ message: "ID do depósito é obrigatório." });
      }

      if (!nome_medicamento) {
        return response
          .status(400)
          .json({ message: "Nome do medicamento é obrigatório." });
      }

      if (!nome_laboratorio) {
        return response
          .status(400)
          .json({ message: "Nome do laboratório é obrigatório." });
      }

      if (!descricao) {
        return response
          .status(400)
          .json({ message: "Descrição é obrigatória." });
      }

      if (!dosagem) {
        return response.status(400).json({ message: "Dosagem é obrigatória." });
      }

      if (!unidade_da_dosagem) {
        return response
          .status(400)
          .json({ message: "Unidade da dosagem é obrigatória." });
      }

      if (!tipo) {
        return response.status(400).json({ message: "Tipo é obrigatório." });
      }

      if (!preco_unitario) {
        return response
          .status(400)
          .json({ message: "Preço unitário é obrigatório." });
      }

      if (!quantidade) {
        return response
          .status(400)
          .json({ message: "Quantidade é obrigatória." });
      }
      const data = await Medicamento.create({
        id_usuario,
        id_deposito,
        nome_medicamento,
        nome_laboratorio,
        descricao,
        dosagem,
        unidade_da_dosagem,
        tipo,
        preco_unitario,
        quantidade,
      });
      return response.status(201).send({
        id: data.id,
        nome_medicamento: data.nome_medicamento,
        nome_laboratorio: data.nome_laboratorio,
        descricao: data.descricao,
        dosagem: data.dosagem,
        unidade_da_dosagem: data.unidade_da_dosagem,
        tipo: data.tipo,
        preco_unitario: data.preco_unitario,
        quantidade: data.quantidade,
      });
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }
  async listMedicamento(request, response) {
    const { nome_do_medicamento } = request.params;
    const data = await Medicamento.findOne({
      where: { nome_do_medicamento },
    });

    return response.status(200).send({ message: "ok", data });
  }

  async listMedicamentoid(request, response) {
    const { id } = request.params;
    const data = await Medicamento.findByPk(id);

    if (!data) {
      return response.status(404).send("Medicamento não encontrado.");
    }
    return response.status(200).send({ message: "ok", data });
  }
  async dadosMedicamento(request, response) {
    const { id } = request.params;
    const { descricao, preco_unitario, quantidade } = request.body;
    try {
      const medicamento = await Medicamento.findOne({ where: { id: id } });

      if (!medicamento) {
        return response
          .status(404)
          .send({ message: "Medicamento não cadastrado." });
      }

      medicamento.descricao = descricao;
      medicamento.preco_unitario = preco_unitario;
      medicamento.quantidade = quantidade;
      await medicamento.save();
      return response.status(200).json(medicamento);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro no servidor" });
    }
  }

  async deleteMedicamento(request, response) {
    try {
      const { id } = request.params;
      const buscaMedicamento = await Medicamento.findByPk(id);
      if (!buscaMedicamento) {
        return response.status(404).send("Medicamento não encontrado.");
      }
      await Medicamento.destroy({
        where: {
          id: id,
        },
      });
      return response.status(204).send();
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro no servidor." });
    }
  }
}

module.exports = new MedicamentoController();
