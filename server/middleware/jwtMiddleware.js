const jwt = require('jsonwebtoken');

const secretKey = 'Madhav';

const generateToken = (user) => {
  const payload = {
    userId: user.id,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: '48h' }); 
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token missing' });
  }

  jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken };
