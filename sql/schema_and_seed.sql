-- MySQL schema for hotel dashboard demo

USE hotel_dashboard;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50),
  email VARCHAR(120)
);

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number VARCHAR(10) NOT NULL,
  type VARCHAR(50),
  status ENUM('available','occupied','dirty','maintenance') DEFAULT 'available'
);

DROP TABLE IF EXISTS reservations;
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT,
  guest_name VARCHAR(120),
  checkin DATE,
  checkout DATE,
  is_vip TINYINT(1) DEFAULT 0,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS housekeeping_tasks;
CREATE TABLE housekeeping_tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  notes TEXT,
  priority ENUM('low','medium','high') DEFAULT 'medium',
  assigned_to INT,
  room_id INT,
  status ENUM('pending','in_progress','completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL
);

-- seed some data
INSERT INTO users (name, role, email) VALUES
('Maria Johnson','Housekeeper','maria@example.com'),
('Robert Smith','Housekeeper','robert@example.com'),
('Anna Johnson','Housekeeper','anna@example.com');

INSERT INTO rooms (number,type,status) VALUES
('101','Single','available'),
('215','Double','occupied'),
('301','Single','dirty'),
('412','Suite','available'),
('102','Double','occupied');

INSERT INTO reservations (room_id,guest_name,checkin,checkout,is_vip) VALUES
(2,'Alice Walker', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0),
(5,'VIP Guest', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1);

INSERT INTO housekeeping_tasks (title, notes, priority, assigned_to, room_id, status) VALUES
('Clean Room','Standard cleaning required after guest checkout. Replace all amenities.','high',1,3,'in_progress'),
('Deep Clean','Monthly deep cleaning. Focus on bathroom and carpet cleaning.','medium',2,2,'pending'),
('Restock Minibar','Guest requested additional items. Restock soda and snacks.','low',3,4,'completed');
