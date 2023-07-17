USE Nifty;
CREATE TABLE users (
  email VARCHAR(255) Primary Key,
  firstname VARCHAR(255)  NOT NULL,
  lastname VARCHAR(255)  NOT NULL,
  password VARCHAR(255) NOT NULL
);