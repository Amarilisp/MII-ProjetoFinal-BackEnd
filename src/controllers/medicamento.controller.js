const { Medicamento } = require("../models/medicamento");

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
      if (
        !nome_medicamento ||
        !nome_laboratorio ||
        !dosagem ||
        !unidade_da_dosagem ||
        !tipo ||
        !preco_unitario ||
        !quantidade
      ) {
        return response.status(400).send({ message: "Campo Obrigatório" });
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
        unidade_da_dosagem: data.nidade_da_dosagem,
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

  async deleteMedicamento(request, response) {
    const { id } = request.params;
    await Medicamento.destroy({
      where: { id },
    });
    if (!id) {
      return response.status(404).send("Medicamento não encontrado.");
    }
  }
} // final da classe

module.exports = new MedicamentoController();
