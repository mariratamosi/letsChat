var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  //console.log(req);
  messages.push(req.body);
  res.send(200);
});

var messages = [
  { name: "rim", messages: "billo" },
  { name: "rim", messages: "billosdsa" },
];

var server = http.listen(3000, () => {
  console.log("server starter");
});
