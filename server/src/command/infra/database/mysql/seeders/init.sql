INSERT INTO company (name, city, status, plan_type, creation_date) 
VALUES 
  ('Empresa A', 101, 'active', 'premium', CURRENT_DATE()),
  ('Empresa B', 102, 'active', 'premium', CURRENT_DATE()),
  ('Empresa C', 101, 'active', 'premium', CURRENT_DATE()),
  ('Empresa D', 103, 'active', 'premium', CURRENT_DATE()),
  ('Empresa E', 104, 'active', 'premium', CURRENT_DATE());

INSERT INTO driver (company_id, city, first_name, last_name, email, phone, avatar_url, status, creation_date)
VALUES
  (1, 101, 'John', 'Doe', 'john.doe@example.com', '123-456-7890', 'https://example.com/avatar/john.jpg', 'active', CURRENT_DATE()),
  (2, 102, 'Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', 'https://example.com/avatar/jane.jpg', 'active', CURRENT_DATE()),
  (1, 101, 'Carlos', 'Martinez', 'carlos.martinez@example.com', '555-555-5555', 'https://example.com/avatar/carlos.jpg', 'active', CURRENT_DATE()),
  (3, 103, 'Maria', 'Lopez', 'maria.lopez@example.com', '666-666-6666', 'https://example.com/avatar/maria.jpg', 'active', CURRENT_DATE()),
  (2, 104, 'Lucas', 'Gonzalez', 'lucas.gonzalez@example.com', '444-444-4444', 'https://example.com/avatar/lucas.jpg', 'active', CURRENT_DATE());

INSERT INTO vehicle (driver_id, plate, model, type, capacity, creation_date)
VALUES
  (1, 'ABC-1234', 'Fusca', 'sedan', '4', CURRENT_DATE()),
  (2, 'XYZ-5678', 'Civic', 'sedan', '5', CURRENT_DATE()),
  (3, 'DEF-9876', 'Sprinter', 'truck', '12', CURRENT_DATE()),
  (4, 'GHI-2468', 'Hilux', 'pickup', '5', CURRENT_DATE()),
  (5, 'JKL-1357', 'Corsa', 'hatch', '4', CURRENT_DATE());
