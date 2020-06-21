import request from "supertest";

import app from "../src/app";
import storage from "../src/util/in-memory-store";

const KEY = "__test__";
const metricData = { value: 5 };

describe(`POST /api/metric/{key = ${KEY}}`, () => {
  it("should respond 200 with json", (done) => {
    request(app)
      .post(`/api/metric/${KEY}`)
      .send(metricData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, {}, done);
  });

  it(`storage should contain metric data under key ${KEY}`, () => {
    const collection = storage.get(KEY) ?? [];
    expect(Array.isArray(collection)).toBeTruthy();
    expect(collection.length).toBe(1);
    expect(collection[0].value).toEqual(metricData.value);
  });
});

describe(`GET /api/metric/{key = ${KEY}}/sum`, () => {
  it(`should respond 200 with json, containing value of ${metricData.value}`, (done) => {
    request(app)
      .get(`/api/metric/${KEY}/sum`)
      .expect(200, { value: metricData.value }, done);
  });
});

describe(`GET /api/metric/{key = ${KEY}}/sum`, () => {
  it(`should respond 200 with json, containing value of 0 after timeout exeeds ${process.env.TIME_WINDOW} ${process.env.TIME_UNIT}`, async (done) => {
    await new Promise((resolve) => {
      setTimeout(resolve, (Number(process.env.TIME_WINDOW) + 1) * 1000);
    });
    request(app).get(`/api/metric/${KEY}/sum`).expect(200, { value: 0 }, done);
  });
});

afterAll(() => {
  storage.delete(KEY);
});
