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
      validade: {
        msg: "Data de nascimento é obrigatório.",
      },
    },

    cpf: {
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
      validade: {
        msg: "Email é obrigatório.",
      },
    },

    senha: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 12],
          msg: "A senha deve conter de 8 a 12 caracteres.",
        },
        is: {
          args: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          msg: "A senha deve conter uma letra maiúscula, um número e um caractere especial.",
        },
      },
    },
    status: {
      type: ENUM("Ativo", "Inativo"),
      allowNull: false,
      defaultValue: "Ativo",
      validade: {
        msg: "Status é obrigatório.",
      },
    },

    createdAt: DATE,
    updatedAt: DATE,
    deletedAt: DATE,
  },
  {
    freezeTableName: true,
    underscored: true,
    paranoid: true,
  }
);
Usuario.associate = (models) => {
  Usuario.hasMany(models.Medicamento, {
    foreignKey: "id_usuario",
    allowNull: false,
  });

  Usuario.belongsTo(models.Deposito, {
    foreignKey: "id_deposito",
    allowNull: false,
  });
};
module.exports = {
  Usuario,
};
