import request from "supertest"
import { app } from "../../app"

it("returns a 201 on successful signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sezer@gmail.com",
      password: "password",
    })
    .expect(201)
})

it("returns a 400 with an invalid email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sezer",
      password: "password",
    })
    .expect(400)
})

it("returns a 400 with an invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "white.code.text@gmail.com",
      password: "p",
    })
    .expect(400)
})

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
    })
    .expect(400)
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "",
    })
    .expect(400)
})

it("disallows duplicate emails", async () => {
  // Kullanıcı oluşturuyoruz
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "white.code.text@gmail.com",
      password: "password",
    })
    .expect(201)
  // Aynı kullanıcıyı tekrar oluşturuyoruz ve duplicate email hatası alıp almadığımızı kontrol ediyoruz
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "white.code.text@gmail.com",
      password: "password",
    })
    .expect(400)
})

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "sezer123@gmail.com",
      password: "password",
    })
    .expect(201)

  // Set-Cookie header'ı var mı kontrol ediyoruz
  expect(response.get("Set-Cookie")).toBeDefined()
})
