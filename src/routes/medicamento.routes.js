const { Router } = require("express");
const {
  createOneMedicamento,
  listMedicamento,
  listMedicamentoid,
  deleteMedicamento,
  dadosMedicamento,
} = require("../controllers/medicamento.controller");

class MedicamentoRouter {
  routesFromMedicamento() {
    const medicamentoRoutes = Router();
    medicamentoRoutes.post("/medicamentos", createOneMedicamento);
    medicamentoRoutes.get("/medicamentos", listMedicamento);
    medicamentoRoutes.get("/medicamentos/:id", listMedicamentoid);
    medicamentoRoutes.delete("/medicamentos/:id", deleteMedicamento);
    medicamentoRoutes.patch("/medicamentos/:id", dadosMedicamento);
    return medicamentoRoutes;
  }
}
module.exports = new MedicamentoRouter();
