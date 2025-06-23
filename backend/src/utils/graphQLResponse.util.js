/**
 * @module utils/GraphQLResponse
 * Standardized format for GraphQL API responses.
 *
 * @class
 * @param {Object} options
 * @param {boolean} [options.success=true] - Indicates operation status.
 * @param {string} [options.message="Success"] - Response message.
 * @param {Object} [options.rest] - Any additional key-value pairs to include in the response.
 *
 * @example
 * new GraphQLResponse({ success: true, message: "User registered successfully!", user: { id: 1, name: "John Doe" },});
 */
export class GraphQLResponse {
  constructor({ success = true, message = "Success", ...rest }) {
    this.success = success;
    this.message = message;
    Object.assign(this, rest);
  }
}
