import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Not Authorized, No Token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Token Failed",
    });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      error: "Not Authorized as Admin",
    });
  }
};

export { authenticate, authorizeAdmin };