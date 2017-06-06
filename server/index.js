const express = require('express');
const http = require('http') ; 
const bodyParser = require('body-parser') ; 
const morgan = require('morgan') ; 
const app = express() ;

//App Setup
app.use(morgan('combined')) ;
app.use(bodyParser.json({type:'*/*'})) ; 

//Server Setup
const port = process.env.PORT || 3000 ; 
const server = http.createServer(app) ;
server.listen(port) ; 
console.log('server listening on port:', port) ; 
