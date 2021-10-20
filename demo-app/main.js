var messageController;

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  messageController = new MessageController();
  messageController.getMessage();

  const form = document.getElementById("msgForm");
  const msg = document.getElementById("msg");
  const name = document.getElementById("name");

  form.addEventListener("submit", (e) => {
    console.log("Submit");
    e.preventDefault();
    console.log(msg.value);
    messageController.addMessage(name.value, msg.value);
    messageController.postMessage(name.value, msg.value);
    msg.value = "";
  });
});

var MessageController = function () {};

MessageController.prototype.addMessage = (user, message) => {
  const msg = document.getElementById("history");
  const div = document.createElement("div");
  div.append(`${user}: ${message}`);
  msg.append(div);
};

MessageController.prototype.getMessage = () => {
  let _that = this;

  fetch("/messages")
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      console.log(_that);
      res.forEach((element) => {
        messageController.addMessage(element.name, element.messages);
      });
    });
};

MessageController.prototype.postMessage = (name, msg) => {
  let data = {
    name: name,
    messages: msg,
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
