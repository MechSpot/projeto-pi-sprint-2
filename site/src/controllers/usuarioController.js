var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var chaveAcesso = req.body.chaveAcessoServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else if (chaveAcesso == null) {
    usuarioModel
      .autenticar(chaveAcesso, email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.json({
            idOficina: resultadoAutenticar[0].idOficina,
          });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  } else {
    usuarioModel
      .autenticarUsuario(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.json({
            idOficina: resultadoAutenticar[0].idOficina,
          });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var cnpj = req.body.cnpjServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var razaoSocial = req.body.razaoSocialServer;
  var representanteLegal = req.body.representanteLegalServer;
  var email = req.body.emailServer;
  var telefoneCelular = req.body.telefoneCelularServer;
  var telefoneFixo = req.body.telefoneFixoServer;
  var quantidadeBoxes = req.body.quantidadeBoxesServer;
  var cep = req.body.cepServer;
  var numeroEndereco = req.body.numeroEnderecoServer;
  var complemento = req.body.complementoServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (cnpj == undefined) {
    res.status(400).send("Seu cnpj está undefined!");
  } else if (nomeFantasia == undefined) {
    res.status(400).send("Seu cnpj está undefined!");
  } else if (razaoSocial == undefined) {
    res.status(400).send("Seu razão social está undefined!");
  } else if (representanteLegal == undefined) {
    res.status(400).send("Seu representante legal está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (telefoneCelular == undefined) {
    res.status(400).send("Seu telefone celular está undefined!");
  } else if (quantidadeBoxes == undefined) {
    res.status(400).send("Sua quantidade de boxes está undefined!");
  } else if (cep == undefined) {
    res.status(400).send("Seu CEP está undefined!");
  } else if (numeroEndereco == undefined) {
    res.status(400).send("Seu telefone celular está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(
        cnpj,
        nomeFantasia,
        razaoSocial,
        representanteLegal,
        email,
        telefoneCelular,
        telefoneFixo,
        quantidadeBoxes,
        cep,
        numeroEndereco,
        complemento,
        senha
      )

      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}


function cadastrarNovoFuncionario(req, res) {
  const idOficina = req.body.idOficinaServer

  const email = req.body.emailServer
  const senha = req.body.senhaServer

  if (idOficina == undefined) {
    res.status(400).send('idOficina está undefined')
  } else if (email == undefined) {
    res.status(400).send('email está undefined')
  } else if (senha == undefined) {
    res.status(400).send('senha está undefined')
  } else {

    usuarioModel.cadastroNovoFuncionario(email, senha, idOficina)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro do novo funcionario! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}



module.exports = {
  autenticar,
  cadastrar,
  cadastrarNovoFuncionario
};
