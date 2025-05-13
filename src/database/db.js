require('dotenv').config(); // carrega as variaveis de ambiente
const { MongoClient } = require('mongodb');


const url = process.env.MONGO_URL; // URL de conexão com o MongoDB local


const dbName = process.env.MONGO_DB; // Nome do banco de dados


let db = null;


// Função para conectar ao MongoDB
const conectarMongoDB = async () => {
    if (!db) {
        try {
            const client = new MongoClient(url);
            await client.connect();
            console.log('Conectado ao MongoDB');
            db = client.db(dbName);
        } catch (error) {
            console.error('Erro ao conectar ao MongoDB:', error);
        }
    }
    return db;
};


module.exports = { conectarMongoDB };


