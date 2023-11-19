import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './user';

export interface ThingAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userid?: number;
  weight: string;
  thing_type: string;
  shop: string;
}

export type ThingPk = 'id';
export type ThingId = Thing[ThingPk];
export type ThingOptionalAttributes = 'shop' | 'id' | 'createdAt' | 'updatedAt' | 'userid';
export type thingCreationAttributes = Optional<ThingAttributes, ThingOptionalAttributes>;

export class Thing extends Model<ThingAttributes, thingCreationAttributes> implements ThingAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userid?: number;
  weight: string;
  thing_type: string;
  shop: string;


  // Thing belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Thing {
    return Thing.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        weight: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        thing_type: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        shop: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        createdAt: '',
        updatedAt: '',
      },
      {
        sequelize,
        tableName: 'thing',
        schema: 'public',
        hasTrigger: true,
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'fki_itsuser',
            fields: [{ name: 'userid' }],
          },
          {
            name: 'object_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
