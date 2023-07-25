const { connection } = require("../database/connection");

const { STRING, DATE, INTEGER, ENUM, NUMBER, DECIMAL } = require("sequelize");

const Medicamento = connection.define(
  //define declara o modelo inicial
  "medicamento",
  {
    id_usuario: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "usuario" },
        key: "id",
      },
    },
    id_deposito: {
      type: INTEGER,
      references: {
        model: { tableName: "deposito" },
        key: "id",
      },
      allowNull: false,
    },
    nome_medicamento: {
      type: STRING,
      allowNull: false,
      unique: {
        msg: "Nome do medicamento já cadastrado. ",
      },
    },

    nome_laboratorio: {
      type: STRING,
      allowNull: false,
      validade: {
        msg: "É necessário inserir o nome do Laboratório.",
      },
    },

    descricao: {
      type: STRING,
      allowNull: true,
    },

    dosagem: {
      type: DECIMAL,
      allowNull: false,
      validade: {
        msg: "Dosagem é obrigatório.",
      },
    },

    unidade_da_dosagem: {
      type: ENUM("mg", "mcg", "g", "mL", "%", "outro"),
      allowNull: false,
      defaultValue: "mg",
      validade: {
        msg: "Unidade de dosagem é obrigatório.",
      },
    },

    tipo: {
      type: ENUM("Controlado", "Não controlado"),
      allowNull: false,
      defaultValue: "Não controlado",
    },

    preco_unitario: {
      type: NUMBER,
      allowNull: false,
      validade: {
        msg: "Preço do medicamento é obrigatório.",
      },
    },
    quantidade: {
      type: INTEGER,
      allowNull: false,
      validade: {
        msg: "Quantidade é obrigatório.",
      },
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  }
);

Medicamento.associate = (models) => {
  Medicamento.belongsTo(models.deposito, {
    foreignKey: "id_deposito",
    allowNull: false,
  });

  Medicamento.belongsTo(models.usuario, {
    foreignKey: "id_usuario",
    allowNull: false,
  });
};
// Medicamento.belongsToMany(Deposito, { through: Relacionamento });
// Deposito.belongsToMany(Medicamento, { through: Relacionamento });
// Usuario.hasMany(Medicamento);

module.exports = {
  Medicamento,
};
