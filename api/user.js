import { post, put } from "./index";
const infrastructures =
  "https://sportilize.herokuapp.com/api/v1/infrastructures/get_all_infrastructures";

export const addDefaultUser = async(newUser) => {
  return post('users/new_user', newUser);
}

export const editUser = async(newInfo, LoggedUser) => {
  return put('users_auth/edit', {headers: {Cookie: LoggedUser.Cookie}}, newInfo);
}

export const editPassword = async(newInfo, LoggedUser) => {
  return post('auth/change_password', {headers: {Cookie: LoggedUser.Cookie}}, newInfo);
}

/*export const removeAccount = async(LoggedUser) => {

}*/

export const LogUsers = async ({ email, password }) => {
  const UserData = {
    email,
    password,
  };

  return post("auth/login", undefined, UserData);
};
export const UserCreate = async (data) => {
  return post("auth/register", undefined, data);
};
export const Signup = async (id, { username, email, password, uuid }) => {
  const newUser = {
    uuid,
    email,
    password,
    username,
  };

  return post("auth/register", undefined, newUser);
};
export const GetPois = async () => {
  const res = await fetch(infrastructures, {
    method: "GET",
  });
  const data = await res.json();
  return data
};
