import { User } from "../models/userModal";
import { ApiError } from "../utils/ApiError";

interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
}

export const createUser = async ({ name, email, password }: CreateUserPayload) => {
    const user = await User.create({ name, email, password });
    return user;
}

export const fetchAllUser = async () => {
    const user = await User.findAll();
    return user;
}

export const fetchSingleUser = async (id: number) => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    return user;
}

export const updateUser = async (id: number, { name, email, password }: CreateUserPayload) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new ApiError(404,`User not found for this id:${id}`);
    }
    await user.update({ name, email, password });
    return user;
}

export const deletUeser = async (id: number) => {
    const deletedData = await User.destroy({
        where: { id },
    });
    if (deletedData === 0) {
        throw new ApiError(404, "User not found");
    }
    return deletedData;
}