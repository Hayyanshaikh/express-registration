const handleValidationError = (err) => {
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return {
      status: "error",
      message: messages.join(", "),
    };
  }

  return null;
};

module.exports = handleValidationError;
