-- Creating the Database for Wello Inc.
CREATE USER IF NOT EXISTS 'wello_dev'@'localhost' IDENTIFIED BY 'Wello@2910';
CREATE DATABASE IF NOT EXISTS wello_db;
GRANT ALL PRIVILEGES ON wello_db.* TO 'wello_dev'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;