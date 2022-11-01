import { Router } from "express"
import { userInfo } from "os";
import authentication from "./routes/authentication";
import user from "./routes/user";

export default () => {
  const app = Router();

  authentication(app)
  user(app)
  return app;
}
