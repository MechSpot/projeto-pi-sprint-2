const { head } = require("../../src/routes/relatorios");

// 1. Definir os dados do gráfico de Movimento Diário para cada dia da semana
const dadosDiarios = {
  segunda: [0, 1, 3, 2, 5, 4, 6, 4, 2, 1, 3, 2],
  terca: [2, 3, 1, 4, 6, 5, 7, 8, 3, 2, 4, 6],
  quarta: [1, 4, 3, 6, 5, 7, 9, 6, 5, 3, 4, 7],
  quinta: [0, 3, 2, 5, 8, 7, 9, 6, 4, 2, 5, 8],
  sexta: [1, 2, 4, 6, 7, 6, 8, 9, 4, 3, 5, 7],
};

// 2. Definir o histórico de eventos (entradas e saídas) para cada dia da semana
const historicoEventos = {
  segunda: [
    "17:37 - Um carro entrou na vaga 14",
    "16:21 - Um carro saiu da vaga 8",
    "13:15 - Um carro entrou na vaga 5",
    "16:40 - Um carro entrou na vaga 1",
    "15:52 - Um carro saiu da vaga 16",
    "16:02 - Um carro entrou na vaga 7",
    "17:00 - Um carro entrou na vaga 2",
  ],
  terca: [
    "15:30 - Um carro entrou na vaga 3",
    "14:50 - Um carro saiu da vaga 8",
    "13:18 - Um carro entrou na vaga 5",
    "11:22 - Um carro saiu da vaga 4",
    "16:40 - Um carro entrou na vaga 1",
    "9:25 - Um carro saiu da vaga 9",
    "17:22 - Um carro saiu da vaga 16",
    "8:26 - Um carro saiu da vaga 2",
    "16:21 - Um carro saiu da vaga 7",
  ],
  quarta: [
    "09:10 - Um carro entrou na vaga 6",
    "10:22 - Um carro saiu da vaga 4",
    "11:30 - Um carro entrou na vaga 16",
    "20:52 - Um carro saiu da vaga 2",
    "16:15 - Um carro saiu na vaga 15",
    "16:21 - Um carro saiu da vaga 7",
    "16:40 - Um carro entrou na vaga 1",
    "15:30 - Um carro entrou na vaga 3",
  ],
  quinta: [
    "08:00 - Um carro entrou na vaga 4",
    "15:30 - Um carro entrou na vaga 3",
    "11:38 - Um carro saiu na vaga 16",
    "12:45 - Um carro saiu da vaga 5",
    "18:26 - Um carro entrou da vaga 7",
    "19:30 - Um carro entrou na vaga 12",
    "17:20 - Um carro entrou na vaga 1",
    "16:21 - Um carro saiu da vaga 7",
  ],
  sexta: [
    "13:40 - Um carro entrou na vaga 3",
    "08:00 - Um carro entrou na vaga 2",
    "15:30 - Um carro saiu da vaga 6",
    "19:04 - Um carro entrou na vaga 15",
    "13:55 - Um carro saiu da vaga 10",
    "16:21 - Um carro saiu da vaga 7",
    "08:00 - Um carro entrou na vaga 5",
    "15:30 - Um carro saiu da vaga 6",
  ],
};

//  gráfico de Movimento Diário com dados da segunda-feira
const chartMovimentoDiario = document.getElementById("chartLinha");

let movimentoDiarioAtual = dadosDiarios["segunda"];
const chartLinhaObj = new Chart(chartMovimentoDiario, {
  type: "line", // Tipo do gráfico (linha)
  data: {
    labels: [
      "9h",
      "10h",
      "11h",
      "12h",
      "13h",
      "14h",
      "15h",
      "16h",
      "17h",
      "18h",
      "19h",
      "20h",
    ], // Horários
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
});

// gráfico de Movimento Semanal (gráfico de barras)
const chartMovimentoSemanal = document.getElementById("chartBarraVertical");

const dadosSemana = {
  semana1: [12, 7, 14, 11, 22],
  semana2: [15, 12, 5, 7, 19],
  semana3: [9, 13, 10, 15, 18],
  semana4: [13, 13, 9, 10, 19],
};

let movimentoSemanalAtual = dadosSemana["semana1"];
const chartBarraVerticalObj = new Chart(chartMovimentoSemanal, {
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

// 5. Atualizar gráfico de Movimento Semanal quando o usuário mudar a semana selecionada
document
  .getElementById("selectSemanal")
  .addEventListener("change", function () {
    const semanaSelecionada = this.value; //Aqui estamos obtendo o valor da semana que o usúario escolher
    movimentoSemanalAtual = dadosSemana[semanaSelecionada]; // Atualiza os dados da semana

    chartBarraVerticalObj.data.datasets[0].data = movimentoSemanalAtual; // Atualiza os dados do gráfico
    chartBarraVerticalObj.update(); // Atualiza o gráfico na tela
  });

// Atualizando gráfico de Movimento Diário e histórico ao selecionar uma data no calendário
document
  .getElementById("calendarDiario")
  .addEventListener("change", function () {
    const dataSelecionada = this.value; // Obténod a data selecionada pelo usúario

    if (dataSelecionada) {
      const date = new Date(dataSelecionada); // Cria um objeto 'Date' a partir da data selecionada
      const diaSemana = date.getDay(); // Obtém o dia da semana (0 = domingo, 1 = segunda, etc...)
      const dias = ["segunda", "terca", "quarta", "quinta", "sexta"]; // Vetor com os nomes dos dias
      const diaSelecionado = dias[diaSemana]; // Obtém o nome do dia da semana selecionado

      // Aqui estamos atualizando os grafico diarios e o histórico
      movimentoDiarioAtual = dadosDiarios[diaSelecionado];
      historicoAtual = historicoEventos[diaSelecionado];

      // Atualiza o gráfico de Movimento Diário
      chartLinhaObj.data.datasets[0].data = movimentoDiarioAtual;
      chartLinhaObj.update();

      // Atualiza o histórico de entradas e saídas
    }
  });

function movimentoDiario() {
  var dataSelecionada = calendarDiario.value;

  fetch(`/relatorios/movimentoDiario/` + dataSelecionada, {
    method: "get",
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        movimentoDiarioAtual = dadosDiarios[json[0]];
        historicoAtual = historicoEventos[json[0]];

        atualizarHistorico()

        // for (var i = 0; i < json.length; i++) {
        //   dados_votos.data.datasets[0].data.push(json[i].voto);
        //   dados_votos.data.labels.push(json[i].nomePersonagem);
        //   chart_votos.update();
        // }
      });
    }
  });
}

function atualizarHistorico() {
  const historicoContainer = document.getElementById("historico");
      historicoContainer.innerHTML = "";
      historicoAtual.forEach((evento) => {
        const div = document.createElement("div"); // Cria um novo elemento div para o evento
        div.classList.add("dados_relatorio"); // Adiciona uma classe para o estilo
        div.innerHTML = evento; // Insere o texto do evento
        historicoContainer.appendChild(div); // Adiciona o evento no histórico
      });
}