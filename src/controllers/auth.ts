import { RequestHandler } from "express";
import Users from "../models/users";
import ApplicationError from "../helpers/error-response";
import { checkPasswordMatch, generateJWT, hashPassword } from "../helpers/auth";
import { SuccessResponse } from "../helpers/success-response";
import { RESPONSE_CODES } from "../helpers/const";

export const register: RequestHandler = async (req, res) => {
  const { email, firstName, lastName } = req.body as {
    email: string;
    firstName: string;
    lastName: string;
  };

  const lowercaseEmail = email.toLowerCase();

  const doesUserExist = await Users.findOne({ email: lowercaseEmail });
  if (doesUserExist) {
    throw new ApplicationError(
      RESPONSE_CODES.BAD_REQUEST,
      "Email already exists, Kindly login instead"
    );
  }

  const password = await hashPassword(req.body.password);
  const user = await Users.create({
    firstName,
    lastName,
    email: lowercaseEmail,
    password,
  });
  const token = await generateJWT({ id: user.id, email: user.email });
  const data = {
    token,
  };
  const response = new SuccessResponse({
    message: "Successfully registered",
    data,
  });
  return res.json(response);
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const user = await Users.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );
  if (!user) {
    throw new ApplicationError(
      RESPONSE_CODES.NOT_FOUND,
      "Email does not exist, Kindly register instead"
    );
  }

  const isPasswordValid = await checkPasswordMatch(password, user.password);
  if (!isPasswordValid) {
    throw new ApplicationError(
      RESPONSE_CODES.BAD_REQUEST,
      "Invalid password, Kindly try again"
    );
  }

  const token = await generateJWT({ id: user.id, email: user.email });

  // Remove sensitive data before sending the user object
  const { password: _, ...userDataWithoutPassword } = user.toObject();

  const data = {
    token,
    user: userDataWithoutPassword,
  };
  const response = new SuccessResponse({
    message: "Successfully logged in",
    data,
  });

  return res.json(response);
};
