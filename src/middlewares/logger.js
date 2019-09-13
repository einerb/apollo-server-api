"use strict";

import bunyan from "bunyan";

const requestSerializer = req => ({
  method: req.method,
  url: req.url,
  headers: req.headers
});

const logger = bunyan.createLogger({
  name: "logsApi",
  serializers: { req: requestSerializer },
  streams: [
    {
      stream: process.stdout
    },
    {
      type: "rotating-file",
      path: `${__dirname}/../logs/logsApi.log`,
      period: "1d"
    }
  ]
});

const loggerMiddleware = (level = "info") => (req, res, next) => {
  logger[level]({ req });
  next();
};

module.exports = loggerMiddleware;
