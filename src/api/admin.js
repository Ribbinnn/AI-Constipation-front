import { instance } from '.';

export const createUser = async (username, password, first_name, last_name, role, email, hospital) => {
    try {
        const res = (
            await instance.post("/users", {username, password, first_name, last_name, role, email, hospital})
        ).data;
        return res;
    } catch (e) {
        throw e
    }
}

export const updateUser = async (id, password, first_name, last_name, role, email, hospital) => {
    try {
        if (password === "") {
            const res = (
                await instance.patch("/users", {id, first_name, last_name, role, email, hospital})
            ).data;
            return res;
        } else {
            const res = (
                await instance.patch("/users", {id, password, first_name, last_name, role, email, hospital})
            ).data;
            return res;
        }
    } catch (e) {
        throw e
    }
}

export const getAllUsers = async () => {
    try {
        const res = (
            await instance.get("/users")
        ).data.data;
        return res;
    } catch (e) {
        throw e
    }
}

export const getUserById = async (user_id) => {
    try {
        const res = (
            await instance.get("/users/" + user_id)
        ).data.data;
        return res;
    } catch (e) {
        throw e
    }
}

export const deleteUserById = async (user_id) => {
    try {
        const res = (
            await instance.patch("/users/delete/" + user_id)
        ).data;
        return res;
    } catch (e) {
        throw e
    }
}