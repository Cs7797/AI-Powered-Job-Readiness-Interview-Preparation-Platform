import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken.userId;

    console.log("Authenticated user:", req.user);

    next();
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "Invalid token",
    });
  }
};
