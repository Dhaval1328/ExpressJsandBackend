var http = require('http')
var a =1000
var b = 20000
http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/html'})
    res.write("Hello World")
    res.write("<br/><b>A. Value is</b>" +a)
    res.write("<br/><b>A. Value is</b>" +b)
    res.end("<br>Bye")
}).listen(3000)
console.log("Server Started on http://127.0.01:3000")