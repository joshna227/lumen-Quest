const oracledb = require('oracledb');
require('dotenv').config();

// Configuration from .env
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: `${process.env.DB_HOST}:${process.env.DB_PORT || 1521}/${process.env.DB_NAME}`,
};

async function connectDB() {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Database connected!');
        return connection;
    } catch (err) {
        console.error('Database connection failed', err);
        throw err;
    }
}

module.exports = connectDB;
