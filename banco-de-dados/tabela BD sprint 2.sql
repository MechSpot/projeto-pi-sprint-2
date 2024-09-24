create database group1;
use group1;

-- criar tabela oficina
-- Tabela de oficinas
create table oficina_concessonaria (
    id_oficina int primary key auto_increment,
    nome_fantasia varchar(70) not null,
    cnpj char(18) not null unique,
    email varchar(50) not null,
    cep char(9) not null,
    num_endereco int not null,
    celular char(12) not null,
    telefone char(11),
    total_boxes int not null
);
desc oficina_concessonaria;

-- Tabela de boxes
create table boxe (
    id_boxe int primary key auto_increment,
    local_boxe int not null,
    foreign key (local_boxe) 
    references oficina_concessonaria(id_oficina) on delete cascade
);
desc boxe;

-- Tabela de usuários
CREATE TABLE usuario (
    id_usuario int primary key auto_increment,
    oficina int not null,
    nome varchar(45) not null,
    email varchar(50) not null unique,
    senha varchar(20) not null,
    foreign key (oficina) 
    references oficina_concessonaria(id_oficina) on delete cascade
);
desc usuario;

-- Tabela de sensores
create table sensor (
    id_sensor int primary key auto_increment,
    status_sensor enum('operante', 'inoperante') not null,
    local_sensor int,
    instalacao_boxe INT,
    foreign key (local_sensor) references oficina_concessonaria(id_oficina),
    foreign key (instalacao_boxe) references boxe(id_boxe)
);
desc sensor;

-- Tabela de registros
create table registro (
    id_registro int primary key auto_increment,
    sensor_origem int not null,
    resultado int not null,
    dt_hora datetime not null,
    foreign key (sensor_origem) references sensor(id_sensor) on delete cascade
);
desc registro;

-- inserção de registros /Inserindo oficinas
INSERT INTO oficina_concessonaria (nome_fantasia, cnpj, email, cep, num_endereco, celular, telefone, total_boxes) 
VALUES
('Hyundai', '12.345.678/0001-90', 'hyundai@gmail.com', '12345-678', 100, '99 999999999', '31 34455666', 10),
('Fiat', '98.765.432/0001-10', 'fiat@gmail.com', '23456-789', 200, '99 88888888', '31 11112222', 5),
('Toyota', '11.223.344/0001-20', 'toyota@gmail.com', '34567-890', 300, '99 77777777', '31 22223333', 15),
('Ford', '22.334.455/0001-30', 'ford@gmail.com', '45678-901', 400, '99 66666666', '31 33334444', 20),
('Volkswagen', '33.445.566/0001-40', 'vw@gmail.com', '56789-012', 500, '99 55555555', '31 44445555', 12);

select * from oficina_concessonaria;

-- Inserindo boxes
insert into boxe (local_boxe) 
values
(1), (1), (2), (3), (4);

-- Inserindo usuários
insert into usuario (oficina, nome, email, senha) 
values
(1, 'Peter Quill', 'peter.quill@gmail.com', 'senhaSegura123'),
(2, 'Gamora', 'gamora@gmail.com', 'senhaSegura456'),
(3, 'Drax', 'drax@gmail.com', 'senhaSegura789'),
(4, 'Rocket', 'rocket@gmail.com', 'senhaSegura101'),
(5, 'Groot', 'groot@gmail.com', 'senhaSegura202');

select * from usuario;

-- Inserindo sensores
insert into sensor (status_sensor, local_sensor, instalacao_boxe) 
values
('operante', 1, 1),
('inoperante', 2, 2),
('operante', 3, 3),
('inoperante', 4, 4),
('operante', 5, 1);
select * from sensor;

-- Inserindo registros
insert into registro (sensor_origem, resultado, dt_hora) 
values
(1, 1, '2024-09-07 16:34:05'),
(2, 0, '2024-09-07 16:35:05'),
(3, 1, '2024-09-07 16:36:05'),
(4, 0, '2024-09-07 16:37:05'),
(5, 1, '2024-09-07 16:38:05');
select * from registro;

-- Exibir todos os dados com alias (AS)
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







