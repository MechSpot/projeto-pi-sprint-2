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

  if (email == "honda@gmail.com" && senha == "Honda123") {
    window.location = "visao_geral.html";
  } else {
    alert("Dados invalidos");
  }
}

function cadastrar() {
  const cnpj = input_cnpj.value;
  const razaoSocial = input_razao_social.value;
  const representanteLegal = input_representante_legal.value;
  const email = input_email.value;
  const telefoneCelualar = input_tel_celular.value;
  const telefoneFixo = input_tel_fixo.value;
  const senha = input_senha.value;

  const camposPreenchidos =
                  cnpj != "" &&
           razaoSocial != "" &&
    representanteLegal != "" &&
                 email != "" &&
      telefoneCelualar != "" &&
                 senha != "";
  if (!camposPreenchidos) {
    alert("Preencha todos os campos para continuar");
  } else {
    var senhaPossuiMaiscula = false;
    var senhaPossuiMinuscula = false;
    var senhaPossuiNumero = false;

    for (var caracterAtual = 0; caracterAtual < senha.length; caracterAtual++) {
      if (!senhaPossuiMaiscula || !senhaPossuiMinuscula) {
        if (senha[caracterAtual] == senha[caracterAtual].toUpperCase()) {
          senhaPossuiMaiscula = true;
        } else if (senha[caracterAtual] == senha[caracterAtual].toLowerCase()) {
          senhaPossuiMinuscula = true;
        }
      }

      if (!senhaPossuiNumero) {
        if (!isNaN(Number(senha[caracterAtual]))) {
          senhaPossuiNumero = true;
        }
      }
    }

    if (cnpj.length < 14) {
      alert("Cnpj inválido");
    } else if (razaoSocial.length < 5 || razaoSocial.length > 100) {
      alert("Razão social Inválida");
    } else if (
      representanteLegal.length < 5 ||
      representanteLegal.length > 100
    ) {
      alert("Represemtante legal Inválido");
    } else if (email.indexOf("@") == -1 || !email.endsWith(".com")) {
      alert("Email Inválido");
    } else if (telefoneCelualar.length < 11) {
      alert("Número de celular inválido");
    } else if (telefoneFixo.legth < 10) {
      alert("Número de telefone fixo inválido");
    } else if (
      senha.length < 8 ||
      !senhaPossuiMaiscula ||
      !senhaPossuiMinuscula ||
      !senhaPossuiNumero ||
      senha.indexOf(" ") != -1
    ) {
      alert("Senha Inválida");
    } else {
      alert("Login Efetuado Com Sucesso!!")
      trocar_tela()
    }
  }
}
