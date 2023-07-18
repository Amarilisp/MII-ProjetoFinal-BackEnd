const { Usuario } = require("../models/usuario");
const jwt = require("jsonwebtoken");

class UsuarioController {
  async createOneUsuario(request, response) {
    try {
      const {
        nome,
        sobrenome,
        genero,
        dataNascimento,
        cpf,
        telefone,
        email,
        senha,
      } = request.body;

      if (!nome) {
        //criar if de campos obrigatorios - devolver erro 400
        return response.status(400).send({ message: "Nome obrigatório" });
      }
      if (!sobrenome) {
        //criar if de campos obrigatorios - devolver erro 400
        return response.status(400).send({ message: "Sobrenome obrigatório" });
      }
      if (!dataNascimento) {
        //criar if de campos obrigatorios - devolver erro 400
        return response
          .status(400)
          .send({ message: "Data de nascimento obrigatório" });
      }
      if (!cpf) {
        //criar if de campos obrigatorios - devolver erro 400
        return response.status(400).send({ message: "CPF obrigatório" });
      }
      if (!email) {
        //criar if de campos obrigatorios - devolver erro 400
        return response.status(400).send({ message: "Email obrigatório" });
      }
      if (!senha) {
        //criar if de campos obrigatorios - devolver erro 400
        return response.status(400).send({ message: "Senha obrigatório" });
      }

      const validaCPF = await Usuario.findOne({
        // chamando a constante e pedindo pra procurar no banco de dados se o CPF já existe.
        where: { cpf },
      });
      //outro if para condições: cpf e email já estão cadastrados
      if (validaCPF) {
        return response.status(409).send({ message: "CPF já cadastrado!" });
      } // se o cpf já existe, retornar o erro.

      const validaEmail = await Usuario.findOne({
        where: { email },
      });
      if (validaEmail) {
        return response.status(409).send({ message: "Email já cadastrado!" });
      }

      const data = await Usuario.create({
        nome,
        sobrenome,
        genero,
        dataNascimento,
        cpf,
        telefone,
        email,
        senha,
      });

      return response.status(201).send({
        data,
        message: "Usuário cadastrado com sucesso!",
      });
    } catch (error) {
      return response
        .status(500)
        .send({ message: "Erro no servidor.", cause: error.message });
    }
  }

  async loginUsuario(request, response) {
    const { email, senha } = request.body;
    try {
      // Verificar se o usuário com o email fornecido existe no sistema
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return response.status(404).json({
          message:
            "E-mail de usuário não encontrado. Você deve criar um login.",
        });
      }

      // Comparação direta da senha fornecida com a senha armazenada
      if (senha !== usuario.senha) {
        return response.status(400).json({ cause: error.message });
      }
      // Gerar um token de autenticação
      const token = jwt.sign(
        {
          id_usuario: usuario,
          email: usuario.email,
        },
        "lab365",
        { expiresIn: "1h" }
      );
      // Retornar a resposta ao cliente com o token
      return response.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return response.status(404).json({ message: "Erro no servidor" });
    }
  }
  async listOneUsuario(request, response) {
    const { id } = request.params;
    const data = await Usuario.findOne({
      where: { id },
      attributes: { exclude: ["senha"] },
    });
    if (!data) {
      return response.status(404).send("Usuário não encontrado.");
    }
    return response.status(200).send(data);
  }
  async updateUsuario(request, response) {
    const { id } = request.params;
    const { nome, sobrenome, genero, telefone } = request.body;
    try {
      // Verifique se o usuário com o identificador fornecido existe no sistema
      const usuario = await Usuario.findOne({ where: { id: id } });
      if (!usuario) {
        return response
          .status(404)
          .json({ message: "Usuário não encontrado." });
      }

      if (!nome || !sobrenome || !telefone || !genero) {
        //criar if de campos obrigatorios - devolver erro 400
        return response.status(400).send({ message: "Campo obrigatório" });
      }
      // Atualize os campos do usuário com os valores fornecidos
      usuario.nome = nome;
      usuario.sobrenome = sobrenome;
      usuario.genero = genero;
      usuario.telefone = telefone;

      await usuario.save();
      // Retorne uma resposta de sucesso com os dados atualizados
      return response
        .status(204)
        .json({ message: "Dados atualizados com sucesso!" });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Erro no servidor" });
    }
  }

  async status(request, response) {
    const { id } = request.params;
    try {
      // Verifique se o usuário com o identificador fornecido existe no sistema
      const usuario = await Usuario.findOne({ where: { id: id } });
      if (!usuario) {
        return response
          .status(404)
          .json({ message: "Usuário não encontrado." });
      }

      if (usuario.status.toLowerCase() === "ativo") {
        usuario.status = "Inativo";
      } else {
        usuario.status = "Ativo";
      }

      await usuario.save();
      // Retorne uma resposta de sucesso com os dados atualizados
      return response
        .status(200)
        .json({ message: "Status alterado com sucesso!" });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Erro no servidor" });
    }
  }

  async senha(request, response) {
    const { id } = request.params;
    const { senha } = request.body;
    try {
      // Verifique se o usuário com o identificador fornecido existe no sistema
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return response
          .status(404)
          .json({ message: "Usuário não encontrado." });
      }
      usuario.senha = senha;

      await Usuario.save();
      // Retorne uma resposta de sucesso com os dados atualizados
      return response
        .status(204)
        .json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      console.log(error.message);
      return response
        .status(400)
        .json({ message: "Erro no servidor", cause: error.message });
    }
  }
}
module.exports = new UsuarioController();
