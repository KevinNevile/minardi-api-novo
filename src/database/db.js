// src/database/db.js
const nano = require('nano')('http://admin:admin@localhost:5984'); // URL do CouchDB
const db = nano.db.use('metrics'); // Nome do banco de dados
module.exports = db;
