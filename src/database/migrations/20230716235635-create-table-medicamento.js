"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medicamento", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "usuario" },
          key: "id",
        },
      },
      id_deposito: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "deposito" },
          key: "id",
        },
        allowNull: false,
      },
      nome_medicamento: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nome_laboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dosagem: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      unidade_da_dosagem: {
        type: Sequelize.ENUM("mg", "mcg", "g", "mL", "%", "outro"),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM("Controlado", "Não controlado"),
        allowNull: false,
      },
      preco_unitario: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medicamento");
  },
};
