"use strict";

require("dotenv").config(); //instatiate environment variables

let config = {}; //Make this global to use all over the application

config.app = process.env.APP || "development";
config.port = process.env.PORT || "4000";

config.db_dialect = process.env.DB_DIALECT || "mongodb";
config.db_host = process.env.DB_HOST || "localhost";
config.db_name = process.env.DB_NAME || "apollo-server-development";
config.db_port = process.env.DB_PORT || "27017";

config.jwt_encryption = process.env.JWT_ENCRYPTION || "|Z2RM*LUFYebto;-ZbXo";
config.jwt_expiration = process.env.JWT_EXPIRATION || "10800";

module.exports = config;
