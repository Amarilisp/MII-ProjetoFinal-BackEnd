const { Router } = require("express");
const { createOneDeposito } = require("../controllers/deposito.controller");
class DepositoRouter {
  routesFromDeposito() {
    // todas as rotas references ao usuario vão aparecer aqui - routesFromUsuario vai pro index
    const depositoRoutes = Router();
    depositoRoutes.post("/createOneDeposito", createOneDeposito);

    return depositoRoutes;
  }
}

module.exports = new DepositoRouter();
