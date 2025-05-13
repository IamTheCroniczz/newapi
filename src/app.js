const express = require('express');
const app = express();

app.use(express.json()); // Para aceitar JSON no body
require('dotenv').config(); // carrega as variaveis de ambiente
const port = process.env.PORTA;

let tarefas = [
    {   id: 1, 
        titulo: "Node.js",
        descricao:"Estuda Node pelo amor", 
        dataConclusao: false },

    {   id: 2, 
        titulo: "lavar pratos",
        descricao:"mamãe mandou lavar pratos", 
        dataConclusao: false },
    
    {   id: 3, 
        titulo: "varrer a casa",
        descricao:"mamãe mandou varrer a casa", 
        dataConclusao: false },
  
];

//CONFIGURAÇÃO DE ROTAS

// endpoint de teste
app.get('/',(req,res)=>{
    res.send('api de tarefas')
})

// Listar todas as tarefas
app.get('/tarefas',(req,res)=>{
    res.json(tarefas)
})

// Adicionar Tarefa
app.post('/tarefas', (req, res) => {
    const novaTarefa = req.body;
    console.log(novaTarefa)
    novaTarefa.id = tarefas.length + 1;
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// Atualizar tarefa
app.put('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(t => t.id === id);
  
    if (index !== -1) {
      const tarefa = tarefas[index];
      const novosDados = req.body;
  
      if (novosDados.titulo !== undefined) {
        tarefa.titulo = novosDados.titulo;
      }
      if (novosDados.descricao !== undefined) {
        tarefa.descricao = novosDados.descricao;
      }
      if (novosDados.dataConclusao !== undefined) {
        tarefa.dataConclusao = novosDados.dataConclusao;
      }
  
      res.json(tarefa);
    } else {
      res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }
  });

// Deletar tarefa
app.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tarefas = tarefas.filter(t => t.id !== id);
    res.status(204).send();
  });


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });