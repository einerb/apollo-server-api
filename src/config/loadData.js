import User from "../models/user.model";
import { user } from "./initialData";

export default async function() {
  const handleUser = async ({ ...user }) => {
    let us = await User.findOne({ username: user.username });
    us = new User(user);

    await us.save();
  };
  await Promise.all(user.map(user => handleUser(user)));
}
