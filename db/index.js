const pg = require('pg');
// const { Pool } = require('pg');

const config = {
    dev: {
        database: 'goodcatch',
        user: 'postgres',
        password: process.env.POSTGRES_PW
    },

    prod: {
        connectionString: process.env.DATABASE_URL,
    }
}

// const db = new Pool (process.env.DATABASE_URL ? config.prod : config.dev);

const db = new pg.Pool (process.env.DATABASE_URL ? config.prod : config.dev);


const types = pg.types;

types.setTypeParser(1082, function(stringValue) {
    return stringValue;
});

module.exports = db;