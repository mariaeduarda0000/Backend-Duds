const User = require("./user.js");  //chama user de user.js

//importa módulos
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs'); //criptografa a senha
const mysql = require("./mysql"); //importa funções de conexão com o mysql

const { error } = require("console");

class UserService {  //usa a classe userService para gerenciar usuários
    async addUser(nome, email, senha, endereco, telefone, cpf) {
        try {
        

            //Se o cpf estiver correto, sai do if e cadastra um novo usuário.
            const senhaCripto = await bcrypt.hash(senha, 10);

            const resultados = await mysql.execute(
                `INSERT  INTO usuários(nome, email, senha, endereço, telefone, CPF)
			            VALUES (?, ?, ?, ?, ?, ?);`,
                        [nome,email,senhaCripto, endereco, telefone, cpf]
            );
        return resultados;


        } catch (erro) {
            console.log("Falha ao criar um usuário!", erro);
            throw erro
        }
    }

    getUsers() {  //mostrar usuário
        try {
            return this.users;
        } catch (erro) {
            console.log("Falha ao armazenar o usuário.", erro);
            return [];
        }
    }

    deleteUser(id) { //precisa do id para excluir
        try {
            //filtra o usuário pelo id, na função ele cria um novo array onde o usuário com o id mencionado não está incluso.
            this.users = this.users.filter(user => user.id !== id) 
            this.saveUsers(); //salva

        } catch {
            console.log("Falha ao excluir usuário!");
        }
    }

    putUser(id) {
        try {
            this.users = this.users.update
        } catch {
            console.log("Falha ao alterar o usuário");
        }
    }

    async updateUser(id, nome, email, senha, endereco, telefone, cpf) {
        try {

            //criptografa a senha antes de atualizá-la
            const senhaCripto = await bcrypt.hash(senha, 10); 

            //query de atualização com await que espera antes de começar a executar outra coisa
            const update = await mysql.execute(
                `UPDATE  usuários
                 SET  nome = ?, email = ?, senha = ?, endereço = ? , telefone = ?, CPF = ?
                 WHERE  idUsuário =  ?;`,

                 //array em ordem que substitui as informações
                 [nome, email, senhaCripto, endereco, telefone, cpf, id]
            )

            return update;

        } catch (erro) {
            console.log("Erro ao atualizar o usuário", erro);
            throw erro;
        }
    }
}



module.exports = new UserService();
