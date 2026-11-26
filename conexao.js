const mysql = require('mysql2/promise');
const conexao = mysql.createPool({
host: 'localhost',
user: 'root',
password: 'alunolab', // troque pela senha do MySQL da sua máquina
database: 'biblioteca',
port: 3306,
dateStrings: true // devolve a data como '2026-11-03', sem fuso horário
});
module.exports = conexao;