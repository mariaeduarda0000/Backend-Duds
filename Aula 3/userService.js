const User = require("./user.js");

//importando módulos
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs'); //criptografa a senha
const mysql = require("./mysql"); //importa funções de conexão com o mysql

const { error } = require("console");

//usa a classe userService para gerenciar usuários
class UserService { 

//função asincrona para executar somente qnd determinada linha for terminada.
    async addUser(nome, email, senha, endereco, telefone, cpf) {
        try {
        
        //Se o cpf estiver correto, sai do if e cadastra um novo usuário.
            const senhaCripto = await bcrypt.hash(senha, 10);

        //executa a query para criar os usuários
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

    async getUser(id) {  //buscar um usuário
        //pega o parâmetro passado e verifica se o usuário existe
        try { 
           const resultado = await mysql.execute(
            `SELECT id FROM usuários WHERE id = ?`, //executa a query de acordo com o id
            [id]
           )
        } catch (erro) {
            console.log("Falha ao encontrar o usuário.", erro);
            return [];
        }
    }

    async deleteUser(id) { //precisa do id para excluir
        try {
            //filtra o usuário pelo id, na função ele cria um novo array onde o usuário com o id mencionado não está incluso.
            const user = await this.getUser(id);
            
          
            if (user.length == 0){
                console.log("Usuário não existe!");
                return;
            }
            const resultado = await mysql.execute(`DELETE FROM usuários WHERE id = ?`, [id]);
            
            console.log("Usuário excluído com sucesso!");
            return { mensagem: "Usuário excluído com sucesso!" };
       } catch (error) {
        console.log("Falha ao excluir usuário!", error.message);
        return { mensagem: "Falha ao excluir usuário!", erro: error.message };
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
                 WHERE  id =  ?;`,

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
