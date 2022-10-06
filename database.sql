CREATE DATABASE if not exists Library;

USE Library;

CREATE TABLE if not exists books(
	id int primary key auto_increment not null,
	title varchar(45) not null,
    descri text not null,
    cover varchar(45)
   # price decimal(5, 2) not null
);
desc books;
ALTER TABLE books add price decimal(5, 2) not null;

INSERT INTO books VALUES
(default, "Can't hurt me", "A great book", "COVER")
