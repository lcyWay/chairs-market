const { db } = require("./db");
const { sendRequest } = require("./utils");

function initApi(app) {
  app.post("/chairs", async (req, res) => {
    const tags = req.body?.tags;

    let query = "SELECT id, title, price, discount_price, image_url FROM chairs";
    if (Array.isArray(tags) && tags.length > 0) {
      const tagsArray = [];
      tags.forEach((tag) => {
        if (typeof tag !== "string") return;
        tagsArray.push(`'${tag}'`);
      });
      query += ` WHERE tags @> ARRAY[${tagsArray.join(",")}]::VARCHAR[]`;
    }

    db.query(query, (error, result) => {
      if (error || !Array.isArray(result?.rows)) return res.json(sendRequest(false));
      res.json(sendRequest(true, result.rows));
    });
  });

  app.get("/tags", async (req, res) => {
    db.query("SELECT * FROM tags", (error, result) => {
      if (error || !Array.isArray(result?.rows)) return res.json(sendRequest(false));
      res.json(sendRequest(true, result.rows));
    });
  });

  app.get("/basket/current", async (req, res) => {
    if (!Array.isArray(req.session.basket) || req.session.basket.length === 0) return res.json(sendRequest(true, []));
    db.query("SELECT id FROM chairs", (error, result) => {
      if (error || !Array.isArray(result?.rows)) res.json(sendRequest(true, []));
      req.session.basket = req.session.basket.filter(({ id }) => !!result.rows.find((chair) => chair.id === id));
      res.json(sendRequest(true, req.session.basket));
    });
  });

  app.post("/basket/add", async (req, res) => {
    const id = req.body?.id;
    if (typeof id !== "string") return res.json(sendRequest(false));

    const basket = req.session.basket;
    if (!Array.isArray(basket)) {
      req.session.basket = [{ id, count: 1 }];
      return res.json(sendRequest(true, req.session.basket));
    }

    const foundItemIndex = basket.findIndex((item) => item.id === id);
    foundItemIndex === -1 ? basket.push({ id, count: 1 }) : basket[foundItemIndex].count++;
    res.json(sendRequest(true, basket));
  });

  app.post("/basket/remove", async (req, res) => {
    const id = req.body?.id;
    if (typeof id !== "string") return res.json(sendRequest(false));

    const basket = req.session.basket;
    if (!Array.isArray(basket)) {
      req.session.basket = [];
      return res.json(sendRequest(true, req.session.basket));
    }

    const foundItemIndex = basket.findIndex((item) => item.id === id);
    if (foundItemIndex !== -1) {
      const foundItem = basket[foundItemIndex];
      foundItem.count > 1 ? foundItem.count-- : basket.splice(foundItemIndex, 1);
    }
    res.json(sendRequest(true, basket));
  });
}

module.exports = {
  initApi,
};
