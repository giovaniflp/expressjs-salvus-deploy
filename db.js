const dotenv = require('dotenv')
const mysql = require('mysql2')
require('dotenv').config()

  const dbConfig = {
    host: "roundhouse.proxy.rlwy.net",
    user: "root",
    password: "QYaouSmHJmCUYcjyufQfDjCQhtIhhSgz",
    database: "railway",
    port: 35515
  };

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
  });

module.exports = connection;