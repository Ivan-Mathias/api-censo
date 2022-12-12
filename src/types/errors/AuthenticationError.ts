import { BaseError } from "./BaseError"
import * as Yup from 'yup'

export default class AuthenticationError extends BaseError {
  statusCode = 401
  constructor(public errors: string) {
    super('Authentication required')
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }

  serializeErrors() {
    return [{ message: this.errors }]
  }
}
