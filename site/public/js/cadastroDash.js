
// Variaveis globais para validação
var emailValidado = false
var senhaValidada = false
var senhaConfirmmada = false


function validarEmail() {
  const inputEmail = document.getElementById("input_email");
  const email = document.getElementById("input_email").value;

  if (email == "") {
    inputEmail.style.border = "2px solid red";
  } else {
    if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
      inputEmail.style.border = "2px solid red";
    } else {
      emailValidado = true // Email validado
      inputEmail.style.border = "none";
    }
  }
}



function validarSenha() {
  const inputSenha = document.getElementById("input_senha")
  const senha = document.getElementById("input_senha").value
  // Simbolos que podem ou devem ser comportados na senha
  const simbolos = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '_', '-', '.']

  if (senha == "") { // Verificando se o Input não está vazio, caso esteja, irá trocar a cor da borda para vermelho 
    inputSenha.style.border = '2px solid red'
  } else {
    if (senha.length < 8) { // Verificando o comprimento da senha
      inputSenha.style.border = '2px solid red'
      console.log('senha muito curta')
    } else {
      console.log('entrou nas validações')
      // Entrando nas validações
      var contemletraMaiscula = false
      var contemletraMinuscula = false
      var contemSimbolos = false

      for (var pos = 0; pos < senha.length; pos++) {

        if (senha[pos] == senha[pos].toUpperCase()) { // Checando caractéres maiusculos
          contemletraMaiscula = true
        }
        if (senha[pos] == senha[pos].toLowerCase()) { // checando caractéres minusculos
          contemletraMinuscula = true
        }

        for (var i = 0; i < simbolos.length; i++) { // Verificando a lista de simbolos com os caractéres
          if (senha[pos] == simbolos[i]) {
            contemSimbolos = true
          }
        }
      }

      if (contemletraMaiscula && contemletraMinuscula && contemSimbolos) {
        console.log('A senha foi validada')

        inputSenha.style.border = 'none'
        senhaValidada = true // Senha validada
        confirmarSenha(senha)

      } else {
        console.log('A senha não foi validada')
        inputSenha.style.border = 'solid 1px red'
      }
    }
  }
}


function confirmarSenha() {
  const senha = input_senha.value
  const confirmarSenha = input_confirmar_senha.value

  if (confirmarSenha == senha) {
    console.log('confirmarSenha validado')

    senhaConfirmmada = true
    input_confirmar_senha.style.border = 'none'
  } else {
    input_confirmar_senha.style.border = 'solid 1px red'
  }
}




function cadastrarFuncionario() {
  if (emailValidado && senhaValidada && senhaConfirmmada) {

    const idOficinaVar = sessionStorage.getItem('ID_OFICINA')
    
    const emailVar = input_email.value
    const senhaVar = input_senha.value

    // Começando processo da API
    fetch('/usuarios/cadastrarNovoFuncionario', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        
        emailServer: emailVar,
        senhaServer: senhaVar,
        idOficinaServer : idOficinaVar
      })
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {

          alert('Novo funcionário cadastrado com sucesso!')

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

function sair(){
  sessionStorage.clear()
  window.location = '../index.html'
}