import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { subplace, subplaceId } from './subplace';
import type { thing, thingId } from './thing';
import type { User, UserId } from './user';

export interface object2SubplaceAttributes {
  objectid: string;
  subplaceid: string;
  weight?: number;
  count?: number;
  userid?: string;
}

export type object2SubplacePk = 'objectid' | 'subplaceid';
export type object2SubplaceId = object2Subplace[object2SubplacePk];
export type object2SubplaceOptionalAttributes = 'weight' | 'count' | 'userid';
export type object2SubplaceCreationAttributes = Optional<object2SubplaceAttributes, object2SubplaceOptionalAttributes>;

export class object2Subplace extends Model<object2SubplaceAttributes, object2SubplaceCreationAttributes> implements object2SubplaceAttributes {
  objectid!: string;
  subplaceid!: string;
  weight?: number;
  count?: number;
  userid?: string;

  // object2Subplace belongsTo subplace via subplaceid
  subplace!: subplace;
  getSubplace!: Sequelize.BelongsToGetAssociationMixin<subplace>;
  setSubplace!: Sequelize.BelongsToSetAssociationMixin<subplace, subplaceId>;
  createSubplace!: Sequelize.BelongsToCreateAssociationMixin<subplace>;
  // object2Subplace belongsTo thing via objectid
  object!: thing;
  getObject!: Sequelize.BelongsToGetAssociationMixin<thing>;
  setObject!: Sequelize.BelongsToSetAssociationMixin<thing, thingId>;
  createObject!: Sequelize.BelongsToCreateAssociationMixin<thing>;
  // object2Subplace belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof object2Subplace {
    return object2Subplace.init(
      {
        objectid: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'thing',
            key: 'id',
          },
        },
        subplaceid: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'subplace',
            key: 'id',
          },
        },
        weight: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        userid: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'object2subplace',
        schema: 'public',
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'object2subplace_pkey',
            unique: true,
            fields: [{ name: 'objectid' }, { name: 'subplaceid' }],
          },
        ],
      },
    );
  }
}
