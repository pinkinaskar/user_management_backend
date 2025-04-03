require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require('http');
const https = require('https');
const { dbConnect } = require('./config/db.config');
const ErrHandlerEndware = require('./endwares/error-handler.endware');
const ResponseHandlerEndware = require('./endwares/response.endware');
const { Constants } = require('./config/constant'); 
const path = require("path");


const app = express();
const PORT = process.env.APP_PORT || 3001;

app.use(express.json());
app.use(cors());

let server;
if(process.env.APP_SECURE === 'false') {
  server = http.createServer(app);
} else {
  // Change the path to the key and certificate when in production
  const serverOptions = {};
  server = https.createServer(serverOptions, app);
}

// Test route
app.get('/', (req, res) => {
  res.send("API is running...");
});

/* uploads use */
app.use(Constants.filePublicBaseUrl, express.static(path.resolve('./uploads/')));

// API routes initiated
const apiV1Routes = require("./api/v1/routes");
app.use("/api/v1", [
  // AuthMiddleware.verifyAuth
], 
apiV1Routes);


// Load the database connection
dbConnect();

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});

// Basic endwares to integrate the response or error handles (With Logger)
app.use(ErrHandlerEndware.errorLogger);
app.use(ErrHandlerEndware.errorResponder);
app.use(ErrHandlerEndware.failSafeHandler);
app.use(ResponseHandlerEndware.handleFinalResponse);

const {envs} = require('./lib');
global.clog = function(...messages) {
  if(!envs.isProd()) {
    console.log(...messages);
  }
}