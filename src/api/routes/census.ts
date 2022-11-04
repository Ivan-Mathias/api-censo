import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import CensusService from "../../services/CensusService";
import CensusController from "../../controllers/CensusController";
import validateRequest from "../../middleware/validateRequest";
import * as Yup from 'yup'

const route = Router();
const service = new CensusService()
const controller = new CensusController(service)

export default (app: Router) => {
  app.use(route)

  route.post(
    '/censo',
    (...args) => validateRequest(
      ...args,
      Yup.object().shape({
        name: Yup.string().required(),
        visible: Yup.bool(),
        questions: Yup.array().of(
            Yup.object().shape({
                text: Yup.string().required(),
                options: Yup.array().of(
                    Yup.object().shape({
                        text: Yup.string()
                    })
                )
            })
        ).required()
      })
    ),
    controller.create.bind(controller)
  )
}
