import pe from "parse-error";
import { to } from "await-to-js";

module.exports.to = async promise => {
  let err, res;
  [err, res] = await to(promise);
  if (err) return [pe(err)];

  return [null, res];
};

module.exports.TE = function(err_message, log) {
  // TE stands for Throw Error
  if (log === true) {
    console.error(err_message);
  }

  throw new Error(err_message);
};
