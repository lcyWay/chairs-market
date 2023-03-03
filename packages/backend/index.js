const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");
const cors = require("cors");

require("dotenv").config();

const { initApi } = require("./src/api");

const app = express();

const port = process.env.PORT || 9876;

const redisClient = redis.createClient(
  process.env.REDIS_URL && {
    url: process.env.REDIS_URL,
  }
);
redisClient.connect().catch(console.error);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      ...(process.env.NODE_ENV === "development"
        ? {}
        : {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          }),
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
