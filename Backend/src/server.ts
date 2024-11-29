import 'reflect-metadata';
import { Request, Response } from "express";

import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import errorHandler from "./middlewares/ErrorHandeler.middleware";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Routes.forEach((r) => {
  r.forEach((route) => {
    (app as any)[route.method](
      route.route,
      async (req: Request, res: Response, next: Function) => {
        try {
          const result = await new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          res.send(result);
        } catch (error) {
          next(error);
        }
      }
    );
  });
});
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on:  http://localhost:${process.env.PORT}`);
});
