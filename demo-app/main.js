window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  MessageController.getMessage();

  const form = document.getElementById("msgForm");
  const msg = document.getElementById("msg");
  const name = document.getElementById("name");

  form.addEventListener("submit", (e) => {
    console.log("Submit");
    e.preventDefault();
    console.log(msg.value);
    MessageController.postMessage(name.value, msg.value);
    msg.value = "";
  });
});

var socket = io(); //will connect to the same url socket

socket.on("message", (data) => {
  console.log(data);
  MessageController.addMessage(data);
});

function MessageController() {}

MessageController.addMessage = ({ user, message }) => {
  const msg = document.getElementById("history");
  const div = document.createElement("div");
  div.append(`${user}: ${message}`);
  msg.append(div);
};

MessageController.getMessage = () => {
  let _that = this;

  fetch("/messages")
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      console.log(res);
      res.forEach((element) => {
        MessageController.addMessage({
          user: element.user,
          message: element.message,
        });
      });
    });
};

MessageController.postMessage = (name, msg) => {
  let data = {
    user: name,
    message: msg,
  };
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("/messages", config)
    .then((data) => {
      console.log(data);
    })
    .then((res) => {});
};
