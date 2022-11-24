import { BaseError } from "./BaseError"
import * as Yup from 'yup'

export default class ValidationError extends BaseError {
  statusCode = 400
  constructor(public errors: Yup.ValidationError | string) {
    super('Invalid request parameters')
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
  serializeErrors() {
    if (this.errors instanceof Yup.ValidationError) {
      return this.errors.errors.map(err => {
        return { message: err }
      })
    } else {
      return [{ message: this.errors }]
    }
  }
}
