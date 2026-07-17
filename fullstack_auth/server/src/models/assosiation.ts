import { Permisions } from "./permissionModel"
import { Role } from "./roleModel"
import { RolePermissions } from "./rolepermissionsMdel"
import { User } from "./userModel"
import { UserRole } from "./userRoleModel"

export const defineAssosiation = () => {
    User.belongsToMany(Role, {
        through: UserRole,
        foreignKey: "userId",
        otherKey: "roleId",
        as: "Roles",
    })

    Role.belongsToMany(User, {
        through: UserRole,
        foreignKey: "roleId",
        otherKey: "userId",
        as: "Users",
    })

    Role.belongsToMany(Permisions, {
        through: RolePermissions,
        foreignKey: "roleId",
        otherKey: "permissionId",
        as: "Permissions"
    })

    Permisions.belongsToMany(Role, {
        through: RolePermissions,
        foreignKey: "permissionId",
        otherKey: "roleId",
        as: "Roles"
    })
}