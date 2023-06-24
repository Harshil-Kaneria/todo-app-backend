import { User } from "../models";

const jwt = require("jsonwebtoken");

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers["x-token"])) {
    return generateResponse(req, res,StatusCodes.UNAUTHORIZED,false, "Token is not provided");
  }
  const token = req.headers["x-token"];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    const user = await User.scope("withSecretColumns").findOne({
      where: { email: req.user.email, secrete_id: req.user.secrete_id },
    });
    if (!user) {
      return generateResponse(req, res,StatusCodes.UNAUTHORIZED,false,"User is not found in system");
    }
    const reqUser = { ...user.get() };
    reqUser.userId = user.id;
    req.user = reqUser;
    return next();
  } catch (error) {
    return generateResponse(req,res,StatusCodes.UNAUTHORIZED,false,"Incorrect token is provided, try re-login");
  }
};

export default apiAuth;
