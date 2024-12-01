var express = require("express");
var router = express.Router();

var relatoriosController = require("../controllers/relatoriosController");

router.get("/movimentoDiario/:dataSelecionada/:idOficina", function (req, res) {
  relatoriosController.movimentoDiario(req, res);
});

router.get("/movimentoSemanal/:semanaSelecionada/:idOficina", function (req, res) {
  relatoriosController.movimentoSemanal(req, res);
});

module.exports = router;