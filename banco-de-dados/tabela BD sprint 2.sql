create database group1;
use group1;

-- criar tabela oficina
create table oficina_concessonaria (
    id_oficina int primary key auto_increment,
    nome_fantasia varchar(70) not null,
    cnpj char(18) not null unique,
    email varchar(50) not null,
    celular char(12) not null,
    telefone char(11),
    total_boxes int not null,
    razao_social varchar(100), -- nova coluna adicionada
    representante_legal varchar(100) -- nova coluna adicionada
);

-- criar tabela endereco
create table endereco (
    idEndereco int primary key auto_increment,
    cep char(9) not null,
    numero int not null,
    complemento varchar(45),
    fkOficina int,
    foreign key (fkOficina) 
    references oficina_concessonaria(id_oficina)
);

-- Tabela de boxes
create table boxe (
    id_boxe int primary key auto_increment,
    local_boxe int not null,
    foreign key (local_boxe) 
    references oficina_concessonaria(id_oficina)
);

-- Tabela de usuários
CREATE TABLE usuario (
    id_usuario int primary key auto_increment,
    oficina int not null,
    nome varchar(45) not null,
    email varchar(50) not null unique,
    senha varchar(20) not null,
    foreign key (oficina) 
    references oficina_concessonaria(id_oficina)
);

-- Tabela de sensores
create table sensor (
    id_sensor int primary key auto_increment,
    status_sensor varchar(15) not null, -- substituindo enum por varchar
    local_sensor int,
    instalacao_boxe INT,
    foreign key (local_sensor) 
    references oficina_concessonaria(id_oficina),
    foreign key (instalacao_boxe) 
    references boxe(id_boxe)
);

-- Tabela de registros
create table registro (
    id_registro int primary key auto_increment,
    sensor_origem int not null,
    resultado int not null,
    dt_hora datetime default current_timestamp not null,
    foreign key (sensor_origem) 
    references sensor(id_sensor)
);

-- Inserção de registros /Inserindo oficinas
INSERT INTO oficina_concessonaria (nome_fantasia, cnpj, email, celular, telefone, total_boxes, razao_social, representante_legal) 
VALUES
('Hyundai', '12.345.678/0001-90', 'hyundai@gmail.com', '99 999999999', '31 34455666', 10, 'Hyundai Motors', 'João Silva'),
('Fiat', '98.765.432/0001-10', 'fiat@gmail.com', '99 88888888', '31 11112222', 5, 'Fiat Automóveis', 'Maria Souza'),
('Toyota', '11.223.344/0001-20', 'toyota@gmail.com', '99 77777777', '31 22223333', 15, 'Toyota do Brasil', 'Carlos Pereira'),
('Ford', '22.334.455/0001-30', 'ford@gmail.com', '99 66666666', '31 33334444', 20, 'Ford Company', 'Ana Lima'),
('Volkswagen', '33.445.566/0001-40', 'vw@gmail.com', '99 55555555', '31 44445555', 12, 'Volkswagen Brasil', 'Rafael Costa');

-- Inserindo endereços
INSERT INTO endereco (cep, numero, complemento, fkOficina) 
VALUES
('12345-678', 100, 'Apto 1', 1),
('23456-789', 200, NULL, 2),
('34567-890', 300, 'Casa 5', 3),
('45678-901', 400, NULL, 4),
('56789-012', 500, 'Ponto Comercial', 5);

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

-- Inserindo sensores
insert into sensor (status_sensor, local_sensor, instalacao_boxe) 
values
('operante', 1, 1),
('inoperante', 2, 2),
('operante', 3, 3),
('inoperante', 4, 4),
('operante', 5, 1);

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
