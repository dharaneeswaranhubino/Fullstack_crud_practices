import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface PermissionAttribute {
    id: number;
    name: string;
    description: string;
    createdAt?: Date,
    updatedAt?: Date | null;
}

interface createPermissionAttribute extends Optional<PermissionAttribute, "id"> { }

export class Permisions extends Model<PermissionAttribute, createPermissionAttribute> implements PermissionAttribute {
    declare id: number;
    declare name: string;
    declare description: string;
    declare createdAt: Date;
    declare updatedAt: Date | null;

    declare Roles?: any[]
}

Permisions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        tableName: "permissions",
        timestamps: true,
    }
)