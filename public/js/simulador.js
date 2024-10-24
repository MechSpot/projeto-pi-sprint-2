function calcular() {
    span_horas_dia.innerHTML = ""
    span_horas_mes.innerHTML = ""
    span_horas_ano.innerHTML = ""
    span_lucro_dia.innerHTML = ""
    span_lucro_mes.innerHTML = ""
    span_lucro_ano.innerHTML = ""

    var valorLucroHora = Number(valor_lucro_hora.value)
    var horasOperacaoDia = Number(horas_operacao_dia.value)
    var diasOperacaoMes = Number(dias_operacao_mes.value)
    var qtdBoxes = Number(boxes.value)

    if (valorLucroHora == 0) {
        valorLucroHora = 100
    }

    if (horasOperacaoDia == 0) {
        horasOperacaoDia = 8
    }

    if (diasOperacaoMes == 0) {
        diasOperacaoMes = 22
    }

    if (qtdBoxes == 0) {
        qtdBoxes = 20
    }

    var lucroDiario = valorLucroHora * horasOperacaoDia
    var tempoOcioso = 0.5 * (horasOperacaoDia * qtdBoxes)
    var tempoOciosoSoftware = 0.25 * (horasOperacaoDia * qtdBoxes)
    var horasRecuperadas = tempoOcioso - tempoOciosoSoftware
    var ganhoRecuperado = tempoOciosoSoftware * valorLucroHora

    span_horas_dia.innerHTML += `${horasRecuperadas.toLocaleString()} horas por dia`
    span_horas_mes.innerHTML += `${(horasRecuperadas * diasOperacaoMes).toLocaleString()} horas por mês`
    span_horas_ano.innerHTML += `${(horasRecuperadas * diasOperacaoMes * 11).toLocaleString()} horas por ano`
    span_lucro_dia.innerHTML += `${ganhoRecuperado.toLocaleString("pt-br", { style: "currency", currency: "BRL", })} por dia`
    span_lucro_mes.innerHTML += `${(ganhoRecuperado * diasOperacaoMes).toLocaleString("pt-br", { style: "currency", currency: "BRL", })}
    por mês`
    span_lucro_ano.innerHTML += `${(ganhoRecuperado * diasOperacaoMes * 11).toLocaleString("pt-br", { style: "currency", currency: "BRL", })}
    por ano`
    explicacao_contexto.style.display = "block"
    resultado_simulacao.style.display = "flex"
}