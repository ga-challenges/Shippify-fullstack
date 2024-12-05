CREATE TABLE company (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    city INT,
    status VARCHAR(20),
    plan_type VARCHAR(20),
    creation_date TIMESTAMP
);

CREATE INDEX name_idx ON company(name);
CREATE INDEX city_idx ON company(city);
CREATE INDEX creation_date_idx ON company(creation_date);

CREATE TABLE driver (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    company_id INT UNSIGNED,
    city INT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    avatar_url VARCHAR(200) NOT NULL,
    status VARCHAR(20),
    creation_date TIMESTAMP,
    CONSTRAINT company_key FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

CREATE INDEX driver_first_name_idx ON driver(first_name);
CREATE INDEX driver_creation_date_idx ON driver(creation_date);
CREATE INDEX driver_city_idx ON driver(city);

CREATE TABLE vehicle (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    driver_id INT UNSIGNED NOT NULL,
    plate VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    capacity VARCHAR(20) NOT NULL,
    creation_date TIMESTAMP,
    CONSTRAINT driver_key FOREIGN KEY (driver_id) REFERENCES driver(id) ON DELETE CASCADE
);

CREATE INDEX vehicle_type_idx ON vehicle(type);
CREATE INDEX vehicle_creation_date_idx ON vehicle(creation_date);
