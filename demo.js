var fs = require("fs");

fs.readFile("./data.json", "UTF-8", (err, data) => {
  console.log(data);
});
