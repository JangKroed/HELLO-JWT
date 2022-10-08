// const jwt = require("jsonwebtoken");

// const token = jwt.sign({ test: true }, "my-secret-Key");

// console.log(token);

// const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0Ijp0cnVlLCJpYXQiOjE2NjUyMDMyNTh9.QoJVDE4MOrCyVPfYMsdIvy4I0ffeKhZAk7xns1yIkM4',"my-secret-Key")

// console.log(decoded)

// const decoded2 = jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0Ijp0cnVlLCJpYXQiOjE2NjUyMDMyNTh9.QoJVDE4MOrCyVPfYMsdIvy4I0ffeKhZAk7xns1yIkM4')

// console.log(decoded2)

const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5002;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

// Request 로그 남기는 미들웨어 작성
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});

app.post("/set-key", (req, res) => {
  const { key } = req.body;
  const token = jwt.sign({ key }, "sparta");
  res.cookie("token", token);
  return res.status(200).end();
});

app.get("/get-key", (req, res) => {
  const { token } = req.cookies;
  const { key } = jwt.decode(token);
  return res.status(200).json({ key });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
