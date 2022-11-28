import { Router } from "express";
import UsersService from "../../services/UsersService";
import UsersController from "../../controllers/UsersController";
import validateRequest from "../../middleware/validateRequest";
import * as Yup from 'yup'

const route = Router();
const service = new UsersService()
const controller = new UsersController(service)

export default (app: Router) => {
  app.use(route)

  route.get(
    '/admins',
    controller.getAdminList.bind(controller)
  )

  route.post(
    '/admins',
    (...args) => validateRequest(
      ...args,
      Yup.object().shape({
        email: Yup.string().required()
      })
    ),
    controller.createAdmin.bind(controller)
  )

  route.delete(
    '/admins/:id',
    controller.removeAdminStatus.bind(controller)
  )
}
