/** 
 * Followed this linkto deploy on heroku: @see https://www.agiratech.com/how-to-deploy-angular-application-to-heroku/
 * To Cancel multiple builds: @see https://stackoverflow.com/questions/47028871/heroku-your-account-has-reached-its-concurrent-build-limit
 */

const express = require('express');
const path = require('path');

const app = express();
// Serve only the static files form the dist directory
app.use(express.static('./dist/timevez'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname,'/dist/timevez/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
