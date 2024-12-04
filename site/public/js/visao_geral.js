fetch(`/visaoGeral/resultadoDisplay/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      for (var i = 0; i < json.length; i++) {
        if (json[i].ultimoResultado == 1) {
          display.innerHTML += `
            <div class="vagas" id="${
              i + 1
            }" onclick="verDetalhamento(this.id);">
                <img id="imagemAlerta${i+1}" src="../assets/img/alertIcon.png" alt="" class="imagemAlerta" style="display:none;"/>${
                  i + 1
                }<img src="../assets/img/fusca.png" class="imagemFusca" />
            </div>
          `;
        } else {
          display.innerHTML += `
            <div class="vagas vagasVazias" id="${
              i + 1
            }" onclick="verDetalhamento(this.id);">${
            i + 1
          }<img id="imagemAlerta${
            i + 1
          }" src="../assets/img/alertIcon.png" alt="" class="imagemAlerta" style="display:none;"/></div>
          `;
        }
      }
    });
  }
});

fetch(`/visaoGeral/sensoresTotais/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_sensores_totais.innerHTML = `<b>${json[0].totalSensores}</b>`;
    });
  }
});

fetch(`/visaoGeral/boxesVazio/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_boxes_vazio.innerHTML = `<b>${json[0].boxesVazios}</b>`;
    });
  }
});

var entrada = 0;
var saida = 0;

span_entrada_carros.innerHTML = entrada;
span_saida_carros.innerHTML = saida;

fetch(`/visaoGeral/fluxoDiario/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      for (var i = 0; i < json.length; i++) {
        if (json[i].resultado == 1) {
          entrada++;
        } else {
          saida++;
        }
      }

      span_entrada_carros.innerHTML = entrada;
      span_saida_carros.innerHTML = saida;
    });
  }
});

fetch(`/visaoGeral/mediaUso/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_media_uso.innerHTML = `<b>${json[0].mediaUso}min</b>`;
    });
  }
});

fetch(`/visaoGeral/mediaRotatividade/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_media_rotatividade.innerHTML = `<b>${json[0].mediaRotatividade}min</b>`;
    });
  }
});

fetch(`/visaoGeral/vagaMenosUsada/${sessionStorage.ID_OFICINA}`, {
  method: "get",
}).then(function (resposta) {
  if (resposta.ok) {
    resposta.json().then((json) => {
      span_vaga_menos_usada.innerHTML = `<b>Vaga Nº${json[0].boxe}</b>`;
    });
  }
});

const modal = document.getElementById("vagaModal");
const vagaInfo = document.getElementById("vagaInfo");

const movimentoVagaAtual = [];
const horas = [];
const linhaMetrica = [];

function verDetalhamento(idBoxe) {
  movimentoVagaAtual.splice(0, movimentoVagaAtual.length);
  horas.splice(0, horas.length);

  fetch(`/visaoGeral/movimentovaga/${sessionStorage.ID_OFICINA}/${idBoxe}`, {
    method: "get",
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        json.forEach((item) => {
          movimentoVagaAtual.push(parseInt(item.movimentoVaga));
          console.log(movimentoVagaAtual);
          horas.push(item.hora + "h");
          linhaMetrica.push(1);
        });
        modal.style.display = "block";
        chartMovimentoVaga.style.height = 100 + 'vh'
        chartMovimentoVaga.style.width = 100 + 'vw'
        vagaInfo.textContent = "Informações da vaga N° " + idBoxe;
        chartVaga.update();
      });
    }
  });
}

function alertar(idBoxe) {
  if (
    movimentoVagaAtual[movimentoVagaAtual.length - 1] == 0 &&
    movimentoVagaAtual[movimentoVagaAtual.length - 2] == 0
  ) {
    imagemAlerta[idBoxe - 1].style.display = "block"
  } else {
    imagemAlerta[idBoxe - 1].style.display = "none"
  }
}

const chartMovimentoVaga = document.getElementById("chartLinha");

const chartVaga = new Chart(chartMovimentoVaga, {
  type: "line",
  data: {
    labels: horas,
    datasets: [
      {
        label: "Clientes por Hora",
        data: movimentoVagaAtual,
        borderColor: "#32746D",
        backgroundColor: "#32746D",
      },
      {
        label: "Ocupação Mínima",
        data: linhaMetrica,
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Garante que os valores no eixo Y sejam inteiros
          callback: function (value) {
            return Number.isInteger(value) ? value : ""; // Mostra apenas valores inteiros
          },
        },
      },
    },
  },
});

// pra fechar o modal
function fecharModal() {
  const modal = document.getElementById("vagaModal");
  modal.style.display = "none";
}

function sair() {
  sessionStorage.clear();
  window.location = "../index.html";
}
