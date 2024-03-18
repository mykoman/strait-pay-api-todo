import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import { json } from "body-parser";
import { config } from 'dotenv'
import router from "./routes";
import errorHandler from './middlewares/error-handler';

const app = express();
config();
const PORT = process.env.PORT || 3003;
const dbUrl: string = process.env.DATABASE_URL!;

app.use(cors());
app.use(express.json());

app.use(json());

mongoose.connect(dbUrl, {
  retryWrites: true,
  w: "majority",
});

app.use("/api/v1", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
