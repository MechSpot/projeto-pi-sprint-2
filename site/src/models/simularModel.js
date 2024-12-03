var database = require("../database/config");

function simular(idOficina, resultado) {
  var instrucaoSql = `
    insert into registro values (default, (select idBoxe + ${parseInt(Math.random() * 10)} from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now())
  `;

  return database.executar(instrucaoSql);
}

module.exports = {
    simular,
}