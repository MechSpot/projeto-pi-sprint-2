var express = require("express");
var router = express.Router();

var simularController = require("../controllers/simularController");

//Recebendo os dados do html e direcionando para a função cadastrar de simularController.js
router.post("/sensorSimulado", function (req, res) {
  simularController.simular(req, res);
});

module.exports = router;
