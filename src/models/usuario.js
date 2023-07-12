const { connection } = require("../database/connection");
const { STRING, DATE, INTEGER, ENUM } = require("sequelize");
const Usuario = connection.define(
  //define declara o modelo inicial
  "usuario",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: "Nome precisa ter entre 02 e 20 caracteres.",
        },
      },
    },

    sobrenome: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 20],
          msg: "Sobrenome precisa ter no mínimo 02 e máximo 20 caracteres.",
        },
      },
    },

    genero: {
      type: STRING,
      allowNull: true,
    },

    dataNascimento: {
      type: DATE,
      allowNull: false,
    },

    CPF: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [11, 11],
          msg: "CPF deve ter 11 dígitos.",
        },
      },
    },
    telefone: {
      type: STRING,
      allowNull: true,
    },

    email: {
      type: STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    senha: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 12],
          msg: "Senha precisa ter entre 08 e 12 caracteres, sendo no mínimo 1 letra maiúscula, mínimo 1 número e mínimo 1 caracter especial.",
        },
      },
    },
    status: {
      type: ENUM("Ativo", "Inativo"),
      allowNull: false,
      defaultValue: "Ativo",
    },

    createdAt: {
      type: DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  }
);

module.exports = {
  Usuario,
};
