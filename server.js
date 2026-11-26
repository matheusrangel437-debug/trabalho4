const express = require('express');
const produtoController = require('../controller/produtoController.js');

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get('/livros', produtoController.getLivros);
app.get('/livros/:id', produtoController.getLivroPorId);
app.post('/livros', produtoController.postLivro);

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
