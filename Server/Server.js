const express = require("express");
var WebSocketServer = require('websocket').server;
const http = require("http");
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const url = `http://localhost:8000/`;
const options = {
	method: 'GET',
	headers: {
		"Content-Type": "application/json"
	}
};
let server = http.createServer(app)

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});



const SecondInMiliSec = 1000;

setInterval(() => {
    
    getData().then((result) => {
        message = result
        for (let connection of wsServer.connections){
            
            connection.send(JSON.stringify(result))
        }
    })
      }, SecondInMiliSec);

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

async function getData() {
    try {
        const res = await fetch(url, options);
        const json = await res.json();
        return json;
    } catch (err) {
        console.log(err);
    }
}

server.listen(4000);