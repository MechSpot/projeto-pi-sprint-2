dataAtual = new Date();
calendarDiario.value = `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-${dataAtual.getDate() < 10 ? `0${dataAtual.getDate()}` : dataAtual.getDate()}`;

var movimentoDiarioAtual = [];
var horas = [];

function movimentoDiario() {
  movimentoDiarioAtual.splice(0, movimentoDiarioAtual.length);
  horas.splice(0, horas.length);

  var dataSelecionada = calendarDiario.value;

  fetch(
    `/relatorios/movimentoDiario/${dataSelecionada}/${sessionStorage.ID_OFICINA}`,
    {
      method: "get",
    }
  ).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        json.forEach((item) => {
          movimentoDiarioAtual.push(item.movimentoDiario);
          horas.push(item.hora + "h");
        });

        console.log(movimentoDiarioAtual);
        chartDiario.update();
      });
    }
  });
}

var movimentoSemanalAtual = [];

function movimentoSemanal() {
  movimentoSemanalAtual.splice(0, movimentoSemanalAtual.length);

  var semanaSelecionada = selectSemana.value;

  fetch(
    `/relatorios/movimentoSemanal/${semanaSelecionada}/${sessionStorage.ID_OFICINA}`,
    {
      method: "get",
    }
  ).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        json.forEach((item) => {
          movimentoSemanalAtual.push(item.movimentoSemanal);
        });

        console.log(movimentoSemanalAtual);
        chartSemanal.update();
      });
    }
  });
}

function atualizarHistorico() {
  const historicoContainer = document.getElementById("historico");
  var dataSelecionada = calendarDiario.value;

  fetch(
    `/relatorios/historico/${dataSelecionada}/${sessionStorage.ID_OFICINA}`,
    {
      method: "get",
    }
  ).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        historicoContainer.innerHTML = "";
        json.forEach((evento) => {
          const div = document.createElement("div"); // Cria um novo elemento div para o evento
          div.classList.add("dados_relatorio"); // Adiciona uma classe para o estilo

          if (evento.resultado == 1) {
            div.innerHTML = `${evento.horario} - Um carro <span class="entrada">entrou</span> no boxe ${evento.boxe}`; // Insere o texto do evento
          } else {
            div.innerHTML = `${evento.horario} - Um carro <span class="saida">saiu</span> do boxe ${evento.boxe}`; // Insere o texto do evento
          }
          historicoContainer.appendChild(div); // Adiciona o evento no histórico
        });
      });
    }
  });
}

const chartMovimentoDiario = document.getElementById("chartLinha");

const chartDiario = new Chart(chartMovimentoDiario, {
  type: "bar",
  data: {
    labels: horas,
    datasets: [
      {
        label: "Movimento Diário",
        data: movimentoDiarioAtual,
        borderColor: "black",
        backgroundColor: "#5eded154",
        fill: true,
      },
    ],
  },
  option: {
    scale: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const chartMovimentoSemanal = document.getElementById("chartBarraVertical");

const chartSemanal = new Chart(chartMovimentoSemanal, {
  type: "bar", // Tipo do gráfico (barra)
  data: {
    labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
    datasets: [
      {
        label: "Movimento na Semana",
        data: movimentoSemanalAtual,
        borderColor: "black",
        backgroundColor: "#e8c10092",
      },
    ],
  },
});

function atualizarDados(dado) {
  if (dado == "dia e historico") {
    movimentoDiario(), atualizarHistorico();
    return;
  }

  movimentoDiario(), atualizarHistorico(), movimentoSemanal();
}

function sair() {
  sessionStorage.clear();
  window.location = "../index.html";
}
