import jwt from 'jsonwebtoken';

const generateToken = (res, user) => {
  const token = jwt.sign( {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,   // ✅ include admin flag
    },
 process.env.SECRET_KEY, {
    expiresIn: '5d',
  });
  res.cookie("jwt", token, {
    httpOnly: false,
    sameSite: "Lax",   // note: should be "sameSite" not "samesite"
    secure: false,
    maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days in ms
  });
  return token;
};

export { generateToken };