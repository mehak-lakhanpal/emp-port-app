const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const userObj = {
        userId: user.id,
        name:user.username,
        role: user.role
    }
    res.locals.isAuthenticated = user.role;
    res.locals.username = user.username;
    req.userObj = userObj;
      next();
    });
  } else {
    res.status(401).json("Unauthorized");
  }
};

function isAuthorized(...roles){
  return (req, res, next) =>{
    const user = req.userObj;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.status(401).json("Unauthorized");
    }
  }
}


const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const userObj = {
        userId: user.id,
        name:user.username,
        role: user.role
    }
    res.locals.isAuthenticated = user.role;
    res.locals.username = user.username;
    req.userObj = userObj;
    });
  }
  next();
};




module.exports = {
  authenticateJWT,
  isLoggedIn,
  isAuthorized  
};