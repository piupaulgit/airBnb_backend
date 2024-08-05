require("dotenv").config();
import express, { Request, Response } from 'express';
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

// routes
const authRoutes = require("./routes/auth");

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("BD connected");
  })
  .catch((err:any) => {
    console.log(err);
  });

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// my routes
app.use("/api/auth", authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});