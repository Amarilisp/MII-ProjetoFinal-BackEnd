class MedicamentoController {
  async createOneMedicamento(request, response) {
    try {
      const {
        id,
        id_medicamento,
        id_usuario,
        nome_do_medicamento,
        nome_do_laboratorio,
        descricao,
        dosagem,
        unidade_da_dosagem,
        tipo,
        preco_unitario,
        quantidade,
      } = request.body;
      if (
        !nome_do_medicamento ||
        !nome_do_laboratorio ||
        !dosagem ||
        !unidade_da_dosagem ||
        !tipo ||
        !preco_unitario ||
        !quantidade
      ) {
        return response.status(400).send({ message: "Campo Obrigatório" });
      }
      const date = await Medicamento.create({
        id_medicamento,
        id_usuario,
        nome_do_medicamento,
        nome_do_laboratorio,
        descricao,
        dosagem,
        unidade_da_dosagem,
        tipo,
        preco_unitario,
        quantidade,
      });
      return response.status(201).send({
        id: date.id,
        nome_do_medicamento: date.nome_do_medicamento,
        nome_do_laboratorio: date.nome_do_laboratorio,
        descricao: date.descricao,
        dosagem: date.dosagem,
        unidade_da_dosagem: date.nidade_da_dosagem,
        tipo: date.tipo,
        preco_unitario: date.preco_unitario,
        quantidade: date.quantidade,
      });
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }
}

module.exports = new MedicamentoController();
