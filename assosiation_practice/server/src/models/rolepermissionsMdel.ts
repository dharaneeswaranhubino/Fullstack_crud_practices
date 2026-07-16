import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface RolePermissionsAttribute {
    id: number;
    roleId: number;
    permissionId: number;
    createdAt?: Date;
    updatedAt?: Date | null;
}

interface CreateRolePermissionsAttribute extends Optional<RolePermissionsAttribute, "id"> { };

export class RolePermissions extends Model<RolePermissionsAttribute, CreateRolePermissionsAttribute> implements RolePermissionsAttribute {
    declare id: number;
    declare roleId: number;
    declare permissionId: number;
    declare createdAt: Date;
    declare updatedAt: Date | null;
}

RolePermissions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        permissionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: null,
        }
    },
    {
        sequelize,
        tableName: "rolepermissions",
        timestamps: true,
    }
)