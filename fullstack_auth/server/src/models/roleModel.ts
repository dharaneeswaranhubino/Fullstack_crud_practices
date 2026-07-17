import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface RoleAttribute {
  id: number;
  name: string;
  description: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

interface RoleCreationAttribute extends Optional<RoleAttribute, "id"> { }

export class Role
  extends Model<RoleAttribute, RoleCreationAttribute>
  implements RoleAttribute {
  declare id: number;
  declare name: string;
  declare description: string | null;
  declare readonly createdAt?: Date;
  declare updatedAt?: Date | null | undefined;

  declare Users?: any[];
  declare Permissions?: any[];
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: true,
  },
);
