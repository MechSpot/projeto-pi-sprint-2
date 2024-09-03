create database sprint1;
use sprint1;

-- tabelas do sistemas
create table oficina_concessonaria(
id_oficina int primary key auto_increment,
nome_fantasia varchar(70) not null,
cnpj char(18) not null,
email varchar(50) not null,
cep char(9) not null,
num_oficina int not null,
celular char(12) not null,
telefone char(11)
);

create table usuario (
id_usuario int primary key auto_increment,
fk_oficina int,
email varchar(50) not null,
senha varchar(20) not null,
foreign key (fk_oficina) references oficina_concessonaria(id_oficina)
);

create table sensor (
id_sensor int primary key auto_increment,
status_sensor varchar(9) not null,
constraint chk_sensor check (status_sensor in('operante', 'inoperante')),
local_sensor int,
foreign key (local_sensor) references oficina_concessonaria(id_oficina)
);

create table registro (
id_registro int primary key auto_increment,
fk_sensor int,
resultado int,
dt_hora datetime,
foreign key (fk_sensor) references sensor(id_sensor)
);

-- inserção de valores nas tabelas
insert into oficina_concessonaria (nome_fantasia, cnpj, email, cep, num_oficina, celular, telefone) values
('Oficina ABC', '12.345.678/0001-90', 'contato@oficinaabc.com', '12345-678', 100, '99 999999999', '31 34455666');

insert into usuario (fk_oficina, email, senha) values
(1, 'usuario@oficinaabc.com', 'senhaSegura123');

insert into sensor (status_sensor, local_sensor) values
('operante', 1);

insert into registro (fk_sensor, resultado, dt_hora) values
(1, 1, '2024-09-03 14:30:00');

-- visualização dos registros
select fk_sensor as sensor, resultado, dt_hora as 'Data e Hora' from registro;