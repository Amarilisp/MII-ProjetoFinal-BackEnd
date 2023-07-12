const { Router } = require("express");
const {
  createOneUsuario,
  listOneUsuario,
  loginUsuario,
  updateUsuario,
} = require("../controllers/usuario.controller");
class UsuarioRouter {
  routesFromUsuario() {
    // todas as rotas references ao usuario vão aparecer aqui - routesFromUsuario vai pro index
    const usuarioRoutes = Router();
    usuarioRoutes.post("/createOneUsuario", createOneUsuario),
      usuarioRoutes.get("/listOneUsuario/:id", listOneUsuario);
    usuarioRoutes.post("/loginUsuario", loginUsuario);
    usuarioRoutes.patch("/updateUsuario/:id", updateUsuario);

    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
