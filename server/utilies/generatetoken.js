import jwt from 'jsonwebtoken';

const generateToken = (res, user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY,
    { expiresIn: "5d" }
  );

  console.log("SETTING JWT COOKIE");

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });

  return token;
};;

export { generateToken };