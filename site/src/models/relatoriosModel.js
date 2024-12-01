var database = require("../database/config");

function movimentoDiario(idOficina, dataSelecionada) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
          select sum(res.resultado) movimentoDiario, hour(res.dtHora) hora from (select * from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = ${idOficina} and dtHora like '${dataSelecionada}%') res group by hour(res.dtHora) order by hour(dtHora);
      `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function movimentoSemanal(idOficina, semanaSelecionada) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
          select  week(res.dtHora) semana, dayname(res.dtHora) diaSemana, dayofweek(res.dtHora) dia, sum(res.resultado) movimentoSemanal FROM (select * from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = ${idOficina}) res where week(res.dtHora) = week(date_sub(now(), interval ${semanaSelecionada} week)) group by week(res.dtHora), dayname(res.dtHora), dayofweek(res.dtHora) order by semana, dia;
      `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function historico(idOficina, dataSelecionada) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
    select horario, resultado, boxe
    from (
      select date_format(dtHora, '%H:%i') horario, resultado, idBoxe boxe, lag(resultado) over(partition by idBoxe order by dtHora) resultadoAnterior
      from registro
      join sensor on fkSensor = idSensor
      join boxe on idBoxe = fkBoxe
      where fkOficina = ${idOficina} and dtHora like '${dataSelecionada}%'
    ) resultadosOrdenados
    where resultado <> resultadoAnterior or resultadoAnterior is null
    order by horario desc;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  movimentoDiario,
  movimentoSemanal,
  historico,
};
