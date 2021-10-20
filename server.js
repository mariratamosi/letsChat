var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");
const { stringify } = require("querystring");

app.use(express.static(path.join(__dirname, "demo-app")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.get("/messages/:user", (req, res) => {
  var user = req.params.user;
  Message.find({ user: user }, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", async (req, res) => {
  try {
    var message = new Message(req.body);

    await message.save();

    var censored = await Message.findOne({ message: "bad" });

    if (censored) await Message.remove({ _id: censored.id });
    else io.emit("message", req.body);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    return console.error(err);
  } finally {
    console.log("message post handled");
  }
});

var dbUrl =
  "mongodb+srv://rima:1234@cluster0.fku13.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var Message = mongoose.model("Message", {
  user: String,
  message: String,
});

var messages = [];

io.on("connection", (socket) => {
  console.log("connected");
});

mongoose.connect(dbUrl, (err) => {
  console.log("db connected", err);
});

var server = http.listen(3000, () => {
  console.log("server starter");
});
