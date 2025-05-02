// utils/errorHandlers/duplicateError.js

const handleDuplicateError = (err, field) => {
  if (err.code === 11000) {
    return {
      status: "error",
      message: `${field} already exists`,
    };
  }

  return null;
};

module.exports = handleDuplicateError;
