"use strict";

require("dotenv").config(); //instatiate environment variables

let config = {}; //Make this global to use all over the application

config.app = process.env.APP || "development";
config.port = process.env.PORT || "4000";

config.jwt_encryption = process.env.JWT_ENCRYPTION || "|Z2RM*LUFYebto;-ZbXo";
config.jwt_expiration = process.env.JWT_EXPIRATION || "10800";

module.exports = config;
