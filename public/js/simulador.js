function calcular() {
  resultado.style.display = "block";
  resultado2.style.display = "block";
  resultado2.innerHTML = ``;
  const valorLucroHora = Number(valor_lucro_hora.value);
  // const clientesDiarios = Number(clientes_diarios.value);
  const horasOperacaoDia = Number(horas_operacao_dia.value);
  const diasOperacaoMes = Number(dias_operacao_mes.value);
  const qtdBoxes = Number(boxes.value);

  var lucroDiario = valorLucroHora * horasOperacaoDia;
  var tempoOcioso = 0.2 * (horasOperacaoDia * qtdBoxes);
  var tempoOciosoSoftware = 0.1 * (horasOperacaoDia * qtdBoxes);
  var horasRecuperadas = tempoOcioso - tempoOciosoSoftware;
  var ganhoRecuperado = tempoOciosoSoftware * valorLucroHora;
  var ganhoRecuperadoMes = ganhoRecuperado * diasOperacaoMes;
  var ganhoRecuperadoAno = ganhoRecuperado * diasOperacaoMes * 11;

  resultado2.innerHTML += `
    <div class="campo">
        <span>
            Vamos supor que sua ociosidade é <span>de 20%</span>, com o nosso software você poderá <span>reduzi-lá em 50%</span>,
            ou seja, sua ociosidade vai <span>reduzir para apenas 10%</span>.
        </span>
    </div>
    <div class="campo"> 
        <span>  
            Desta maneira recuperará em média <span>
            ${horasRecuperadas.toLocaleString()} horas por dia</span>, 
            <span>
            ${(
              horasRecuperadas * diasOperacaoMes
            ).toLocaleString()} horas por mês</span>, 
            totalizando em <span>
            ${(
              horasRecuperadas *
              diasOperacaoMes *
              11
            ).toLocaleString()} horas por ano</span>. 
        </span> 
    </div>
    <div class="campo">
        <span>
            Consequemente aumentará o lucro em média <span>
            ${ganhoRecuperado.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })} por dia</span>, 
            <span>${(ganhoRecuperado * diasOperacaoMes).toLocaleString(
              "pt-br",
              { style: "currency", currency: "BRL" }
            )} 
            por mês </span>,
            totalizando em <span>
            ${(ganhoRecuperado * diasOperacaoMes * 11).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
             por ano</span>. 
        </span>
    </div>
`;
}
