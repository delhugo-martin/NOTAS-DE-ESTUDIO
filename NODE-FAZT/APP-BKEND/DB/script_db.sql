/* script de la DB */
CREATE DATABASE IF NOT EXIST ejemploFaztDB;

USE ejemploFaztDB;

CREATE TABLE empleado(
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(20) DEFAULT NULL,
    salario INT(80) DEFAULT NULL,
    PRIMARY KEY id
)
