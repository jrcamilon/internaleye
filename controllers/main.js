/**
 * Imports and Declarations
 */
let mySql = require('mysql');
let _ = require('lodash');
let env = require('../config.js');
let Errors = require('../errors');
let HttpStatus = require('http-status-codes');

/**
 * Connection Pool for MySQL
 */
var pool = mySql.createPool({
    connectionLimit: 10,
    host: env.host,
    user: env.user,
    password: env.password,
    database: env.database
});

// Test
exports.databaseTest = (req, res, next) => {

    const query = 'select * from yonkers.stats';
    pool.getConnection((connectionError, conn) => {
        if (connectionError) {
            if (connectionError instanceof Errors.NotFound) {
                return res.status(HttpStatus.NOT_FOUND).send({message: connectionError.message}); 
            }
            
            console.log(connectionError);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
            
        } else {
            pool.query(query, (queryError, response, fields) => {
                if (!queryError) {
                    res.send(response);
                } 
                conn.release();
            });
        }   
    });
};
