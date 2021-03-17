const { Usuario } = require("../models");
const Bcrypt = require("bcrypt");

const authController = {
  create: (_req, res) => {
    return res.render("auth/login");
  },
  store: async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (!usuario) {
      return res.send("Usuário ou senha inválidos");
    }
    const resultado = Bcrypt.compareSync(password, usuario.senha);

    if (!resultado) {
      return res.send("Usuário ou senha inválidos");
    }

    req.session.user = {
      id: usuario.id,
      nome: usuario.nome,
    }

    return res.redirect("/home");
  },
};

module.exports = authController;