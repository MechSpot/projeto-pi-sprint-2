function validarEmail() {
  const inputEmail = document.getElementById("input_email");
  const email = document.getElementById("input_email").value;

  if (email == "") {
    inputEmail.style.border = "2px solid red";
  } else {
    if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
      inputEmail.style.border = "2px solid red";
    } else {
      inputEmail.style.border = "none";
    }
  }
}

// const tooltip = document.getElementById("tooltip_senha");

// document.getElementById("input_senha").addEventListener("focus", () => {
//   tooltip.style.display = "block";
// });

function validarSenha() {
  const inputSenha = document.getElementById("input_senha")
  const senha = document.getElementById("input_senha").value

  if (senha == "") {
    alert("Preencha a Senha");
    inputSenha.style.border = '2px solid red'
  } else {
    if (senha.length < 11) {
      alert("Insira uma senha maior");
      inputSenha.style.border = '2px solid red'

    } else {

      var letraMaiscula = false
      var letraMinuscula = false
      for (var pos = 0; pos < senha.length; pos++) {

        if(senha[pos] == senha[pos].toUpperCase()){
          letraMaiscula = true
        }

        if(senha[pos] == senha[pos].toLowerCase()){
          letraMinuscula = true
        }
      }
   
      if(letraMaiscula && letraMinuscula){
        alert('Senha validada com sucesso')
      }
    }
  }
}


console.log(validarSenha())