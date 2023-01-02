const express = require('express');
const app1 = express();

// Handler method
const handlerFunction = num => (req,res)=>{
    console.log("req here")
    return res.send('server 1')
}

// Only handle GET and POST requests
// Receive request and pass to handler method
app1.get('*',  handlerFunction(1))


// Start server on PORT 3000
app1.listen(3000, err =>{
	err ?
	console.log("Failed to listen on PORT 3000"):
	console.log("Application Server listening on PORT 3000");
});