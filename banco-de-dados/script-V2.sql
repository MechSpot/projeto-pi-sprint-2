create database group1;
use group1;

-- criar tabela oficina
create table oficina_concessonaria (
    idOficinaConcessonaria int primary key auto_increment,
	cnpj varchar(18) not null unique,
    nomeFantasia varchar(70) not null,
    razaoSocial varchar(100) not null,
    representanteLegal varchar(45) not null,
    email varchar(50) not null,
    celular varchar(12) not null,
    telefone varchar(11),
    qtdBoxe int not null
);

-- criar tabela endereco
create table endereco(
    idEndereco int auto_increment,
    fkOficina int,
    constraint pkComposta primary key (idEndereco, fkOficina),
     constraint fkEnderecoOficina foreign key (fkOficina) references oficina_concessonaria(idOficinaConcessonaria),
    cep char(9) not null,
    numero int not null,
    complemento varchar(45)
);

-- Tabela de boxes
create table boxe (
    idBoxe int auto_increment,
    fkOficina int not null,
    constraint pkComposta primary key (idBoxe, fkOficina),
    constraint fkBoxeOficina foreign key (fkOficina) references oficina_concessonaria(idOficinaConcessonaria)
);

-- Tabela de usuários
create table usuario (
    idUsuario int auto_increment,
    fkOficina int not null,
    constraint pkComposta primary key (idUsuario, fkOficina),
    constraint fkUsuarioOficina foreign key (fkOficina) references oficina_concessonaria(idOficinaConcessonaria),
    nome varchar(45) not null,
    email varchar(50) not null unique,
    senha varchar(20) not null
);

-- Tabela de sensores
create table sensor (
    idSensor int primary key auto_increment,
    statusSensor varchar(10) not null,
    constraint chkStatusSensor check (statusSensor in ('Operante', 'Inoperante')),
    fkBoxe INT,
    foreign key (fkBoxe) references boxe(idBoxe)
);

-- Tabela de registros
create table registro (
    idRegistro int auto_increment,
    fkSensor int not null,
    constraint pkComposta primary key (idRegistro, fkSensor),
    constraint fkRegistroSensor foreign key (fkSensor) references sensor(idSensor),
    resultado int not null,
    dtHora datetime default current_timestamp not null
);

-- Inserindo oficinas
insert into oficina_concessonaria (cnpj, nomeFantasia, razaoSocial, representanteLegal, email, celular, telefone, qtdBoxe) values
	('12.345.678/0001-90', 'Auto Center Guardiões', 'Guardiões Serviços Automotivos Ltda', 'Peter Quill', 'contato@guardioes.com', '11912345678', '1131234567', 10),
	('13.345.678/0001-90', 'Auto Center Vingadores', 'Vingadores Serviços Automotivos Ltda', 'Steve Rogers', 'contato@vingadores.com', '11923456789', '1198765432', 15),
	('14.345.678/0001-90', 'Auto Center Fantástico', 'Fantástico Serviços Automotivos Ltda', 'Reed Richards', 'contato@fantastico.com', '11934567891', '1119283746', 14);

-- Inserindo endereços
insert into endereco (fkOficina, cep, numero, complemento) values
	(1, '01234-567', 123, null),
	(2, '12345-678', 234, 'Próximo ao Posto'),
	(3, '23456-789', 345, 'Atrás do Super-mercado');

-- Inserindo boxes
insert into boxe (fkOficina) values
	(1), (1), (1), (1), (1), (1), (1), (1), (1), (1),
	(2), (2), (2), (2), (2), (2), (2), (2), (2), (2), (2), (2), (2), (2), (2),
	(3), (3), (3), (3), (3), (3), (3), (3), (3), (3), (3), (3), (3), (3);
    
-- Inserindo usuários
insert into usuario (fkOficina, nome, email, senha) values
	(1, 'Gamora', 'gamora@gmail.com', 'senha123'),
	(2, 'Tony Stark', 'tony.stark@gmail.com', 'senha456'),
	(3, 'Sue Storm', 'sue.storm@gmail.com', 'senha456');

-- Inserindo sensores
insert into sensor (statusSensor, fkBoxe) values
('Operante', 1), ('Operante', 2), ('Operante', 3), ('Operante', 4), ('Operante', 5), ('Operante', 6), ('Operante', 7), ('Operante', 8), ('Operante', 9), ('Operante', 10),
('Operante', 11), ('Operante', 12), ('Operante', 13), ('Operante', 14), ('Operante', 15), ('Operante', 16), ('Operante', 17), ('Operante', 18), ('Operante', 19), ('Operante', 20), ('Operante', 21), ('Operante', 22), ('Operante', 23), ('Operante', 24), ('Operante', 25),
('Operante', 26), ('Operante', 27), ('Operante', 28), ('Operante', 29), ('Operante', 30), ('Operante', 31), ('Operante', 32), ('Operante', 33), ('Operante', 34), ('Operante', 35), ('Operante', 36), ('Operante', 37), ('Operante', 38), ('Operante', 39),
('Inoperante', null), ('Inoperante', null);

/* Inserindo registro
insert into registro (fkSensor, resultado) values
	( , );
*/

/* -- Exibir todos os dados com alias (AS)
select 
o.id_oficina AS 'ID Oficina',
o.nome_fantasia AS 'Nome Fantasia',
o.cnpj AS 'CNPJ',
u.nome AS 'Nome Usuário',
s.status_sensor AS 'Status do Sensor'
from oficina_concessonaria o
join usuario u ON o.id_oficina = u.oficina
join sensor s ON o.id_oficina = s.local_sensor;

-- exibir dados com CASE
select
o.id_oficina,
o.nome_fantasia,
CASE 
when s.status_sensor = 'operante' then 'Ativo'
else 'Inativo'
END AS 'Estado do Sensor'
from oficina_concessonaria o
join sensor s ON o.id_oficina = s.local_sensor;

-- exibir dados com IFNULL
select
o.id_oficina,
o.nome_fantasia,
IFNULL(u.nome, 'Nenhum usuário') AS 'Nome Usuário'
from oficina_concessonaria o
left join usuario u ON o.id_oficina = u.oficina;
*/