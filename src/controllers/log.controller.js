// src/controllers/log.controller.js
const { calcularMetricas } = require('../services/log.service');
const db = require('../database/db');

exports.receberLogs = async (req, res) => {
  const logs = req.body; //Receber os logs
  const metricas = calcularMetricas(logs);
  await db.insert(metricas);
  res.status(200).send('Logs recebidos e métricas calculadas');
};
