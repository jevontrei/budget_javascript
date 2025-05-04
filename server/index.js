require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

// for socket.io connections
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors()); // for http connections
app.use(express.json());

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

app.post("/webhooks", (req, res) => {
  console.log(req.body);
  io.emit('webhook', req.body)
  res.send("thanks webhook");
});

server.listen(port, () => console.log(`listening on port ${port}`));
