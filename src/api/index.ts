import { Router } from "express"
import { userInfo } from "os";
import authentication from "./routes/authentication";
import census from "./routes/census";
import user from "./routes/user";

export default () => {
  const app = Router();

  authentication(app)
  census(app)
  user(app)
  return app;
}
