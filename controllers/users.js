const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//secret word
const SECRET = require('../utility/token.secret.word.js');

//MODEL
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (user) {
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign({ username: username }, SECRET, {
        expiresIn: '1d',
      });
      // we give expiration time in mills
      const expiresIn = 1000 * 60 * 60 * 24;
      res.status(200).json({
        message: "L'utente ha effettuato l'accesso con successo.",
        token: token,
        expiresIn: expiresIn,
        username: username,
      });
    } else {
      res.status(400).json({ message: 'Credenziali sbagliate.' });
    }
  } else {
    res.status(400).json({ message: 'Utente non trovato.' });
  }
};

exports.register = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }).then((user) => {
    if (user) {
      res.status(400).json({
        message: 'Nome utente già occupato.',
      });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const newUser = {
            username: username,
            password: hashedPassword,
          };

          const user = new User(newUser);
          user
            .save()
            .then((user) => {
              console.log(user);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      res.status(200).json({
        message: 'Utente registrato con successo.',
      });
    }
  });
};

exports.removeAccount = async (req, res) => {
  const username = req.params.username;
  const authenticatedUsername = req.username;

  const user = await User.findOne({ username: username });

  if (!user) {
    res.status(404).json({ message: 'Utente non trovato.' });
    return;
  }

  if (user.username !== authenticatedUsername) {
    res.status(401).json({ message: 'Non Autorizzato' });
  } else {
    User.findOneAndDelete({ username: username }).then(() => {
      res.status(200).json({ message: 'Account eliminato con successo.' });
    });
  }
};