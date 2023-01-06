const validateName = (name) => {
  const regex = /^[a-zA-Z ]{2,50}$/;
  return (regex.test(name) && name !== undefined);
};

const validateDescription = (description) => {
  const regex = /^[a-zA-Z ]{2,50}$/;
  return (regex.test(description) && description !== undefined);
};

const validate = (name, description) => {
  const err = [];

  if (!validateName(name)) {
    err.push('invalid name');
  } if (!validateDescription(description)) {
    err.push('invalid description');
  }
  return err;
};

module.exports = { validate };
