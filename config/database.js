const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    logging: false,
  },
  production: {
    use_env_variable: 'postgres://mzacultnilrsxv:094e5c21f95e612387ec67c56d9702ba774ab86bc1675604503615dd10976588@ec2-3-216-181-219.compute-1.amazonaws.com:5432/dbthhtgqinedtl',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};
