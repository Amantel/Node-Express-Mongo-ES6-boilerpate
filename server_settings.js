let environment = process.env.NODE_ENV || '';
environment = environment.trim();

const databaseConnectionURL = process.env.databaseConnectionURL || null;
const appDB = process.env.appDB || null;


console.log(environment || 'Default environment - production');

if (!databaseConnectionURL || !appDB) {
  console.error('Please, add mandatory settings');
  process.exit(2);
}

exports.databaseConnectionURL = databaseConnectionURL;
exports.appDB = appDB;
