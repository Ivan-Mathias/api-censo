import { BaseError } from "./BaseError";

export default class NotFoundError extends BaseError {
  statusCode = 404;
  constructor(public errors: string | string[]) {
    super('Not found error');
    Object.setPrototypeOf(this, NotFoundError.prototype);
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
