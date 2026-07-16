import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface UserRoleAttribute {
    id: number;
    userId: number;
    roleId: number;
    createdAt?: Date;
    updatedAt?: Date | null;
}

interface CreateUserRoleAttribut extends Optional<UserRoleAttribute, "id"> { };

export class UserRole extends Model<UserRoleAttribute, CreateUserRoleAttribut> implements UserRoleAttribute {
    declare id: number;
    declare userId: number;
    declare roleId: number;
    declare createdAt: Date;
    declare updatedAt: Date | null;
}

UserRole.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        sequelize,
        tableName: "userroles",
        timestamps: true,
    }
)