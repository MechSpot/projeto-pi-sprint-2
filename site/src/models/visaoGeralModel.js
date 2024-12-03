var database = require("../database/config");

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

module.exports = {
  sensoresTotais,
  boxesVazio,
  vagaMenosUsada,
  fluxoDiario,
  mediaRotatividade,
  mediaUso,
};
