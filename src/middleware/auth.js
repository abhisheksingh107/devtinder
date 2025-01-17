const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked");
  const token = "abc";
  const isAuthorized = token == "abc";
  if (!isAuthorized) {
    res.status(401).send("Authorirez is not valid");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("user auth is getting checked");
  const token = "abc";
  const isAuthorized = token == "abc";
  if (!isAuthorized) {
    res.status(401).send("Authorirez is not valid");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
