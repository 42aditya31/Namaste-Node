 const http= require("http")

 const server = http.createServer(function(req, res){
  if(req.url === "/data"){
    res.end("WHAT DID YOU MEAN BY DATA !!!!")
  }
  res.end("Hello world !!")
 })

 server.listen(4231)