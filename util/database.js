import mysql from 'mysql2';

// 2 ways of connecting to database, 
// => by creating a connection on any query, once query is done we should close the connection, this is inefficient as on every query we should be adding a connection
// => by cerating a pool

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_project',
    password: '1234ABCD'
}).promise();
