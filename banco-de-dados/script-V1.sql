create database sprint1;
use sprint1;

-- tabelas do sistemas
create table oficina_concessonaria(
id_oficina int primary key auto_increment,
nome_fantasia varchar(70) not null,
cnpj char(18) not null,
email varchar(50) not null,
cep char(9) not null,
num_endereco int not null,
celular char(12) not null,
total_boxes int not null,
telefone char(11)
);

create table boxe (
id_boxe int primary key auto_increment,
local_boxe int not null
);

create table usuario (
id_usuario int primary key auto_increment,
oficina int not null,	
nome varchar(45) not null,
email varchar(50) not null,
senha varchar(20) not null
);

create table sensor (
id_sensor int primary key auto_increment,
status_sensor varchar(9) not null,
constraint chk_sensor check (status_sensor in('operante', 'inoperante')),
local_sensor int,
instalacao_boxe int
);

create table registro (
id_registro int primary key auto_increment,
sensor_origem int not null,
resultado int not null,
dt_hora datetime not null
);

-- inserção de valores nas tabelas
insert into oficina_concessonaria (nome_fantasia, cnpj, email, cep, num_endereco, celular, total_boxes, telefone) values
('Hyundai', '12.345.678/0001-90', 'hyundai@gmail.com', '12345-678', 100, '99 999999999', 10, '31 34455666');

insert into boxe (local_boxe) values
(1);

insert into usuario (oficina, nome, email, senha) values
(1, 'Peter Quill', 'peter.quill@gmail.com', 'senhaSegura123');

insert into sensor (status_sensor, local_sensor, instalacao_boxe) values
('operante', 1, 1);

insert into registro (sensor_origem, resultado, dt_hora) values
(1, 1, '2024-09-07 16:34:05'),
(1, 0, '2024-09-07 16:35:05');

-- visualização das oficinas
select id_oficina as 'oficina', nome_fantasia as 'nome', cnpj, email, cep, num_endereco, celular, telefone, total_boxes as 'boxes totais' from oficina_concessonaria;

-- visualização dos boxes
select id_boxe as 'boxe', local_boxe as 'oficina' from boxe;

-- visualização dos usuarios
select id_usuario as 'usuario', oficina, nome, email, senha from usuario;

-- visualização dos sensores
select id_sensor as 'sensor', status_sensor as 'status', local_sensor as 'oficina', instalacao_boxe as 'boxe' from sensor;

-- visualização dos registros
select id_registro as 'registro', sensor_origem as 'sensor', resultado, dt_hora as 'Data e Hora' from registro where dt_hora like '_____09%';

select * from registro where dt_hora like '___________16%';