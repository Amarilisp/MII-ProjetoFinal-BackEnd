const {
  createOneUsuario,
  listOneUsuario,
  loginUsuario,
  updateUsuario,
  status,
  senha,
} = require("../controllers/usuario.controller");
const { Router } = require("express");

class UsuarioRouter {
  routesFromUsuario() {
    // todas as rotas references ao usuario vão aparecer aqui - routesFromUsuario vai pro index
    const usuarioRoutes = Router();
    usuarioRoutes.post("/usuario", createOneUsuario);
    usuarioRoutes.get("/usuario/:id", listOneUsuario);
    usuarioRoutes.post("/usuario/login", loginUsuario);
    usuarioRoutes.patch("/usuario/:id", updateUsuario);
    usuarioRoutes.patch("/usuario/:id/status", status);
    usuarioRoutes.patch("/usuario/:id/senha", senha);

    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
