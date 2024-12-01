create database testeGrupo;

use testeGrupo;

-- criar tabela oficina
create table oficina (
    idOficina int primary key auto_increment,
	cnpj varchar(18) not null unique,
    nomeFantasia varchar(70) not null,
    razaoSocial varchar(100) not null,
    representanteLegal varchar(45) not null,
    celular varchar(12) not null,
    telefone varchar(11),
    qtdBoxe int,
    chaveAcesso char(3)
);

-- criar tabela login
create table login (
	idLogin int auto_increment,
    fkOficina int,
    constraint pkCompostaLogin primary key (idLogin, fkOficina),
    constraint fkloginOficina foreign key (fkOficina) references oficina(idOficina),
    email varchar(50),
    senha varchar(100)
);

-- criar tabela endereco
create table endereco(
    idEndereco int auto_increment,
    fkOficina int,
    constraint pkCompostaEndereco primary key (idEndereco, fkOficina),
	constraint fkEnderecoOficina foreign key (fkOficina) references oficina(idOficina),
    cep char(9) not null,
    numero int not null,
    complemento varchar(45)
);

-- Tabela de boxes
create table boxe (
    idBoxe int,
    fkOficina int not null,
    constraint pkCompostaBoxe primary key (idBoxe, fkOficina),
    constraint fkBoxeOficina foreign key (fkOficina) references oficina(idOficina)
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

select * from oficina;
select * from login;
select * from endereco;
select * from boxe;

insert into sensor values
	(default, 'Operante', 1),
	(default, 'Operante', 2),
	(default, 'Operante', 3);
    
insert into registro values
	(default, 1, 1, '2024-11-29 09:00:00');
	(default, 1, 1, '2024-11-30 09:10:00'),
	(default, 1, 1, '2024-11-30 09:20:00'),
	(default, 2, 1, '2024-11-30 09:30:00'),
	(default, 2, 1, '2024-11-30 09:40:00'),
	(default, 2, 1, '2024-11-30 09:50:00'),
	(default, 3, 1, '2024-11-30 10:00:00'),
	(default, 3, 1, '2024-11-30 10:10:00'),
	(default, 3, 1, '2024-11-30 10:20:00');
    
    
insert into registro values
	(default, 1, 1, '2024-11-20 11:00:00');
    
select sum(resultado) from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = 1 and dtHora like '2024-11-30%' group by (select hour(dtHora) from registro);

select sum(res.resultado) movimentoDiario, hour(res.dtHora) hora from (select * from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = 1 and dtHora like '2024-11-30%') res group by hour(res.dtHora) order by hour(dtHora);

select sum(res.resultado) movimentoSemanal, dayname(res.dtHora) diaSemanal, dayofweek(res.dtHora) dia
from (select * from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = 1) res
group by dayname(res.dtHora), dayofweek(res.dtHora) order by dayofweek(res.dtHora);

select week(res.dtHora) semana, sum(res.resultado) movimentoSemanal
from (select * from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = 1) res 
where month(res.dtHora) = 11 group by week(res.dtHora);

select  week(res.dtHora) semana, dayname(res.dtHora) diaSemana, dayofweek(res.dtHora) dia, sum(res.resultado) movimentoSemanal
FROM (select * from registro join sensor on fkSensor = idSensor join boxe on idBoxe = fkBoxe where fkOficina = 1) res 
where WEEK(res.dtHora) = week(date_sub(now(), interval 0 week))
group by week(res.dtHora), dayname(res.dtHora), dayofweek(res.dtHora)
order by semana, dia;