const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

// Application servers
const servers = [
	"http://localhost:3005",
	"http://localhost:3001",
    "http://localhost:3002"
]

// Track the current application server to send request
let current = 0;
let serverIndex = 0

// Receive new request
// Forward to application server
const handler = async (req, res) =>{

	// Destructure following properties from request object
	const { method, url, headers, body } = req;

	// Select the current server to forward the request
	const server = servers[serverIndex];
    current++;
    console.log("the current", current)
    if(server.length === 3) {
        if(current === 3) {
        serverIndex = 1;
        } else if(current === 6) {
            serverIndex = 2
        } else if(current > 9) {
            return res.send('Req. limit reached')
        }
    } else if(server.length === 2) {
        if(current === 6) {
            serverIndex = 1;
        }
        else if(current > 12) {
            return res.send('Req. limit reached')
        }
    }


	// Update track to select next server
	

	try{
        console.log("req received", server, url)
		// Requesting to underlying application server
		const response = await axios(server)
		// Send back the response data
		// from application server to client
        console.log(response.data,response.status, current)
		return res.send(response.data)
	}
	catch(err){
        console.log(err)
        if(serverIndex) {
            servers.splice(serverIndex, 1)
            serverIndex = 0
        }
		// Send back the error message
		return res.status(500).send("Server error!")	
	}
}

app.get('/favicon.ico', (req, res) => { return res.send('text') })

// When receive new request
// Pass it to handler method
app.get( '*', (req,res)=>{handler(req, res)});

console.log("only once")
setInterval(() => {
    current = 0;
    serverIndex = 0
}, 60000)

// Listen on PORT 8080
app.listen(8080, err =>{
	err ?
	console.log("Failed to listen on PORT 8080"):
	console.log("Load Balancer Server "
		+ "listening on PORT 8080");
});
