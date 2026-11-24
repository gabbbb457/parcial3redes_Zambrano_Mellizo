-- base de datos de ms-tickets
SET NAMES utf8mb4;
CREATE TABLE tickets (
id        
INT AUTO_INCREMENT PRIMARY KEY,
numero    
asunto    
VARCHAR(30)  NOT NULL UNIQUE,
VARCHAR(200) NOT NULL,
prioridad ENUM('baja','media','alta') NOT NULL,
estado    
ENUM('abierto','cerrado')   NOT NULL,
fecha     
DATE NOT NULL,
equipo_id INT NOT NULL
);
INSERT INTO tickets (numero, asunto, prioridad, estado, fecha, equipo_id) 
VALUES
('T-001', 'No carga el portal',  'alta',  'abierto', '2026-11-01', 1),
('T-002', 'Solicitud de acceso', 'media', 'abierto', '2026-11-03', 1),
('T-003', 'Error en factura',    
'baja',  'cerrado', '2026-11-05', 1);