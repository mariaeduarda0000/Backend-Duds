const User = require("./user.js");  
const path = require('path'); //manipular caminhos de qualquer lugar
const fs = require('fs'); //file system = manipulação de arquivos externos
const { json } = require("body-parser");


class UserService {  
    constructor() {  
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUser();  
        this.nextId = this.getUsers();  //contador, armazena o id
    }  


    loadUser(){
        try{ //tenta executar o que está dentro de if


        if(fs.existsSync(this.filePath)){  //verifica se há algo escrito no json
            const data = fs.readFileSync(this.filePath); //se tiver, ele lerá o que está escrito e jogar dentro de "data"
            return JSON.parse(data);
        }}
        catch(erro){ //se houver erro ele vai mostrar qual é
            console.log("Erro ao carregar o arquivo!", erro); 
        }
        return []; //quebra o código, chama o array vazio de userService
    }



    //define o próximo id

    getNextId(){
        try{
        if(this.users.length===0) return 1;
        return Math.max(...this.users.map(users => users.id))+1 //identifica o maior número presente e soma mais um.
        }catch(erro){
            console.log("Erro na busca pelo id", erro)
        }
    }



    saveUsers(){
        try{
        fs.writeFileSync(this.filePath, JSON.strigify(this.users)); //chama a biblioteca fs e "escreve" o arquivo em formato json
        }catch(erro){
            console.log("Erro ao salvar o arquivo!");
        }
    }



    //Cria um novo usuário
    
    addUser(nome, email) {  
        try{
        const user = new User(this.nextId++, nome, email);  //"++" soma um id
        this.users.push(this.users); //adiciona um usuário no array
        this.saveUsers();
        }catch(erro){
            console.log("Falha ao criar um usuário!", erro)
        }
        return users;  
    }  



    getUsers() {  
        try{
        return this.users;
        }catch(erro){
            console.log("Falha ao armazenar o usuário.", erro)
        } 
    }  
}  


module.exports = new UserService(); 