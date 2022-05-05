import { post } from "./index";
const infrastructures =
  "https://sportilize.herokuapp.com/api/v1/infrastructures/get_all_infrastructures";

export const addDefaultUser = async(newUser) => {
  return post('users/new_user', null, newUser);
}

export const editUser = async(newInfo) => {
  return put('users/edit', null, newInfo);
}

export const editPassword = async(newInfo) => {
  return post('auth/change_password', null, newInfo);
}

export const LogUsers = async ({ email, password }) => {
  const UserData = {
    email,
    password,
  };

  return post("auth/login", null, UserData);
};
export const UserCreate = async (data) => {
  return post("auth/register", null, data);
};
export const Signup = async (id, { username, email, password, uuid }) => {
  const newUser = {
    uuid,
    email,
    password,
    username,
  };

  return post("auth/register", null, newUser);
};
export const GetPois = async () => {
  const res = await fetch(infrastructures, {
    method: "GET",
  });
  const data = await res.json();
  return data
};
