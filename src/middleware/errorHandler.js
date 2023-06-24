// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err && err.message === "validation error") {
    let messages = err.errors.map((e) => e.field);
    if (messages.length && messages.length > 1) {
      messages = `${messages.join(", ")} are required fields`;
    } else {
      messages = `${messages.join(", ")} is required field`;
    }
    return generateResponse(req, res, StatusCodes.BAD_REQUEST, false, messages);
  }
};

export default errorHandler;
