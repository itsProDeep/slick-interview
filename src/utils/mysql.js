const bluebird = require('bluebird');
const mysql = require('mysql');
const config = require('config');

const dbConfigObject = config.seedDB;
let pool;
const poolConfig = {
    host: dbConfigObject.host,
    port: dbConfigObject.port,
    user: dbConfigObject.username,
    password: dbConfigObject.password,
    database: dbConfigObject.database,
    connectionLimit: 10,
};

try {
    pool = mysql.createPool(poolConfig);
    bluebird.promisifyAll(pool);
} catch (ex) {
    console.log('Unable to initialize mysql pool', ex);
}

pool.on('enqueue', () => {
    console.log('Waiting for available connection slot');
});

pool.on('error', (err) => {
    console.log('mysql error ', err.code);
});


pool.query('select 1', [], (err, results) => {
    if (err) {
        console.log(`Error connecting to seed mysql with credentials : ${JSON.stringify(poolConfig)}`);
        process.exit(0);
    } else {
        console.log(`Database seed connection established : ${JSON.stringify(poolConfig)}`);
    }
});

module.exports = {
    pool
};