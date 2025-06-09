class ApiError extends Error {
  statusCode: number;
  data: null = null;
  success: boolean = false;
  errors: string[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: string[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Capture or set the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
