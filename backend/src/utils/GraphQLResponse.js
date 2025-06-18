class GraphQLResponse {
  constructor({ success = true, message = "Success", ...rest }) {
    this.success = success;
    this.message = message;
    Object.assign(this, rest);
  }
}

export { GraphQLResponse };
