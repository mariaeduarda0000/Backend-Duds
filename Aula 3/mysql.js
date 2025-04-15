const { error } = require('console');
const mysql = require('mysql2');
const { resolve } = require('path');

const pool = mysql.createConnection({  //faz a conexão 
    "user": "root",
    "password": "root",
    "database": "idev3",
    "host": "localhost",
    "port": "3307"
});

exports.execute = (query, param = [], varpool=pool) => { 
    return new Promise((resolve, reject) =>{ //faz esperar para executar o resto, assíncrono = linha/linha
        varpool.query(query, param, (error, results) => {

            if(error){  //se der erro, executa o if
                reject(error) 
            }else{
                resolve(resolve); //se der certo, executa o else
            }
        });
    }); 
}

exports.pool = pool;