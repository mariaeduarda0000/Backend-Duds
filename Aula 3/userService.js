const User = require("./user.js");  //chama user de user.js

//importa módulos
const path = require('path');  
const fs = require('fs');  

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

    addUser(nome, email, senha, endereco,telefone, cpf){  ;//adicionar usuário
        try {
            if(this.users.some(user => user.cpf === cpf)){
                console.log("Cpf já cadastrado!");      //verifica se o cpf já existe, compara com o que está dentro do array
                return null
            }

            //Se o cpf estiver correto, sai do if e cadastra um novo usuário.

            const user = new User(this.nextId++, nome, email, senha, endereco, telefone, cpf);
            this.users.push(user);  
            this.saveUsers();
            return user;  
        } catch (erro) {
            console.log("Falha ao criar um usuário!", erro);
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

    deleteUser(id){ //precisa do id para excluir
        try{
            this.users =  this.users.filter(user => user.id !==id) //filtra o usuário pelo id, na função ele cria um novo array onde o usuário com o id mencionado não está incluso.
            this.saveUsers(); //salva

        }catch{
            console.log("Falha ao excluir usuário!");
        }
    }

    putUser(id){
        try{
            this.users = this.users.update 
        }catch{
            console.log("Falha ao alterar o usuário");
        }
    }

}  

module.exports = new UserService();
