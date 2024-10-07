const jwt = require('jsonwebtoken');

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded); // return user data
    });
  });
}

// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== 'undefined') {
//       // Split token from Bearer
//       const bearer = bearerHeader.split(' ');
//       // Get token from array
//       const token = bearer[1];
//       // Verify token
//       jwt.verify(token, '564565vgfshgsyudhbdhghg', (err, authData) => {
//           if (err) {
//               res.sendStatus(403); // Forbidden
//           } else {
//               // Set user data from token to request object
//               req.user = authData;
//               next();
//           }
//       });
//   } else {
//       // Forbidden if no token
//       res.sendStatus(403);
//   }
// }

module.exports = { verifyToken };
