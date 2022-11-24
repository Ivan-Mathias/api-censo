import { BaseError } from "./BaseError";

export default class ConflictionError extends BaseError {
  statusCode = 409;
  constructor(public errors: string | string[]) {
    super('Conflict error');
    Object.setPrototypeOf(this, ConflictionError.prototype);
  }

  serializeErrors() {
    if (Array.isArray(this.errors)) {
      return this.errors.map((err) => {
        return { message: err }
      });
    } else {
      return [{ message: this.errors }]
    }
  }
}
