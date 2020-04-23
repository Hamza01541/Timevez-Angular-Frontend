/**
 * Followed this link:
 * @see https://codeforgeek.com/deploy-awesome-angular-app-heroku/ 
 * Could also follow:
 * @see https://www.agiratech.com/how-to-deploy-angular-application-to-heroku/
 */
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);