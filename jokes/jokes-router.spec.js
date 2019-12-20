const request = require("supertest");

const server = require("../api/server");

describe("GET /api/jokes", function(){
  it("should return a 401 Unauthorized", function(){
    return request(server)
      .get("/api/jokes")
      .then(res => expect(res.status).toBe(401))
  })
})

describe("GET /api/jokes", function(){
  it("should return a 200", function(){
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "ramon", 
        password: "pass"
      })
      .then(res => {
        const token = res.body.token;

        return request(server)
          .get("/api/jokes")
          .set("Authorization", token)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
          })
      })
  })
})