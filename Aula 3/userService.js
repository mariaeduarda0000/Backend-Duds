const User = require("./user.js");  
const path = require('path'); //manipular caminhos de qualquer lugar
const fs = require('fs'); //file system = manipulação de arquivos externos

class UserService {  
    constructor() {  
        this.filePath = path.join(_dirname, 'user.json');
        this.users = [];  //Array que armazena os usuários
        this.nextId = 1; //contador, armazena o id
    }  

    loadUser(){
        try{ //tenta executar o que está dentro de if


        if(fs.existsSync(this.filePath)){  //verifica se há algo escrito no json
            const data = fs.readFileSync(this.filePath); //se tiver, ele lerá o que está escrito e jogar dentro de "data"
            return JSON.parse(data);
        }}
        catch(erro){ //se houver erro ele vai mostrar qual é
            console.log("Erro ao carregar o arquivo!"); 
        }
        return []; //quebra o código, retorna vazio
    }

    //define o próximo id

    getNextId(){
        try{
        if(this.users.length===0) return 1;
        return Math.max(...this.users.map(user => user.id))+1 //identifica o maior número presente e soma mais um.
        }catch(erro){
            console.log('Erro na busca pelo id')
        }
    }


    //Cria um novo usuário
    
    addUser(nome, email) {  
        try{
        const user = new User(this.nextId++, nome, email);  //"++" soma um id
        this.users.push(user); //adiciona um usuário no array
        }catch(erro){
            console.log("Falha ao criar um usuário!")
        }
        return user;  
    }  

    getUsers() {  
        try{
        return this.users;
        }catch(erro){
            console.log("Falha ao armazenar o usuário.")
        } 
    }  
}  

module.exports = new UserService(); 