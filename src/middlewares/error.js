module.exports.TE = function(err_message, log) {
  // TE stands for Throw Error
  if (log === true) {
    logger.error(err_message);
  }

  throw new Error(err_message);
};
