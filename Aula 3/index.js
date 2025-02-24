const express = require("express");  
const userService = require("./userService");  

const app = express(); // Cria uma nova aplicação Express  
app.use(express.json()); // Habilita o parsing de JSON nas requisições  

// Rota para criar um usuário  
app.post("/user", (req, res) => {  
    const { nome, email } = req.body; // Extrai nome e email do corpo da requisição  
    if (!nome || !email) { // Verifica se nome ou email estão ausentes  
        return res.status(400).json({ error: "Nome e email são obrigatórios" }); // Retorna erro 400 se faltarem dados  
    }  

    const user = userService.addUser(nome, email); // Adiciona o usuário ao serviço de usuários  
    return res.status(201).json({ user }); // Retorna o usuário criado com status 201  
});  

// Rota para mostrar todos os usuários  
app.get("/user", (req, res) => {  
    const users = userService.getUsers(); // Chama a função para obter os usuários  
    return res.json(users); // Retorna a lista de usuários em formato JSON  
});  

const port = 3000; // Define a porta em que o servidor irá escutar  
app.listen(port, () => {  
    console.log("Servidor rodando na porta", port); // Mensagem de confirmação de que o servidor está rodando  
});