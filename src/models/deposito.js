const { connection } = require("../database/connection");
const { STRING, DATE, INTEGER, ENUM } = require("sequelize");
const { Usuario } = require("./usuario");
const { Medicamento } = require("./medicamento");

const Deposito = connection.define(
  //define declara o modelo inicial
  "deposito",
  {
    id_usuario: {
      type: INTEGER,
      allowNull: false,
    },

    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    razao_social: {
      type: STRING,
      allowNull: false,
      unique: {
        msg: "Não é possível cadastrar este nome, pois já existe esta Razão Social. ",
      },
    },

    c_n_p_j: {
      type: STRING,
      allowNull: false,
      unique: {
        msg: "Este CNPJ já está cadastrado.",
      },
    },

    nome_fantasia: {
      type: STRING,
      allowNull: true,
    },

    email: {
      type: STRING,
      allowNull: false,
    },

    telefone: {
      type: STRING,
      allowNull: true,
    },

    celular: {
      type: STRING,
      allowNull: false,
    },

    logradouro: {
      type: STRING,
      allowNull: false,
    },
    c_e_p: {
      type: STRING,
      allowNull: false,
    },
    numero: {
      type: STRING,
      allowNull: false,
    },
    bairro: {
      type: STRING,
      allowNull: false,
    },
    cidade: {
      type: STRING,
      allowNull: false,
    },
    estado: {
      type: STRING,
      allowNull: false,
    },
    complemento: {
      type: STRING,
      allowNull: true,
    },
    latitude: {
      type: STRING,
      allowNull: true,
    },
    longitude: {
      type: STRING,
      allowNull: true,
    },
    status: {
      type: ENUM("Ativo", "Inativo"),
      allowNull: false,
      defaultValue: "Ativo",
    },
    created_at: {
      type: DATE,
      allowNull: true,
    },
    updated_at: {
      type: DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
  }
);
module.exports = {
  Deposito,
};
