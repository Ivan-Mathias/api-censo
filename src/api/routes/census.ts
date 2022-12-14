import { Router } from "express";
import CensusService from "../../services/CensusService";
import CensusController from "../../controllers/CensusController";
import validateRequest from "../../middleware/validateRequest";
import * as Yup from 'yup'
import authorize from "../../middleware/authorize";

const route = Router();
const service = new CensusService()
const controller = new CensusController(service)

export default (app: Router) => {
  app.use(route)

  route.get(
    '/censos',
    (...args) => authorize(...args),
    controller.getCensusList.bind(controller)
  )

  route.get(
    '/censo/:idCenso',
    controller.getById.bind(controller)
  )

  route.get(
    '/censo/:idCenso/tcle',
    controller.getTcleById.bind(controller)
  )

  route.get(
    '/censo/:idCenso/resultados',
    controller.getResultsById.bind(controller)
  )

  route.post(
    '/censo',
    (...args) => validateRequest(
      ...args,
      Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string(),
        tcle: Yup.string(),
        publish: Yup.bool(),
        questions: Yup.array().of(
            Yup.object().shape({
                text: Yup.string().required(),
                type: Yup.string().required(),
                mandatory: Yup.bool(),
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

  route.post(
    '/censo/:idCenso',
    (...args) => validateRequest(
      ...args,
      Yup.array().of(
        Yup.object().shape({
          optionId: Yup.number().required(),
        })
      )
    ),
    controller.answer.bind(controller)
  )

  route.patch(
    '/censo/:idCenso',
    (...args) => validateRequest(
      ...args,
      Yup.object().shape({
        close: Yup.bool(),
      })
    ),
    controller.close.bind(controller)
  )

  route.put(
    '/censo/:idCenso',
    (...args) => validateRequest(
      ...args,
      Yup.object().shape({
        id: Yup.number().required(),
        title: Yup.string().required(),
        description: Yup.string(),
        tcle: Yup.string(),
        publish: Yup.bool(),
        questions: Yup.array().of(
          Yup.object().shape({
            id: Yup.number(),
            text: Yup.string().required(),
            type: Yup.string().required(),
            mandatory: Yup.bool(),
            options: Yup.array().of(
              Yup.object().shape({
                id: Yup.number(),
                text: Yup.string()
              })
            )
          })
        ).required()
      })
    ),
    controller.update.bind(controller)
  )
}
