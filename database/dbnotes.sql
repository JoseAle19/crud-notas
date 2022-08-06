create database administradorcontraseña;
use administradorcontraseña;


create table users(
id_user int not null auto_increment,
Email varchar(50) not null unique, ##para que solo pueda aceptar un soo tipo de correo
Password text not null, ##tipo text para poder encriptar la contraseña
Name varchar(30) not null,
Last_name varchar(30) not null,
Phone varchar(50) not null unique,
Age int(4),
answerques text not null,
Created timestamp,
Updated timestamp DEFAULT CURRENT_TIMESTAMP,
 primary key(id_user)
)engine InnoDB;

create table Category(
id_Category int not null auto_increment,
Description_category varchar(40) not null,
id_users int not null,
foreign key(id_users) references users(id_user) on update cascade on delete cascade,
primary key(id_Category)
)engine InnoDB;

create table Note(
id_note int not null auto_increment,
Tittle varchar(40) not null,
email varchar(30),
password text,
id_users int not null,
id_category int not null,
foreign key(id_users) references users(id_user) on update cascade on delete cascade,
foreign key(id_category) references category(id_Category) on update cascade on delete cascade,
primary key(id_note)
)engine InnoDB;





 
 delimiter //
 
 create procedure isvalidcategory(
 in  _descr varchar(50),
 in _iduser int,
 out _res int
 )
 begin
 select count(*) into _res from category where Description_category = _descr and id_users = _iduser ;
 
 if (_res > 0) then
		select "Esta categoria ya existe";
    else 
		insert into category(Description_category, id_users) values(_descr,_iduser);
 end if;
 end // 
 
 delimiter ; 
 
