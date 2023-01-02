const express = require('express');
const app2 = express();

// Handler method
const handlerFunction = num => (req,res)=>{
	const { method, url, headers, body } = req
    return res.send('server 2')
}

// Only handle GET and POST requests
// Receive request and pass to handler method
app2.get('*',  handlerFunction(1))


// Start server on PORT 3000
app2.listen(3001, err =>{
	err ?
	console.log("Failed to listen on PORT 3000"):
	console.log("Application Server listening on PORT 3000");
});