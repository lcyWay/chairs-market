const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");
const cors = require("cors");

require("dotenv").config();

const { initApi } = require("./src/api");

const app = express();

const port = process.env.PORT || 9876;

const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOSTNAME);
redisClient.connect().catch(console.error);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

initApi(app);

app.listen(port, () => console.log("Server is running at port:", port));