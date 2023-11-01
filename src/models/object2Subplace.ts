import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Subplace, SubplaceId } from './subplace';
import type { Thing, ThingId } from './thing';
import type { User, UserId } from './user';

export interface Object2SubplaceAttributes {
  objectid: number;
  subplaceid: number;
  weight?: number;
  count?: number;
  userid?: number;
}

export type Object2SubplacePk = 'objectid' | 'subplaceid';
export type Object2SubplaceId = Object2Subplace[Object2SubplacePk];
export type Object2SubplaceOptionalAttributes = 'weight' | 'count' | 'userid';
export type Object2SubplaceCreationAttributes = Optional<Object2SubplaceAttributes, Object2SubplaceOptionalAttributes>;

export class Object2Subplace extends Model<Object2SubplaceAttributes, Object2SubplaceCreationAttributes> implements Object2SubplaceAttributes {
  objectid!: number;
  subplaceid!: number;
  weight?: number;
  count?: number;
  userid?: number;

  // object2Subplace belongsTo subplace via subplaceid
  subplace!: Subplace;
  getSubplace!: Sequelize.BelongsToGetAssociationMixin<Subplace>;
  setSubplace!: Sequelize.BelongsToSetAssociationMixin<Subplace, SubplaceId>;
  createSubplace!: Sequelize.BelongsToCreateAssociationMixin<Subplace>;
  // object2Subplace belongsTo Thing via objectid
  object!: Thing;
  getObject!: Sequelize.BelongsToGetAssociationMixin<Thing>;
  setObject!: Sequelize.BelongsToSetAssociationMixin<Thing, ThingId>;
  createObject!: Sequelize.BelongsToCreateAssociationMixin<Thing>;
  // object2Subplace belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Object2Subplace {
    return Object2Subplace.init(
      {
        objectid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'thing',
            key: 'id',
          },
        },
        subplaceid: {
          type: DataTypes.INTEGER,
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
          type: DataTypes.INTEGER,
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
        timestamps: false,
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
