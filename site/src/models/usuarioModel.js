var database = require("../database/config");

function autenticar(chaveAcesso, email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    chaveAcesso,
    email,
    senha
  );

  if (chaveAcesso == null) {
    var instrucaoSql = `
          SELECT idOficina FROM oficina join login on idOficina = fkOficina WHERE email = '${email}' AND senha = '${senha}';
      `;
  } else {
    var instrucaoSql = `
            SELECT idOficina FROM oficina join login on idOficina = fkOficina WHERE chaveAcesso = ${chaveAcesso} AND email = '${email}' AND senha = '${senha}';
        `;
  }
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(
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
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
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
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
        INSERT INTO oficina (cnpj, nomeFantasia, razaoSocial, representanteLegal, celular, telefone, qtdBoxe, chaveAcesso) VALUES ('${cnpj}', '${nomeFantasia}' ,'${razaoSocial}', '${representanteLegal}', '${telefoneCelular}', '${telefoneFixo}', ${quantidadeBoxes} , '${
    /*GERA UM NÚMERO ALEATÓRIO ENTRE 100 E 999*/ Math.floor(
      Math.random() * 900 + 100
    )
  }'); `;

  var instrucaoSql2 = `
        insert into login (fkOficina, email, senha) values((select idOficina from oficina order by idOficina desc limit 1), '${email}', '${senha}');
        `;

  var instrucaoSql3 = `
        INSERT INTO endereco (fkOficina, cep, numero, complemento) VALUES ((select idOficina from oficina order by idOficina desc limit 1), '${cep}', ${numeroEndereco}, '${complemento}');
        `;

  var instrucaoSql4 = `INSERT INTO boxe (idBoxe, fkOficina) VALUES`;

  for (var insercao = 0; insercao < quantidadeBoxes - 1; insercao++) {
    instrucaoSql4 += `
    (${
      insercao + 1
    }, (select idOficina from oficina order by idOficina desc limit 1)),
    `;
    if (insercao == quantidadeBoxes - 2) {
      instrucaoSql4 += `
      (${
        insercao + 2
      },(select idOficina from oficina order by idOficina desc limit 1));`;
    }
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  database.executar(instrucaoSql);

  return (
    database.executar(instrucaoSql2),
    database.executar(instrucaoSql3),
    database.executar(instrucaoSql4)
  );
}

function cadastroNovoFuncionario(email, senha, fkOficina){
  console.log('Acessei o MODEL CadastroNovoFuncionario')

  var instrucaoSql = `
    INSERT INTO login VALUES
    (default, ${fkOficina}, '${email}', '${senha}');
  `
  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

module.exports = {
  autenticar,
  cadastrar,
  cadastroNovoFuncionario
};
