import { includes } from "zod";
import { Role } from "../../models/roleModel";
import { User } from "../../models/userModel";
import { createUserAttribute } from "./userType";
import { Model, Transaction } from "sequelize";
import { UserRole } from "../../models/userRoleModel";

export class UserRepository {

    async findByEmail(email: string): Promise<User | null>{
        return User.findOne({
            where:{email},
        });
    }
    async findByEmailWithRole(email: string): Promise<User | null> {
        return User.findOne({
            where: { email },
            include: [
                {
                    model: Role,
                    as: "Roles",
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                }
            ]
        });
    }

    async findById(id: number): Promise<User | null> {
        return User.findByPk(id, {
            include: [
                {
                    model: Role,
                    as: "Roles",
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                }
            ]
        });
    }

    async create(data: createUserAttribute, t?:Transaction): Promise<User> {
        return User.create(data,{transaction:t});
    }

    async assignRole(userId: number, roleId: number, t?:Transaction): Promise<void> {
        await UserRole.create({ userId, roleId },{transaction:t});
    }
}