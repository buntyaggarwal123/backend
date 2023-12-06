'use strict';
const MYSQL = require('mysql');
const CONFIG = require('./config');


module.exports = MYSQL.createPool({
    connectionLimit: CONFIG.DB_CONFIG.CONNECTION_LIMIT || 1000, //important
    host: CONFIG.DB_CONFIG.HOST,
    user: CONFIG.DB_CONFIG.USER,
    password: CONFIG.DB_CONFIG.PASSWORD,
    database: CONFIG.DB_CONFIG.DATABASE,
    supportBigNumbers: true,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    multipleStatements: true,
    charset: 'utf8mb4'
    //,debug    : true
});