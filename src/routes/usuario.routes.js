const { Router } = require("express");
const {
  createOneUsuario,
  listOneUsuario,
} = require("../controllers/usuario.controller");

class UsuarioRouter {
  routesFromUsuario() {
    // todas as rotas references ao usuario vão aparecer aqui - routesFromUsuario vai pro index
    const usuarioRoutes = Router();
    usuarioRoutes.post("/createOneUsuario", createOneUsuario),
      usuarioRoutes.get("/listOneUsuario/:id", listOneUsuario);

    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
