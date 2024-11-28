const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb'); // conectar diretamente ao MongoDB
const db = require('./database/db'); // Conexão com o CouchDB
const { calcularMetricas } = require('./services/log.service'); // calcular as métricas

const app = express();
app.use(bodyParser.json());

// Configurações do MongoDB
const mongoUrl = 'mongodb+srv://KevinNevile:KEV%23%21213@cluster0.3rytd.mongodb.net/?retryWrites=true&w=majority';
const mongoDbName = 'log'; // Nome do banco de dados no MongoDB
const mongoCollection = 'logs_uso'; // Nome da coleção que contém os logs

// Função para pegar os logs do MongoDB
const pegarLogsDoMongoDB = async () => {
  try {
    // Conectar ao MongoDB
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const database = client.db(mongoDbName);
    const collection = database.collection(mongoCollection);

    // buscar os logs no MongoDB
    const logs = await collection.find().toArray();

    // Calcular métricas
    const metricas = calcularMetricas(logs);

    // Inserir as métricas no CouchDB
    await db.insert(metricas);

    console.log('Logs recebidos do MongoDB e métricas calculadas com sucesso!');

    // Fechar a conexão
    await client.close();
  } catch (error) {
    console.error('Erro ao pegar logs do MongoDB:', error);
  }
};

// Chama a função para pegar os logs assim que o servidor iniciar
app.listen(3000, async () => {
  console.log('Servidor do Time 2 rodando na porta 3000');
  await pegarLogsDoMongoDB(); // Chama para pegar e processar os logs ao iniciar
});