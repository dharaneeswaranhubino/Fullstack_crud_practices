import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface UserAttribute {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  roleId: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
}

interface CreateUserAttribute extends Optional<
  UserAttribute,
  "id" | "isVerified" | "isActive"
> {}

class User
  extends Model<UserAttribute, CreateUserAttribute>
  implements UserAttribute
{
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare phone: string;
  declare roleId: number;
  declare isVerified: boolean;
  declare isActive: boolean;
  declare createdAt?: Date | undefined;
  declare updatedAt?: Date | null | undefined;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  },
);
