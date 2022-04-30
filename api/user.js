import { post } from "./index";

export const setDefaultUser = async (id, username) => {
  const newUser = {
    uuid: id,
    username: username,
  };

  return post("users/new_user", null, newUser);
};
export const LogUsers = async ( { email, password }) => {
  const UserData = {
    email,
    password,
  };

  return post("auth/login", null, UserData);
};
export const UserCreate = async ( data) => {

  return post("auth/register", null, data);
};
