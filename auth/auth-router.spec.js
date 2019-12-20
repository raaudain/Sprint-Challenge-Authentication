const request = require("supertest");

const server = require("../api/server");


describe("POST /register", function(){
  it("should return a 201 Created", function(){
    return request(server)
      .post("/api/auth/register")
      .send({
        username: Math.random(),
        password: "test"
      })
      .then(res => {
        //console.log(res.status)
        expect(res.status).toBe(201);
      })
  });
});

describe("POST /register", function(){
  it("should return a 400 Bad Request", function(){
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "test1",
        password: ""
      })
      .then(res => {
        //console.log(res.status)
        expect(res.status).toBe(400);
      })
  });
});


describe("POST /login", function(){
  it("should return a 200 OK", function(){
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "test",
        password: "test"
      })
      .then(res => {
        //console.log(res.status)
        expect(res.status).toBe(200)
      })
  });
});

describe("GET /register", function(){
  it("should return a 401 Unauthorized", function(){
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "test",
        password: ""
      })
      .then(res => {
        expect(res.status).toBe(401);
      })
  });
});
