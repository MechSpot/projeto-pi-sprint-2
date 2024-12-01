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

function atualizarHistorico() {}

const chartMovimentoDiario = document.getElementById("chartLinha");

const chartDiario = new Chart(chartMovimentoDiario, {
  type: "bar", // Tipo do gráfico (linha)
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


function sair(){
  sessionStorage.clear()
  window.location = '../index.html'
}