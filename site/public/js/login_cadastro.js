function trocar_tela() {
  if (tela.classList == "card tela_login") {
    tela.classList.add("sumir");
    tela2.classList.remove("sumir");
  } else {
    tela.classList.remove("sumir");
    tela2.classList.add("sumir");
  }
}

var cnpj = "";
var nomeFantasia = "";
var razaoSocial = "";
var representanteLegal = "";
var email = "";
var telefoneCelular = "";
var telefoneFixo = "";
var quantidadeBoxes = "";
var cep = "";
var numeroEndereco = "";
var complemento = "";
var senha = "";

function proximaPagina() {
  cnpj = input_cnpj.value;
  nomeFantasia = input_nome_fantasia.value;
  razaoSocial = input_razao_social.value;
  representanteLegal = input_representante_legal.value;
  email = input_email.value;
  telefoneCelular = input_tel_celular.value;
  telefoneFixo = input_tel_fixo.value;
  quantidadeBoxes = input_qtd_boxes.value;

  div_primeiros_campos_cadastro.innerHTML = `
    <label>CEP:</label>
    <input type="text" placeholder="CEP" id="input_cep" />
    <label>Numero Endereço:</label>
    <input type="text" placeholder="Numero" id="input_numero_endereco"/>
  `;

  div_segundos_campos_cadastro.innerHTML = `
    <label>Complemento:</label>
    <input type="text" placeholder="Complemento" id="input_complemento" />
    <label>Senha:</label>
    <i id="olho2" class="fa-solid fa-eye" onclick="revelar('input_senha')"></i>
    <input type="text" placeholder="Senha" id="input_senha"/>
  `;

  div_botao.innerHTML =
    '<button onclick="cadastrar()" class="btn">CADASTRAR</button>';
}

function revelar(campo) {
  if (campo == "input_senha_login" && input_senha_login.type == "password") {
    input_senha_login.type = "text";
    olho1.classList.remove("fa-eye");
    olho1.classList.add("fa-eye-slash");
  } else if (campo == "input_senha_login" && input_senha_login.type == "text") {
    input_senha_login.type = "password";
    olho1.classList.add("fa-eye");
    olho1.classList.remove("fa-eye-slash");
  }

  if (
    campo == "input_senha" &&
    input_senha.type == "password"
  ) {
    input_senha.type = "text";
    olho2.classList.remove("fa-eye");
    olho2.classList.add("fa-eye-slash");
  } else if (
    campo == "input_senha" &&
    input_senha.type == "text"
  ) {
    input_senha.type = "password";
    olho2.classList.add("fa-eye");
    olho2.classList.remove("fa-eye-slash");
  }
}

function cadastrar() {
  cep = input_cep.value;
  numeroEndereco = input_numero_endereco.value;
  complemento = input_complemento.value;
  senha = input_senha.value;

  const camposPreenchidos =
    cnpj != "" &&
    razaoSocial != "" &&
    representanteLegal != "" &&
    email != "" &&
    telefoneCelular != "" &&
    quantidadeBoxes != "" &&
    cep != "" &&
    numeroEndereco != "" &&
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
      alert("Represemtante legal inválido");
    } else if (email.indexOf("@") == -1 || !email.endsWith(".com")) {
      alert("Email inválido");
    } else if (telefoneCelular.length < 11) {
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
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
          cnpjServer: cnpj,
          nomeFantasiaServer: nomeFantasia,
          razaoSocialServer: razaoSocial,
          representanteLegalServer: representanteLegal,
          emailServer: email,
          telefoneCelularServer: telefoneCelular,
          telefoneFixoServer: telefoneFixo,
          quantidadeBoxesServer: quantidadeBoxes,
          cepServer: cep,
          numeroEnderecoServer: numeroEndereco,
          complementoServer: complemento,
          senhaServer: senha,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);

          if (resposta.ok) {
            // alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

            setTimeout(() => {
              trocar_tela();
            }, "2000");

            limparFormulario();
            // finalizarAguardar();
          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });

      return false;
    }
  }
}

function autenticar() {
  const chaveAcesso = input_chave_acesso.value;
  const email = input_email_login.value;
  const senha = input_senha_login.value;

  if (email == "suporteN3@mechspot.com" && senha == "N3suporte") {
    window.location = "http://localhost:3000";
  } else {
    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chaveAcessoServer: chaveAcesso,
        emailServer: email,
        senhaServer: senha,
      }),
    })
      .then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!");

        if (resposta.ok) {
          console.log(resposta);

          resposta.json().then((json) => {
            console.log("inxada", json);
            console.log(JSON.stringify(json));

            sessionStorage.ID_OFICINA = json.idOficina;

            window.location = "./dashboard/visao_geral.html";
          });
        } else {
          console.log("Houve um erro ao tentar realizar o login!");

          resposta.text().then((texto) => {
            console.error(texto);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });
  }

  return false;
}
