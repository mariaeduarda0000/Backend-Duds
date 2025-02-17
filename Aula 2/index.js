//Classe base Usuário

class Usuario {
    constructor(nome, email, senha){ //construtor com três objetos.
        this.nome = nome; //para chamar o valor que tá dentro do construtor usa o this.variável.
        this.email = email;
        this._senha = senha; //atributo privado, o "_" torna a senha privada, só quem tá dentro da classe a acessa.
    }

    autenticar(senha) {
        return senha === this._senha;
    }

    alterarSenha(novaSenha){
        this._senha = novaSenha; //vai trocar essa nova senha pela antiga.
        console.log("Senha alterada!");
    }
}



//Classe filho, admin que herda de usuário.

class Admin extends Usuario{
    constructor(nome, email, senha, nivelAcesso){
        super(nome, email, senha) //chama o construtor da classe
        this.nivelAcesso = nivelAcesso
    }

    banirUsuario(usuário){
        console.log(`${usuário.nome} foi banido pelo admin ${this.nome}`)
    }

    //polimorfismo sobrepondi o método autenticar
    autenticar(senha){
        return senha === this._senha && this.nivelAcesso === 'alto';
    }
}



//Uso da classe

const Usuario1 = new Usuario('Duda', 'duds@gmail.com', '1515'); //new = criar, as informações são colocadas em ordem.
const Usuario2 = new Admin('Maria', 'maria@gmail.com', '1010', 'alto');

//As informações vão para o terminal se a senha estiver correta
console.log(Usuario1.autenticar('1515')); //true
console.log(Usuario2.autenticar('1010')); //false
Usuario2.banirUsuario(Usuario1);
console.log(Usuario1.alterarSenha('testesenha')); //mudar a senha
console.log(Usuario1.autenticar('testesenha')); //autenticar a nova senha
 
