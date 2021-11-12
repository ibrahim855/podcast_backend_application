const SECRET = require('../utility/token.secret.word');
const jwt = require('jsonwebtoken');



// this is for authentication and protected secure resources
const Authentication = (req, res, next) => {
    //getting the token and verify the token
    const rawToken = req.headers.authorization;

    if(rawToken) {
        const token = rawToken.split(' ')[1];

        if(!token) {
            res.status(400).json({
                message:'Non Autenticato.'
            });
        } else {
            jwt.verify(token, SECRET, function(err, decoded) {
            if(err) {
                res.status(400).json({
                    message:'Non Autorizzato.'
                });
            } else {
               req.username = decoded.username;
               next(); 
            };
        });
        };
    } else {
        res.status(404).json({ message: 'Non Autorizzato'});
    }
}

module.exports = Authentication;