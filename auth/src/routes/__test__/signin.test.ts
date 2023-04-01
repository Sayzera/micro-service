import request from "supertest"
import { app } from "../../app"

it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "white.code.text@gmail.com",
      password: "password",
    })
    .expect(400)
})

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sezer@gmail.com",
      password: "password",
    })
    .expect(201)

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "sezer2@gmail.com",
      password: "password",
    })
    .expect(400)
})

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sezer@gmail.com",
      password: "password",
    })
    .expect(201)

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "sezer1@gmail.com",
      password: "password",
    })
    .expect(400)
})
