import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import { User } from "../../models";

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (process.env.IS_GOOGLE_AUTH_ENABLE === "true") {
      if (!req.body.code) {
        throw new Error("code must be defined");
      }
      const { code } = req.body;
      const customUrl = `${process.env.GOOGLE_CAPTCHA_URL}?secret=${process.env.GOOGLE_CAPTCHA_SECRET_SERVER}&response=${code}`;
      const response = await axios({
        method: "post",
        url: customUrl,
        data: {
          secret: process.env.GOOGLE_CAPTCHA_SECRET_SERVER,
          response: code,
        },
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
      if (!(response && response.data && response.data.success === true)) {
        throw new Error("Google captcha is not valid");
      }
    }

    const user = await User.scope("withSecretColumns").findOne({
      where: { email },
    });
    if (user) {
      throw new Error("User already exists with same email");
    }
    const reqPass = crypto.createHash("md5").update(password).digest("hex");
    const payload = {
      email,
      firstName,
      lastName,
      password: reqPass,
    };

    const newUser = await User.create(payload);
    return generateResponse(
      req,
      res,
      StatusCodes.CREATED,
      true,
      "User register successfully !"
    );
  } catch (error) {
    return generateResponse(
      req,
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      err.message || ''
    );
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.scope("withSecretColumns").findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      throw new Error("Incorrect Email Id/Password");
    }
    const reqPass = crypto
      .createHash("md5")
      .update(req.body.password || "")
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Incorrect Email Id/Password");
    }
    const token = jwt.sign(
      {
        user: {
          secrete_id: user.secrete_id,
          email: user.email,
        },
      },
      process.env.SECRET
    );
    return generateResponse(
      req,
      res,
      StatusCodes.OK,
      true,
      "Login successfully !",
      { token, token }
    );
  } catch (error) {
    return generateResponse(
      req,
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      err.message || ''
    );
  }
};

export const profile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ where: { id: userId } });

    delete user.dataValues.id;
    delete user.dataValues.secrete_id;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;

    return generateResponse(
      req,
      res,
      StatusCodes.OK,
      true,
      "Data fetch successfully !",
      { data:user }
    );
  } catch (error) {
    return generateResponse(
      req,
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      err.message || ''
    );
  }
};