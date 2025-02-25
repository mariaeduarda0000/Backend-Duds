const User = require("./user.js");  
const path = require('path');  
const fs = require('fs');  

class UserService {  
    constructor() {  
        this.filePath = path.join(__dirname, 'user.json');
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

    getNextId() {
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;
        } catch (erro) {
            console.log("Erro na busca pelo ID", erro);
            return 1; // Retorna 1 para evitar problemas
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2));  
        } catch (erro) {
            console.log("Erro ao salvar o arquivo!", erro);
        }
    }

    addUser(nome, email) {  
        try {
            const user = new User(this.nextId++, nome, email);  
            this.users.push(user);  
            this.saveUsers();
            return user;  
        } catch (erro) {
            console.log("Falha ao criar um usuário!", erro);
        }
    }  

    getUsers() {  
        try {
            return this.users;
        } catch (erro) {
            console.log("Falha ao armazenar o usuário.", erro);
            return [];
        } 
    }  
}  

module.exports = new UserService();
