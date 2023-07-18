const { Usuario } = require("./usuario");
const { Deposito } = require("./deposito");
const { Medicamento } = require("./medicamento");

// relacionamento entre usuario e deposito - um pra muitos
Deposito.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Deposito, { foreignKey: "id_usuario" });

// relacionamento entre deposito e medicamento - um pra muitos
Medicamento.belongsTo(Deposito, { foreignKey: "id_deposito" });
Deposito.hasMany(Medicamento, { foreignKey: "id_deposito" });

// relacionamento entre usuario e medicamento - um pra muitos
Medicamento.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Medicamento, { foreignKey: "id_usuario" });
