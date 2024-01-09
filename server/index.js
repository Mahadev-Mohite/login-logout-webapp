const express = require('express');
const randomString = require('randomstring');
const mongoDB = require('./config/mongoose');
const Link = require('./model/link');
const cors = require('cors');
const cookie = require('cookie'); // Import the cookie package
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors());
const { generateToken, verifyToken } = require('./middleware/jwtMiddleware');
const User = require('./model/user');
const jwt = require('jsonwebtoken');
const secretKey = 'Madhav';

const setTokenCookie = (res, token) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('jwt', token, { httpOnly: true, maxAge: 3600, path: '/' }),
  );
};

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    const token = generateToken(user);
    setTokenCookie(res, token);
    res.json({ token, message: "'user registered successfully'" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (!user || user.password !== password) {
        return res
          .status(401)
          .json({ message: 'Invalid username or password' });
      } else {
        const token = generateToken(user);
        setTokenCookie(res, token);
        res.json({ token, message: 'Login successful' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error });
    });
});

app.post('/logout', (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('jwt', '', { httpOnly: true, maxAge: 0, path: '/' }),
  );
  res.json({ message: 'Logout successful' });
});

app.get('/', verifyToken, (req, res) => {
  res.json('hey');
});

app.get('/getAll', verifyToken, async (req, res) => {
  try {
    const link = await Link.find({});
    return res.send({ data: link, message: 'Success' });
  } catch (error) {
    console.log(error);
    return res.send({ message: 'Internal Server Error', error: error });
  }
});

app.post('/shorten', verifyToken, async (req, res) => {
  const url = req.body.url;
  const code = randomString.generate(8);

  const link = await Link.create({
    originalURL: url,
    shortenedURL: `http://localhost:8000/${code}`,
    visited: 0,
    code: code,
  });

  return res.status(200).json({ shortenLink: link.shortenedURL });
});

app.get('/:id', async (req, res) => {
  try {
    const ID = req.params.id;
    console.log(ID);

    const link = await Link.findOne({ code: ID });
    console.log(link);
    console.log(link.visited);
    var temp = link.visited;
    temp += 1;
    link.visited = temp;
    link.save();
    return res.send({ data: link.originalURL, message: 'Success' });
  } catch (error) {
    console.log(error);
    return res.send({ message: 'Internal Server Error', error: error });
  }
});

mongoDB.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
  });
});
