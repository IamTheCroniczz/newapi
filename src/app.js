const tarefaController = require('./controllers/tarefaController');
const express = require('express');
const app = express();

app.use(express.json()); // Para aceitar JSON no body
require('dotenv').config(); // carrega as variaveis de ambiente
const port = process.env.PORTA;

//CONFIGURAÇÃO DE ROTAS

// endpoint de teste
app.get('/', tarefaController.teste);

// Listar todas as tarefas
app.get('/tarefas', tarefaController.listarTodas);

// Adicionar Tarefa
app.post('/tarefas', tarefaController.adicionarTarefa);

// Atualizar tarefa
app.put('/tarefas/:id', tarefaController.atualizarTarefas);

// Deletar tarefa
app.delete('/tarefas/:id', tarefaController.deletarTarefa);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
