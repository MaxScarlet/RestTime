import supertest from "supertest";
import app from "../../src/app";
import userRouter from "../../src/6-controllers/user-controller";
import StatusCode from "../../src/3-models/status-code";

describe("User Controller", () => {
  it("[POSITIVE] Users -> GET request to /api/user", async () => {
    const response = await supertest(app.server).get("/api/user");

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toBeDefined();
  });

  it("[POSITIVE] Users -> GET request to /api/user/{id}", async () => {
    const userId = "64ff1f9e6735f0674ccbb11b";

    const response = await supertest(app.server).get(`/api/user/${userId}`);

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toBeDefined();
  });

  it("[NEGATIVE] Users -> GET request to /api/user/{id}", async () => {
    const nonExistentUserId = "nonexistent";

    const response = await supertest(app.server).get(
      `/api/user/${nonExistentUserId}`
    );

    expect(response.status).toBe(StatusCode.NotFound);
  });

  afterAll(() => {
    app.httpServer.close();
  });
});
