import { User } from "../../models/userModel";
import { createUserAttribute } from "./userType";

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return User.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return User.findByPk(id);
    }

    async create(data: createUserAttribute): Promise<User> {
        return User.create(data);
    }
}