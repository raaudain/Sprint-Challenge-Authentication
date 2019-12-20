const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require('express').Router();

const Users = require("../jokes/jokes-model");
const validateRegister = require("../auth/middleware/validate")

router.post('/register', validateRegister, (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users
    .addUser(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;

  Users
    .findUser({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = signedToken(user);

        res.status(200).json({token, message: `Hello ${user.username}.`});
      }
      else{
        res.status(401).json("Invalid credentials");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


function signedToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "Is this a secret";

  const options = {expiresIn: "15m"};

  return jwt.sign(payload, secret, options);
}

module.exports = router;
