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
  secure: true,
  sameSite: "None",
  maxAge: 5 * 24 * 60 * 60 * 1000,
  path: "/",
});
console.log("NODE_ENV =", process.env.NODE_ENV);
  return token;
};

export { generateToken };