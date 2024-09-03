import { Request, Response } from "express";

const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req : Request, res : Response) => {
  res.send("Devsify Music App");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on:  http://localhost:${process.env.PORT}`);
});
