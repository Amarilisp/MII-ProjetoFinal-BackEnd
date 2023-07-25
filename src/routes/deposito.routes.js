const { Router } = require("express");
const {
  createOneDeposito,
  dadosDeposito,
  statusDeposito,
  listDeposito,
  listDepositoid,
  deleteDepositoid,
} = require("../controllers/deposito.controller");
class DepositoRouter {
  routesFromDeposito() {
    // todas as rotas references ao usuario vão aparecer aqui - routesFromUsuario vai pro index
    const depositoRoutes = Router();
    depositoRoutes.post("/depositos", createOneDeposito);
    depositoRoutes.patch("/depositos/:id", dadosDeposito);
    depositoRoutes.patch("/depositos/:id/status", statusDeposito);
    depositoRoutes.get("/depositos", listDeposito);
    depositoRoutes.get("/depositos/:id", listDepositoid);
    depositoRoutes.delete("/depositos/:id", deleteDepositoid);

    return depositoRoutes;
  }
}

module.exports = new DepositoRouter();
