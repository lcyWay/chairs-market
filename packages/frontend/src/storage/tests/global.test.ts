fetchMock.mockResponse(JSON.stringify({ success: true, data: [] }));
import { GlobalStorage } from "storage/GlobalStorage";

const TEST_TAG_ID = "tag-id-test";

test("global storage", async () => {
  fetchMock.once((req) => {
    // @ts-ignore
    const body = JSON.parse(req.body);
    expect(body.tags).toBeInstanceOf(Array);
    expect(body.tags[0]).toBe(TEST_TAG_ID);
    return Promise.resolve(JSON.stringify({ success: true, data: [] }));
  });
  GlobalStorage.changeSelectedTags(TEST_TAG_ID);
  expect(GlobalStorage.selectedTags.length).toBe(1);
  GlobalStorage.changeSelectedTags("eksiu2ak2");
  expect(GlobalStorage.selectedTags.length).toBe(2);
  GlobalStorage.changeSelectedTags(TEST_TAG_ID);
  expect(GlobalStorage.selectedTags.length).toBe(1);

  fetchMock.once((req) => {
    // @ts-ignore
    const body = JSON.parse(req.body);
    expect(body.tags).toBeInstanceOf(Array);
    expect(body.tags.length).toBe(0);
    return Promise.resolve(JSON.stringify({ success: true, data: [] }));
  });
  GlobalStorage.clearSelectedTags();
  expect(GlobalStorage.selectedTags.length).toBe(0);
  GlobalStorage.clearSelectedTags();

  fetchMock.once(JSON.stringify({ success: false }));
  await GlobalStorage.loadChairs();
  expect(GlobalStorage.chairs.length).toBe(0);

  fetchMock.once(JSON.stringify({ success: false }));
  await GlobalStorage.loadTags();
  expect(GlobalStorage.tags.length).toBe(0);
});
