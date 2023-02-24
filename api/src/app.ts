import Express from "express";
import cors from "cors";
import passport from "passport";

import userRouter from "./routes/users";
import productRouter from "./routes/products";
import orderRouter from "./routes/orders";
import { jwtStrategy } from "./config/passport";

const app = Express();

app.use(Express.json());

app.use(cors());

app.use(passport.initialize());
passport.use(jwtStrategy);

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

export default app;