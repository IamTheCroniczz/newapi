const {conectarMongoDB} = require('../database/db')
const { ObjectId } = require('mongodb');


class TarefaModel {

    // atributos
    // static tarefas = [
    //     {   id: 1, 
    //         titulo: "Node.js",
    //         descricao:"Estuda Node pelo amor", 
    //         dataConclusao: false },
    
    //     {   id: 2, 
    //         titulo: "lavar pratos",
    //         descricao:"mamãe mandou lavar pratos", 
    //         dataConclusao: false },
        
    //     {   id: 3, 
    //         titulo: "varrer a casa",
    //         descricao:"mamãe mandou varrer a casa", 
    //         dataConclusao: false },
      
    // ];

    static tarefasCollection

   // metodos

    // Conectar ao MongoDB e obter a coleção 'ctarefas'
    static async conectar() {
        if (!this.tarefasCollection) {
            const db = await conectarMongoDB();
            this.tarefasCollection = db.collection('ctarefas'); // Usando a coleção 'ctarefas'
        }
    }


    static async listar() {
        console.log('TarefaModel','listar()')


        await this.conectar();
        const tarefas = this.tarefasCollection.find().toArray();


        return tarefas


    }

   static async adicionar(novaTarefa) {
    console.log('TarefaModel','adicionar()','tarefa:',novaTarefa)
    
    //novaTarefa.id = this.tarefas.length + 1;
    //this.tarefas.push(novaTarefa);
    await this.conectar();
    const resultado = await this.tarefasCollection.insertOne(novaTarefa)
    return novaTarefa

   }

   static async atualizar(id, tarefaAtualizada) {
        console.log('TarefaModel','atualizar()','tarefa:',tarefaAtualizada)
        console.log('id',id)
        const idObj = new ObjectId(id) 

        try {
            //conecta com o banco
            await this.conectar();
        
        
            const resultado = await this.tarefasCollection.updateOne(
                { _id: idObj  },
                { $set: tarefaAtualizada }
            ); 
            console.log('resultado',resultado)

            if (resultado.matchedCount > 0) {

            
                // pesquisa a nova tarefa
                const tarefa = await this.tarefasCollection.findOne({ _id: idObj  });
                console.log('novatarefa',tarefa)
                
                return { erro: '', novatarefa: tarefa };
    
            }
            else{
                return {erro: 'Tarefa não encontrada', novatarefa: null}
            }
    
    

        } catch (erro){
            console.error('Erro ao atualizar:', erro);
            return { erro: 'Erro ao atualizar a tarefa - ' + erro, novatarefa: null };
        }
   }

   static async deletar(id) {
    console.log('TarefaModel','deletar()','id:',id)
    console.log('id',id)

    // this.tarefas = this.tarefas.filter(t => t.id !== id);


    try {
        // Converte o id para ObjectId
        const idObj = new ObjectId(id);

        // Conecta ao banco de dados
        await this.conectar();

        // Realiza a exclusão no banco
        const resultado = await this.tarefasCollection.deleteOne({ _id: idObj });

        console.log('Resultado da exclusão:', resultado);

        // Verifica se um documento foi deletado
        if (resultado.deletedCount > 0) {
            return { erro: '', mensagem: 'Tarefa deletada com sucesso' };
        } else {
            return { erro: 'Tarefa não encontrada', mensagem: '' };
        }

    } catch (erro) {
        console.log('Erro ao deletar:', erro);
        return { erro: 'Erro ao deletar tarefa', mensagem: erro };
    }


   }

}
module.exports = TarefaModel;

