import jwt from 'jsonwebtoken';

const generateToken = (res, user) => {
  const token = jwt.sign({
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  },
    process.env.SECRET_KEY, {
    expiresIn: '5d',
  });
res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 5 * 24 * 60 * 60 * 1000,
});
  return token;
};

export { generateToken };