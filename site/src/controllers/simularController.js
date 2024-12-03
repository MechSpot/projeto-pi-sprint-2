var simularModel = require("../models/simularModel");

function simular(req, res) {
    var idOficina = req.body.idOficina;
    var resultado = req.body.resultado;
  if (idOficina == undefined) {
    res.status(400).send("Seu cnpj está undefined!");
  } else {
    simularModel
      .simular(
        idOficina,
        resultado
        )

      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  simular,
}