const express = require("express");
const userService = require ("./userService");

const app = express(); // Cria uma instância do aplicativo Express
app.use(express.json()); // Configura o Express para interpretar requisições com corpo no formato JSON


//rota para criar usuario
app.post("/users", async (req, res)=>{
    const {nome, email, senha, endereco, telefone, cpf} = req.body;
    if(!nome || !email || !senha || !endereco || !telefone || !cpf){   // Verifica se todos os campos obrigatórios foram fornecidos
        return res.status(400).json
        ({error: "nome e email são obrigatorios"})
    }

    const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf);  // Chama a função "addUser" do userService para adicionar o usuário
    res.status(200).json({user});
})

//rota para listar todos os usuários
app.get("/users", (req, res)=>{
    res.json(userService.getUsers());  // Retorna a lista de usuários chamando "getUsers" do userService. Get = mostrar
});


//porta onde o servidor está rodando

const port = 3000; 
app.listen(port,() =>{
    console.log("Servidor rodando na porta:", port);  //se estiver rodando mostra a mensagem
})


//excluir o usuário através do id

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id); //converte o id para número
    try{
        id = Number(id);  //converte para um numero
        const resultado = userService.deleteUser(id); //tenta excluir o usuário
        res.status(200).json(resultado); //se der certo, retorna a mensagem
    }catch{
        res.status(404).json({error: erro.message}); //caso de errado, retorna a mensagem de erro
    }
})

app.delete("/users", (req, res) => {
    const id = req.params.id; // pega o ID 

    const resultado = userService.deleteUser(id); // Chama o método corrigido

    if (resultado.error) {
        return res.status(404).json(resultado); // Retorna erro caso o ID não exista
    }

    res.status(200).json(resultado);
})

