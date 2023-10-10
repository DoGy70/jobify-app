import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequest,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "651d22e6346f444036612d9f";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  } 
};

export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("Unauthorized to access this route");

    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequest("Demo User, Read Only!");

  next();
};
