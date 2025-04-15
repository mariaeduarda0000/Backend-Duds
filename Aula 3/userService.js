const User = require("./user.js");  //chama user de user.js

//importa módulos
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs'); //criptografa a senha
const mysql = require("./mysql"); //importa funções de conexão com o mysql

const { error } = require("console");

class UserService {  //usa a classe userService para gerenciar usuários
    constructor() {
        this.filePath = path.join(__dirname, 'user.json'); //caminho json onde fica os usuários armazenados
        this.users = this.loadUser();
        this.nextId = this.getNextId();
    }

    loadUser() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf8');

                if (!data.trim()) { // Verifica se o arquivo está vazio
                    return [];
                }

                return JSON.parse(data);
            }
        } catch (erro) {
            console.log("Erro ao carregar o arquivo!", erro);
        }
        return [];
    }

    getNextId() { //id novo
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;
        } catch (erro) {
            console.log("Erro na busca pelo ID", erro);
            return 1; // Retorna 1 para evitar problemas
        }
    }

    saveUsers() { //salvar usuários
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2));
        } catch (erro) {
            console.log("Erro ao salvar o arquivo!", erro);
        }
    }

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
