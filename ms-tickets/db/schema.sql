-- base de datos de ms-tickets
CREATE DATABASE IF NOT EXISTS tickets_db;
USE tickets_db;

CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(30) NOT NULL UNIQUE,
  asunto VARCHAR(200) NOT NULL,
  prioridad ENUM('baja','media','alta') NOT NULL,
  estado ENUM('abierto','cerrado') NOT NULL,
  fecha DATE NOT NULL
);

INSERT INTO tickets (numero, asunto, prioridad, estado, fecha) VALUES
('T-001', 'No carga el portal', 'alta',  'abierto', '2026-11-01'),
('T-002', 'Solicitud de acceso', 'media', 'abierto', '2026-11-03'),
('T-003', 'Error en factura',    'baja',  'cerrado', '2026-11-05');