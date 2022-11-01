import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import UsersService from "../../services/UsersService";
import UsersController from "../../controllers/UsersController";
import validateRequest from "../../middleware/validateRequest";
import * as Yup from 'yup'

const route = Router();
const client = new PrismaClient()
const service = new UsersService(client)
const controller = new UsersController(service)

export default (app: Router) => {
  app.use(route)

  route.post(
    '/aluno',
    (...args) => validateRequest(
      ...args,
      Yup.object().shape({
        nusp: Yup.number().required(),
        email: Yup.string().required(),
        senha: Yup.string().required()
      })
    ),
    controller.create.bind(controller)
  )
}
