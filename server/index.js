require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

const options = {
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

const relativify = (links) => {
  let prev = links.prev;
  let next = links.next;

  if (prev) {
    prev = prev.replace(process.env.BASE, "");
  }
  if (next) {
    next = next.replace(process.env.BASE, "");
  }
  return { prev, next };
};

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/transactions", async (req, res) => {
  const url = `${process.env.BASE}${req.url}`;
  const { data } = await axios.get(url, options);
  const relativeData = { ...data, links: relativify(data.links) };
  res.send(relativeData);
});

app.listen(port, () => console.log(`listening on port ${port}`));
