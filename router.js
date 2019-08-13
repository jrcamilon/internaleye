const health = require('./controllers/health');
const dashboard = require('./controllers/main');
const mysql = require('./controllers/mysql');
// const infoburst = require('./controllers/infoburst');

/**
 * Current Routes http://localhost:3096/
 */
module.exports = function (app) {
       /**
        * Routes for service status, db, etc.
        */
       app.get('/', health.health);
       app.get('/heartbeat', health.heartbeat);
       app.get('/dbstatus', mysql.mySqlStatus);

       /**
        * Routes
        */
       app.get('/test', dashboard.databaseTest);
       app.get('/dbstatus', mysql.mySqlStatus);
}
