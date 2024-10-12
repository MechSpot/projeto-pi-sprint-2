function trocar_tela() {
  if (tela.classList == "card tela_login") {
    tela.classList.add("sumir");
    tela2.classList.remove("sumir");
  } else {
    tela.classList.remove("sumir");
    tela2.classList.add("sumir");
  }
}

function entrar() {
  const email = input_email_login.value;
  const senha = input_senha_login.value;

  if (email == "Honda" && senha == "12345678") {
    window.location = "./visao_geral.html";
  } else {
    alert("Dados invalidos");
  }
}
