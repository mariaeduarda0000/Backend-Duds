const express = require('express'); //biblioteca express

const maria = express(); //dá um nome para o express

const port = 3000; //porta

maria.get('/', (req, res) => {  //função oculta
    res.send ('Olá mundo!');  //res = resposta, send = mensagem. Trará a mensagem "Olá mundo!".
});

maria.get('/home', (req, res) => { 
    res.send ('Pagina home');  //res = resposta, send = mensagem. Trará a mensagem "Pagina home".
});

maria.get('/login', (req, res) => {  
    res.send ('Pagina login');  //res = resposta, send = mensagem. Trará a mensagem "Pagina login".
});

maria.listen(port, () => {
    console.log('Servidor rodando na porta: ', port);
})

