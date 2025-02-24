const User = require("./user.js"); // Importa a classe User  

class UserService {  
    constructor() {  
        this.users = []; // Array para armazenar usuários  
        this.nextId = 1; // Contador para gerar IDs  
    }  

    addUser(nome, email) {  
        const user = new User(this.nextId++, nome, email); // Cria um novo usuário  
        this.users.push(user); // Adiciona o usuário ao array  
        return user; // Retorna o usuário criado  
    }  

    getUsers() {  
        return this.users; // Retorna todos os usuários armazenados  
    }  
}  

module.exports = new UserService(); // Exporta uma nova instância do UserService