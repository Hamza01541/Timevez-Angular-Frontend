/**
 * Followed this link:
 * @see https://codeforgeek.com/deploy-awesome-angular-app-heroku/ 
 * Could also follow:
 * @see https://www.agiratech.com/how-to-deploy-angular-application-to-heroku/
 */

//Install express server
const express = require('express');
const path = require('path');

const app = express();
console.log("**app:",app)
// Serve only the static files form the dist directory
app.use(express.static('./dist'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname,'/dist/index.html'));

console.log("**App-get:",res)
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);