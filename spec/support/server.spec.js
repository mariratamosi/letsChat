var request = require("request");

describe("calculate", () => {
  it("should be 2+2", () => {
    expect(2 * 2).toBe(4);
  });
});

describe("getMessages", () => {
  it("it should return 200OK", (done) => {
    request.get("http://localhost:3000/messages", (err, response) => {
      //console.log(response);
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("it should return a non-empty list", (done) => {
    request.get("http://localhost:3000/messages", (err, response) => {
      expect(JSON.parse(response.body).length).toBeGreaterThan(0);
      done();
    });
  });
});

describe("getMessage from user", () => {
  it("it should return 200OK", (done) => {
    request.get("http://localhost:3000/messages/rima", (err, response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("name should be rima", (done) => {
    request.get("http://localhost:3000/messages/Sarah", (err, response) => {
      expect(JSON.parse(response.body)[0].user).toEqual("Sarah");
      done();
    });
  });
});
