const intervalo = setInterval(() => {
  simularInsert(sessionStorage.ID_OFICINA, Math.random().toFixed());
}, 5000);

setTimeout(() => {
  clearInterval(intervalo);
}, 60000);

function simularInsert(idOficina, resultado) {
  fetch("/simular/sensorSimulado", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idOficina,
      resultado,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log("inseri")
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}
