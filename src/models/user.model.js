import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String }
});

UserSchema.pre("save", async function(next) {
  if (this.isModified("password") || this.isNew) {
    let err, salt, hash;
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) TE(err.message, true);

    [err, hash] = await to(bcrypt.hash(this.password, salt));
    if (err) TE(err.message, true);

    this.password = hash;
  } else {
    return next();
  }
});

UserSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id;
  return json;
};

module.exports = mongoose.model("User", UserSchema);
