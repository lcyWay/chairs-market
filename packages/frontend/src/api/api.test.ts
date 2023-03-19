import { ApiAbstractClass } from "api";

fetchMock.once(JSON.stringify({ success: true }));
fetchMock.once(() => Promise.resolve({ status: 400 }));
fetchMock.once(JSON.stringify({ success: false }));
fetchMock.once(JSON.stringify(null));

class ApiTest extends ApiAbstractClass {
  async successRequest() {
    const response = await this.makeRequest("/success");
    return response.success;
  }

  async failureRequest() {
    const response = await this.makeRequest("/error");
    return response.success;
  }
}

test("api abstract class requests", async () => {
  const api = new ApiTest();
  expect(await api.successRequest()).toBeTruthy();
  expect(await api.failureRequest()).toBeFalsy();
  expect(await api.failureRequest()).toBeFalsy();
  expect(await api.failureRequest()).toBeFalsy();
});

export {};
