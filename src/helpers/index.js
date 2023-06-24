import { getReasonPhrase } from "http-status-codes";

export const generateResponse = (req, res,status_code,status,message='',data) => {
  message = message===''?getReasonPhrase(status_code):message

  const response = {
    status,
    message,
    ...data,
  };

  res.status(status_code).json(response);
};
