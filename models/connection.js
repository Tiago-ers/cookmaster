require('dotenv').config();
const mysqlx = require('@mysql/xdevapi');

let schema;

const config = {
  database: 'cookmaster',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

function connection() {
  return schema
    ? Promise.resolve(schema)
    : mysqlx
        .getSession(config)
        .then((session) => {
          schema = session.getSchema('cookmaster');
          return schema;
        })
        .catch(() => {
          process.exit(1);
        });
}

module.exports = connection;
