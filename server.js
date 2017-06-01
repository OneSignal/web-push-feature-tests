#! /usr/bin/env node

const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const HTTP_PORT = 16000;
const HTTPS_PORT = 16001;

const privateKey  = fs.readFileSync('shared/ssl/dev-ssl.key', 'utf8');
const certificate = fs.readFileSync('shared/ssl/dev-ssl.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const app = express();

app.use(express.static('.'))

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

console.log('Web Push Features Experiments');
console.log('-----------------------------');
httpServer.listen(HTTP_PORT, () => console.log(`Started HTTP server on port ${HTTP_PORT}.`));
httpsServer.listen(HTTPS_PORT, () => console.log(`Started HTTPS server on port ${HTTPS_PORT}.`));