var database = require("../database/config");

function simular(idOficina, resultado) {
  var instrucaoSql = `
    insert into registro values 
    (default, (select idBoxe from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 1 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 2 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 3 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 4 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 5 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 6 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 7 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 8 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now()),
    (default, (select idBoxe + 9 from boxe where fkOficina = ${idOficina} order by idBoxe limit 1), ${resultado}, now());
  `;

  return database.executar(instrucaoSql);
}

module.exports = {
    simular,
}