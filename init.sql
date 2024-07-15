CREATE USER IF NOT EXISTS 'salvus'@'%' IDENTIFIED BY 'salvus';
GRANT ALL PRIVILEGES ON *.* TO 'salvus'@'%';
FLUSH PRIVILEGES;
SET time_zone = 'America/Sao_Paulo';
