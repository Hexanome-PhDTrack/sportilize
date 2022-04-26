import { post } from "./index";

export const setDefaultUser = async(id, username) => {
    const newUser = {
        uuid: id,
        username: username
    };

    return post('users/new_user', null, newUser);
}