import { BaseError } from "./BaseError"
import * as Yup from 'yup'

export default class ForbiddenError extends BaseError {
  statusCode = 403
  constructor(public errors: string) {
    super('User without admin privileges')
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }

  serializeErrors() {
    return [{ message: this.errors }]
  }
}
