//?
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"; //!

//?
import usersRouter from "./routes/users.js";
import filesRouter from "./routes/files.js";
import session from "./middleware/user/session.js";

//todo
const app = express();
app.use(session);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload()); //!

//?
app.use("/users", usersRouter);
app.use("/files", filesRouter);

//
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "./client/build")));
} else {
  app.use(express.static(path.join(path.resolve(), "./client/public")));
}

//todo
export default app;
