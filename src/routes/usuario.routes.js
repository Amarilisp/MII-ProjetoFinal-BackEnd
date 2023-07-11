const { Router } = require("express");
const { createOneUsuario } = require("../controllers/usuario.controller");

class UsuarioRoutes {
  routesFromUsuario() {
    const usuarioroutes = Router();
    usuarioroutes.post("/createOneUsuario", createOneUsuario);
    //UsuarioRoutes.get("/listUsuario/:offset/:limit", listUsuario);
    // UsuarioRoutes.get("./listOneusuario/:id", listOneUsuario);
    // UsuarioRoutes.patch("./updateOneUsuario/:id", updateOneUsuario);
    // UsuarioRoutes.delete("./deleteOneUsuario/:id", deleteUsuario);

    return usuarioroutes;
  }
}
module.exports = new UsuarioRoutes();
