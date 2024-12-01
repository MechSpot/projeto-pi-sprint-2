var relatoriosModel = require("../models/relatoriosModel");

function movimentoDiario(req, res) {
  var idOficina = req.params.idOficina;
  var dataSelecionada = req.params.dataSelecionada;

  relatoriosModel
    .movimentoDiario(idOficina, dataSelecionada)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function movimentoSemanal(req, res) {
  var idOficina = req.params.idOficina;
  var semanaSelecionada = Number(req.params.semanaSelecionada);

  relatoriosModel
    .movimentoSemanal(idOficina, semanaSelecionada)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  movimentoDiario,
  movimentoSemanal,
};
