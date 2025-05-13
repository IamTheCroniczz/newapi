const tarefaModel = require('../models/tarefaModel');

exports.teste = (req, res) => {
    res.send('api de tarefas');
};

// Listar todas as tarefas
exports.listarTodas = async (req, res) => {
    try {
        const tarefas = await tarefaModel.listar();
        res.json(tarefas);
    } catch (erro) {
        console.error('Erro ao listar tarefas:', erro);
        res.status(500).json({ mensagem: 'Erro ao listar tarefas' });
    }
};

// Adicionar nova tarefa
exports.adicionarTarefa = async (req, res) => {
    try {
        let novaTarefa = req.body;
        novaTarefa = await tarefaModel.adicionar(novaTarefa);
        res.status(201).json(novaTarefa);
    } catch (erro) {
        console.error('Erro ao adicionar tarefa:', erro);
        res.status(500).json({ mensagem: 'Erro ao adicionar tarefa' });
    }
};

// Atualizar tarefa
exports.atualizarTarefas = async (req, res) => {
    console.log('tarefaController', 'atualizarTarefas()');
    const id = req.params.id;
    const novosDados = req.body;

    try {
        const resultado = await tarefaModel.atualizar(id, novosDados);

        if (resultado.erro) {
            res.status(404).json({ mensagem: resultado.erro });
        } else {
            res.json(resultado.novatarefa);
        }
    } catch (erro) {
        console.error('Erro ao atualizar tarefa:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar tarefa' });
    }
};

// Deletar tarefa
exports.deletarTarefa = async (req, res) => {
    const id = req.params.id;

    try {
        const resultado = await tarefaModel.deletar(id);

        if (resultado.erro) {
            return res.status(404).json({ mensagem: resultado.erro });
        }

        res.json({ mensagem: resultado.mensagem });
    } catch (erro) {
        console.error('Erro ao deletar tarefa:', erro);
        res.status(500).json({ mensagem: 'Erro ao deletar tarefa', erro });
    }
};
