const express = require('express');
const app3 = express();

// Handler method
const handlerFunction = num => (req,res)=>{
	const { method, url, headers, body } = req
    return res.send('server 3')
}

// Only handle GET and POST requests
// Receive request and pass to handler method
app3.get('*',  handlerFunction(3))


// Start server on PORT 3000
app3.listen(3002, err =>{
	err ?
	console.log("Failed to listen on PORT 3000"):
	console.log("Application Server listening on PORT 3000");
});