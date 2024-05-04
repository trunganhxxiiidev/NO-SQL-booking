CREATE DATABASE UserService


CREATE TABLE UserBooking (
  id INT PRIMARY KEY IDENTITY,
  username NVARCHAR(255) NOT NULL,
  full_name NVARCHAR(255) NOT NULL,
  password NVARCHAR(255) NOT NULL,
  phone_number NVARCHAR(255),
  address NVARCHAR(MAX)
);

INSERT INTO UserBooking (username, full_name, password, phone_number, address)
VALUES ('john_doe', 'John Doe', 'password123', '1234567890', '123 Main Street');

select * from UserBooking