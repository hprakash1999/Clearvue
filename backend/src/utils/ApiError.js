/**
 * @module utils/ApiError
 * Custom API error class for structured error handling.
 *
 * Extends the built-in `Error` class with:
 * - HTTP status code
 * - Optional array of error details
 * - Custom stack trace
 * - success flag set to false
 * - null data payload
 *
 * @class
 * @extends Error
 *
 * @param {number} statusCode - HTTP status code (e.g. 400, 404, 500).
 * @param {string} [message="Something went wrong"] - Human-readable error message.
 * @param {Array} [errors=[]] - Optional array of specific error details (e.g. validation issues).
 * @param {string} [stack=""] - Optional stack trace (useful when re-throwing caught errors).
 *
 * @example
 * throw new ApiError(400, "Invalid user input", [{ field: "email", message: "Email is required" }]);
 */

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
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
