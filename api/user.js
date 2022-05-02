import { post } from "./index";

export const addDefaultUser = async(newUser) => {
    return post('users/new_user', null, newUser);
}