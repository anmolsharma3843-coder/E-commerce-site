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
  console.log("JWT length:", token.length);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 5 * 24 * 60 * 60 * 1000,
    path:"/"
  });

  return token;
};;

export { generateToken };