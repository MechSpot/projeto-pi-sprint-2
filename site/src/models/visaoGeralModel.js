var database = require("../database/config");

function resultadoDisplay(idOficina) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
        SELECT b.idBoxe boxe, r.resultado ultimoResultado
        FROM boxe b
        LEFT JOIN sensor s ON b.idBoxe = s.fkBoxe
        JOIN registro r ON s.idSensor = r.fkSensor
        WHERE b.fkOficina = ${idOficina} AND r.idRegistro = (SELECT MAX(r2.idRegistro) FROM registro r2 WHERE r2.fkSensor = r.fkSensor)
        ORDER BY b.idBoxe, r.dtHora DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function alertar(idOficina) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = ``;

  for (var i = 0; i < 10; i++) {
    instrucaoSql += `
    select * from (select idBoxe, resultado, dtHora from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = ${idOficina} and idBoxe = ${
      i + 1
    } order by idBoxe, dtHora desc limit 2) boxe${i + 1}
    `;

    if (i < 9) {
      instrucaoSql += `union all`;
    }
  }

  instrucaoSql += `;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function sensoresTotais(idOficina) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
        select count(idBoxe) totalSensores from boxe where fkOficina = ${idOficina};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function boxesVazio(idOficina) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
            select count(distinct idBoxe) boxesVazios
            from boxe 
            join sensor s on idBoxe = s.fkBoxe
            join registro r on s.idSensor = r.fkSensor 
            join (select fkSensor, max(dtHora) ultimaData from registro group by fkSensor ) ultimosRegistros
            on r.fkSensor = ultimosRegistros.fkSensor and r.dtHora = ultimosRegistros.ultimaData
            where fkOficina = ${idOficina} and r.resultado = 0;
        `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function fluxoDiario(idOficina) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
                select resultado
                from (
                    select resultado, lag(resultado) over(partition by idBoxe) resultadoAnterior
                    from registro
                    join sensor on fkSensor = idSensor
                    join boxe on idBoxe = fkBoxe
                    where fkOficina = ${idOficina} and date(dtHora) like date(now())
                ) resultadosOrdenados
                where resultado <> resultadoAnterior or resultadoAnterior is null;
            `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function mediaUso(idOficina) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
    select date_format(sec_to_time(avg(time_to_sec(timediff(horario, horarioAnterior)))), '%i') mediaUso
    from (
        select idRegistro , dtHora horario, resultado, idBoxe boxe,
        lag(resultado) over(partition by idBoxe order by dtHora) resultadoAnterior,
        lag(dtHora) over(partition by idBoxe order by dtHora) horarioAnterior
        from registro
        join sensor on fkSensor = idSensor
        join boxe on idBoxe = fkBoxe
        where fkOficina = ${idOficina} and date(dtHora) like date(now())
    ) resultadosOrdenados
    where resultado <> resultadoAnterior and resultado = 1 and horarioAnterior is not null;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function mediaRotatividade(idOficina) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
    select date_format(sec_to_time(avg(time_to_sec(timediff(horario, horarioAnterior)))), '%i') mediaRotatividade
    from (
        select idRegistro ,dtHora horario, resultado, idBoxe boxe,
        lag(resultado) over(partition by idBoxe order by dtHora) resultadoAnterior,
        lag(dtHora) over(partition by idBoxe order by dtHora) horarioAnterior
        from registro
        join sensor on fkSensor = idSensor
        join boxe on idBoxe = fkBoxe
        where fkOficina = ${idOficina} and date(dtHora) like date(now())
    ) resultadosOrdenados
    where resultado <> resultadoAnterior;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function vagaMenosUsada(idOficina) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
            select idBoxe boxe, sum(resultado) utilizacao from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = ${idOficina} group by fkSensor order by utilizacao limit 1;
        `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function movimentoVaga(idOficina, idBoxe) {
  console.log("ACESSEI O RELATORIOS MODEL");

  var instrucaoSql = `
          select sum(res.resultado) movimentoVaga, hour(res.dtHora) hora 
          from (select * from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = ${idOficina} and date(dtHora) like date(now()) and idBoxe = ${idBoxe}) res 
          group by hour(res.dtHora) order by hour(dtHora);
      `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  resultadoDisplay,
  alertar,
  sensoresTotais,
  boxesVazio,
  vagaMenosUsada,
  fluxoDiario,
  mediaRotatividade,
  mediaUso,
  movimentoVaga,
};
