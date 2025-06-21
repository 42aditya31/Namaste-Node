//  const http= require("http")

//  const server = http.createServer(function(req, res){
//   if(req.url === "/data"){
//     res.end("WHAT DID YOU MEAN BY DATA !!!!")
//   }
//   res.sendFile("/data.json")
//   res.end("Hello world !!")
//  })

//  server.listen(4231)
// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Set the content type to HTML
  res.writeHead(200, { "Content-Type": "text/html" });

  // Read the HTML file and send it as the response
  fs.readFile(path.join(__dirname, "data.json"), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error loading data.json");
      return;
    }
    res.end(data);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
