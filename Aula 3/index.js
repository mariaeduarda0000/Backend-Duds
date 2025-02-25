const express = require("express");
const userService = require ("./userservice");

const app = express();
app.use(express.json());

//rota para criar usuario

app.post("/users", (req, res)=>{
    const {nome, email, senha, endereco, telefone, cpf} = req.body;
    if(!nome || !email || !senha || !endereco || !telefone || !cpf){
        return res.status(400).json
        ({error: "nome e email são obrigatorios"})
    }

    const user = userService.addUser(nome, email, senha, endereco, telefone, cpf);
    res.status(200).json({user});
})

//rota para listar todos os arquivos
app.get("/users", (req, res)=>{
    res.json(userService.getUsers());
});

const port = 3000;
app.listen(port,() =>{
    console.log("Servidor rodando na porta:", port);
})

