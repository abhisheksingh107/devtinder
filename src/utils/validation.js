const validator = require("validator");
const validateSingupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter the Strong Password");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditField = [
    "firstName",
    "lastName",
    "age",
    "photoURL",
    "gender",
    "about",
  ];

  const isValidField = Object.keys(req.body).every((field) =>
    allowedEditField.includes(field)
  );
  return isValidField;

};

const validatePassword = (password) => {
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};


module.exports = {
  validateSingupData,
  validateProfileEditData,
  validatePassword,
};
