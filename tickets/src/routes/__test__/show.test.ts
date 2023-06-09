import request from "supertest"
import { app } from "../../app"

it("returns a 404 if the ticket is not found", async () => {
  // Bulunamayan biletler için 404 döndürür
  let response = await request(app).get("/api/tickets/123").send().expect(404)

  console.log("res", response.body)
})

it("returns the ticket if the ticket is found", async () => {
  const title = "concert"
  const price = 20

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200)

  expect(ticketResponse.body.title).toEqual(title)
  expect(ticketResponse.body.price).toEqual(price)
})
