const express = require("express"); //biblioteca dentro do node(js) - rota, transfere dados
const userService = require("./userService");

const app = express(); // Cria uma instância do aplicativo Express
app.use(express.json()); // Configura o Express para interpretar requisições com corpo no formato JSON


//rota para criar usuario
app.post("/users", async (req, res) => {
    try {
        const { nome, email, senha, endereco, telefone, cpf } = req.body;

         // Verifica se todos os campos obrigatórios foram fornecidos
        if (!nome || !email || !senha || !endereco || !telefone || !cpf) {   
            return res.status(400).json
                ({ error: "nome e email são obrigatorios" })
        }

        // Chama a função "addUser" do userService para adicionar o usuário
        const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf); 
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });

    } catch (erro) {
        console.log(erro);
        res.status(400).json({ error: erro.message });
    }
});

//rota para listar todos os usuários
app.get("/users", (req, res) => {
    res.json(userService.getUsers());  // Retorna a lista de usuários chamando "getUsers" do userService. Get = mostrar
});


//porta onde o servidor está rodando
const port = 3000;

 //se estiver rodando mostra a mensagem
app.listen(port, () => {
    console.log("Servidor rodando na porta:", port); 
})


//excluir o usuário através do id



app.delete("/users/:id", async (req, res) => { // Adicionado "async"
    const id = parseInt(req.params.id); // Converte o id para número
    try {
        const resultado = await userService.deleteUser(id); // Aguarda o retorno da função assíncrona
        if (resultado.mensagem === "Usuário não encontrado!") {
            return res.status(404).json(resultado); // Retorna 404 se o usuário não for encontrado
        }
        res.status(200).json(resultado); // Retorna 200 se o usuário for excluído com sucesso
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna 500 em caso de erro no servidor
    }
});

//atualizar o usuário
app.put("/users/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id); // converte para número
        const { nome, email, senha, endereco, telefone, cpf } = req.body; 

        // Verifica se os dados foram enviados
        if (!nome || !email || !senha || !endereco || !telefone || !cpf) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
        }

        // Chama a função do userService para atualizar o usuário
        const resultado = await userService.updateUser(id, nome, email, senha, endereco, telefone, cpf);

        res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", resultado });
    } catch (erro) {
        console.error("Erro na atualização do usuário:", erro);
        res.status(400).json({ error: erro.message });
    }
});