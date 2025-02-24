const User = require("./user.js");  
const path = require('path'); //manipular caminhos de qualquer lugar
const fs = require('fs'); //file system = manipulação de arquivos externos

class UserService {  
    constructor() {  
        this.users = [];  
        this.nextId = 1;   
    }  

    addUser(nome, email) {  
        const user = new User(this.nextId++, nome, email);   
        this.users.push(user); 
        return user;  
    }  

    getUsers() {  
        return this.users; 
    }  
}  

module.exports = new UserService(); 