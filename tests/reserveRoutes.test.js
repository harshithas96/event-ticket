const request = require("supertest");
const app = require("../index"); // or wherever your Express app is exported
const Reservation = require("../models/reservationModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Reservation.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Reservation API with Auth", () => {
  let userToken, adminToken;

  beforeAll(() => {
    adminToken = jwt.sign(
      { id: "adminId", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    userToken = jwt.sign(
      { id: "userId", role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  it("should create a new reservation with user token", async () => {
    const res = await request(app)
      .post("/api/reserve")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "John Doe",
        email: "john@example.com",
        eventDate: "2025-05-01T18:00:00.000Z"
      });


      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Ticket reserved successfully");
    

  });

  it("should allow admin to fetch all reservations", async () => {
    const res = await request(app)
      .get("/api/getAllReservations")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should deny non-admin from fetching all reservations", async () => {
    const res = await request(app)
      .get("/api/getAllReservations")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  it("should allow user to update their reservation", async () => {
    const res = await request(app)
      .put("/api/updateReservation")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        email: "john@example.com",
        eventDate: "2025-05-01T18:00:00.000Z",
        seatNumber: 5
      });

    console.log(res.body);
    expect(res.status).toBe(200);
  });

  it("should allow user to cancel their reservation", async () => {
    const res = await request(app)
      .delete("/api/cancelReservation")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        email: "john@example.com",
        eventDate: "2025-05-01T18:00:00.000Z"
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Reservation cancelled successfully");
  });
});