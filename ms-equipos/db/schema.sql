-- db/schema.sql — base de datos de ms-equipos
SET NAMES utf8mb4;

CREATE TABLE equipos (
  id                   INT AUTO_INCREMENT PRIMARY KEY,
  serial               VARCHAR(30) NOT NULL,
  descripcion          VARCHAR(100) NOT NULL,
  estado_equipo        VARCHAR(20) NOT NULL
);

INSERT INTO equipos (serial, descripcion, estado_equipo) VALUES
  ('SN-48A1', 'Portátil Lenovo T14', 'operativo'),
  ('SN-77K2', 'Impresora HP 4003', 'operativo'),
  ('SN-10Z9', 'Monitor Dell 24"', 'de_baja'),
  ('SN-55Q3', 'Router Cisco 1100', 'operativo');
