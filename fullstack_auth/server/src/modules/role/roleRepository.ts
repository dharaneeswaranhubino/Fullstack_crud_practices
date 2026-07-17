import { Role } from "../../models/roleModel";

export class RoleRepository {
    async findByName(name: string): Promise<Role | null> {
        return Role.findOne({ where: { name } });
    }
}