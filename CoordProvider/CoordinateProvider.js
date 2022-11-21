const http = require("http");
const fs = require("fs");
const { parse } = require("csv-parse");

let record = [];
readLines();
let count = 0;
const requestListener = function (req, res) {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        return;
     }
     res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    let message = ProvideCoords();
    
    res.end(message);
};

function readLines(){
    fs.createReadStream("./line1.csv")
    .pipe(
        parse({
          delimiter: ",",
          columns: true,
          ltrim: true,
        })
      )
  .on("data", function (row) {
    record.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  });
}

function ProvideCoords(){
    const line = record[count]
    const message = JSON.stringify(line);
    if (count == record.length - 1){
        count = 0;
    }
    else {count++}
    return message
}
const server = http.createServer(requestListener)

server.listen(8000)