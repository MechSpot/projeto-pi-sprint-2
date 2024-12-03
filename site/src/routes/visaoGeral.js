var express = require("express");
var router = express.Router();

var visaoGeralController = require("../controllers/visaoGeralController");

router.get("/resultadoDisplay/:idOficina", function (req, res) {
  visaoGeralController.resultadoDisplay(req, res);
});

router.get("/sensoresTotais/:idOficina", function (req, res) {
  visaoGeralController.sensoresTotais(req, res);
});

router.get("/boxesVazio/:idOficina", function (req, res) {
  visaoGeralController.boxesVazio(req, res);
});

router.get("/fluxoDiario/:idOficina", function (req, res) {
  visaoGeralController.fluxoDiario(req, res);
});

router.get("/mediaUso/:idOficina", function (req, res) {
  visaoGeralController.mediaUso(req, res);
});

router.get("/mediaRotatividade/:idOficina", function (req, res) {
  visaoGeralController.mediaRotatividade(req, res);
});

router.get("/vagaMenosUsada/:idOficina", function (req, res) {
  visaoGeralController.vagaMenosUsada(req, res);
});

router.get("/movimentoVaga/:idOficina/:idBoxe", function (req, res) {
  visaoGeralController.movimentoVaga(req, res);
});

module.exports = router;
