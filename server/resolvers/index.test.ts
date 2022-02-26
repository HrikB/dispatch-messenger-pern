import chai from "chai";
//@ts-ignore
import chaiGraphQL from "chai-graphql";
import Supertest from "supertest";
chai.use(chaiGraphQL);

const request = Supertest("localhost:3001");

describe("UserResolver", () => {
  describe("registration", () => {
    it("Should reject when passwords are not same", async () => {
      request
        .post("/graphql")
        .send({ query: "{ user(id: 2) { id email firstName } }" })
        .expect(400)
        .end((err, res) => {
          if (err) return console.error(err);
          console.log(res);
        });
    });
  });
});
